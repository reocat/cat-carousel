<?php
/**
 * img.php :: image proxy + resizer
 *  - desktop/html : jpeg, max 640x427
 *  - wap2         : jpeg, max 240x320
 *  - wml          : WBMP (1-bit), max 96x128 — the true WAP1 experience
 * Everything is cached on disk so old slow phones don't roast the upstreams.
 */
require __DIR__ . '/config.php';
require __DIR__ . '/lib/http.php';
require __DIR__ . '/lib/mode.php';

$mode = ($_GET['m'] ?? 'html');
if (!in_array($mode, ['html', 'wap2', 'wml'], true)) {
    $mode = 'html';
}
gc_cache();

/* ---- static nyan assets, content-type guaranteed ----------------------- */
/* php -S and some gateways guess .wbmp wrong (octet-stream), and WAP1 phones
 * are picky — so both tiles are served from here with a hard content type. */
if (isset($_GET['a'])) {
    $assets = [
        'nyan'     => ['nyan.gif', 'image/gif'],
        'nyan-wml' => ['nyan-wml.wbmp', 'image/vnd.wap.wbmp'],
    ];
    $a = (string) $_GET['a'];
    if (!isset($assets[$a])) {
        http_response_code(404);
        exit('no such asset');
    }
    [$file, $mime] = $assets[$a];
    $blob = (string) @file_get_contents(__DIR__ . '/assets/' . $file);
    if ($blob === '') {
        http_response_code(500);
        exit('asset missing');
    }
    $etag = '"' . sha1($blob) . '"';
    header('ETag: ' . $etag);
    header('Cache-Control: public, max-age=86400');
    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
        http_response_code(304);
        exit;
    }
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . strlen($blob));
    echo $blob;
    exit;
}
$url = (string) ($_GET['u'] ?? '');
if (!preg_match('#^https?://#i', $url)) {
    http_response_code(400);
    exit('bad url');
}
/* the proxy is public, so the host decides what we are allowed to fetch —
 * otherwise this doubles as an SSRF gadget against the host's own network */
if (!img_host_allowed($url)) {
    http_response_code(403);
    exit('host not allowed');
}

$w = $mode === 'wml' ? WML_W : ($mode === 'wap2' ? WAP2_W : DESKTOP_W);
$h = $mode === 'wml' ? WML_H : ($mode === 'wap2' ? WAP2_H : DESKTOP_H);

/* ---- fetch remote bytes (cached) --------------------------------------- */
$raw = http_get_cached($url, CACHE_TTL_IMG);
if ($raw === '') {
    http_response_code(502);
    header('Content-Type: text/plain');
    exit('upstream image fetch failed');
}

/* ---- convert + cache ---------------------------------------------------- */
/* cache key includes the code mtimes so quality/config changes apply without
 * wiping the disk manually, nya */
$key = CACHE_DIR . '/img_' . sha1($mode . '|' . $w . 'x' . $h . '|' . $url)
     . '.v' . filemtime(__DIR__ . '/img.php') . '.' . filemtime(__DIR__ . '/config.php')
     . ($mode === 'wml' ? '.wbmp' : '.jpg');
if (is_file($key) && (time() - filemtime($key)) < CACHE_TTL_IMG) {
    $blob = (string) file_get_contents($key);
} else {
    $blob = convert_image($raw, $mode, $w, $h);
    if ($blob === '') {
        http_response_code(502);
        header('Content-Type: text/plain');
        exit('image decode failed');
    }
    @file_put_contents($key, $blob);
}

/* ---- 304s: phones on slow meters shouldn't re-download the same cat ------ */
$etag = '"' . sha1($blob) . '"';
header('ETag: ' . $etag);
header('Cache-Control: public, max-age=86400');
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
    http_response_code(304);
    exit;
}

header('Content-Type: ' . ($mode === 'wml' ? 'image/vnd.wap.wbmp' : 'image/jpeg'));
header('Content-Length: ' . strlen($blob));
echo $blob;

/* ---- helpers ------------------------------------------------------------ */

function convert_image(string $raw, string $mode, int $w, int $h): string
{
    $src = @imagecreatefromstring($raw);
    if ($src === false) {
        return '';
    }

    $sw = imagesx($src);
    $sh = imagesy($src);

    /* Cover-crop to the exact output size (the same thing the original does
     * with object-fit:cover). Fixed dimensions let index.php reserve the box
     * before the image loads, which kills CLS on every browser. */
    $scale  = max($w / $sw, $h / $sh);
    $cropW  = max(1, min($sw, (int) round($w / $scale)));
    $cropH  = max(1, min($sh, (int) round($h / $scale)));
    $srcX   = max(0, (int) floor(($sw - $cropW) / 2));
    $srcY   = max(0, (int) floor(($sh - $cropH) / 2));

    $dst = imagecreatetruecolor($w, $h);
    imagecopyresampled($dst, $src, 0, 0, $srcX, $srcY, $w, $h, $cropW, $cropH);
    imagedestroy($src);
    imageinterlace($dst, true); // progressive jpeg: blurry-fast, sharp-later

    if ($mode === 'wml') {
        $out = to_wbmp($dst, $w, $h);
    } else {
        ob_start();
        // progressive scan: old phones paint a blurry picture fast instead of
        // waiting for the whole baseline strip, nya
        imagejpeg($dst, null, $mode === 'wap2' ? 62 : 80);
        $out = (string) ob_get_clean();
    }
    imagedestroy($dst);
    return $out;
}

/** GD has no wbmp encoder on most builds — dither to 1-bit by hand, oldschool style. */
function to_wbmp($im, int $w, int $h): string
{
    // WBMP type 0 header: type field (0) + fix header (0), then multibyte w/h
    $wbmp  = "\x00\x00";
    $wbmp .= wbmp_header($w);
    $wbmp .= wbmp_header($h);

    // ordered (Bayer 4x4) dithering for that crisp 1999 monochrome look
    $bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
    ];
    $rowBytes = (int) ceil($w / 8);
    $padding  = $rowBytes * 8 - $w;

    for ($y = 0; $y < $h; $y++) {
        $row = str_repeat("\0", $rowBytes);
        for ($x = 0; $x < $w; $x++) {
            $rgb = imagecolorat($im, $x, $y);
            $lum = (0.299 * (($rgb >> 16) & 0xFF) + 0.587 * (($rgb >> 8) & 0xFF) + 0.114 * ($rgb & 0xFF)) / 255.0;
            $threshold = ($bayer[$y % 4][$x % 4] + 0.5) / 16.0;
            // WBMP type 0: bit set = black pixel, so ink the dark ones
            if ($lum <= $threshold) {
                $row[(int) ($x / 8)] = chr(ord($row[(int) ($x / 8)]) | (0x80 >> ($x % 8)));
            }
        }
        // WBMP rows are byte-aligned with zero padding on the right
        if ($padding) {
            $mask = (0xFF << $padding) & 0xFF;
            $row[$rowBytes - 1] = chr(ord($row[$rowBytes - 1]) & $mask);
        }
        $wbmp .= $row;
    }
    return $wbmp;
}

function wbmp_header(int $value): string
{
    $out = '';
    do {
        $byte = $value & 0x7F;
        $value >>= 7;
        if ($value) {
            $byte |= 0x80;
        }
        $out .= chr($byte);
    } while ($value);
    return $out;
}

/** suffix allowlist from config.php — cdn2.thecatapi.com matches thecatapi.com,
 * notacatapi.com does not, and neither does 127.0.0.1, nya */
function img_host_allowed(string $url): bool
{
    $host = strtolower(rtrim((string) parse_url($url, PHP_URL_HOST), '.'));
    if ($host === '') {
        return false;
    }
    foreach (IMG_HOST_ALLOW as $allowed) {
        if ($host === $allowed || str_ends_with($host, '.' . $allowed)) {
            return true;
        }
    }
    return false;
}
