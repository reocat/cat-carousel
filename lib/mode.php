<?php
/**
 * Device mode detection, the retro way: sniff the User-Agent + Accept header.
 *   'wml'  -> WAP 1.x handsets (WML cards, WBMP images, no cookies needed)
 *   'wap2' -> XHTML-MP capable feature phones / old smartphones
 *   'html' -> anything modern (still zero JavaScript!)
 */
function detect_mode(): string
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $ua     = $_SERVER['HTTP_USER_AGENT'] ?? '';

    // opera mini and friends pretend to be anything; trust the accept header first
    if (strpos($accept, 'wml') !== false && stripos($accept, 'xhtml') === false) {
        return 'wml';
    }
    if (stripos($accept, 'vnd.wap.xhtml+xml') !== false) {
        return 'wap2';
    }
    if (stripos($accept, 'application/xhtml+xml') !== false && stripos($accept, 'text/html') === false) {
        return 'wap2';
    }

    // classic WAP1 user agents
    if (preg_match('#(wmlbrowser|WAP 1\.|WAP-1|UP\.Browser|UPG1|Openwave|Nokia[W0-9]|Sanyo|AUDIOVOX|BlackBerry7|Alcatel|MOT-|Panasonic|Philips|SIE-|SonyEricsson[WJ])#i', $ua)) {
        return 'wml';
    }
    /* real browsers before legacy sniffing: a Lumia 720 reports "NOKIA" in its
     * UA right next to "Edge/15" — vendor names alone mean nothing, nya.
     * Only *modern* engine tokens qualify: old Symbian WebKits also ship
     * AppleWebKit/4xx, so bare "AppleWebKit" would drag an N95 into the
     * heavyweight face. Versioned tokens keep them on the light path. */
    if (preg_match('#(Chrome/\d|Trident/\d|Edge/\d|Firefox/\d|AppleWebKit/[6-9]\d\d)#i', $ua)) {
        return 'html';
    }
    // feature phones that do xhtml-mp (no engine token = genuine legacy)
    if (preg_match('#(Nokia|SAMSUNG|LG-|SIE-|SonyEricsson|Mot-|MIDP|Profile/MIDP|Obigo|Teleca|J2ME|NetFront|Opera Mini|MAUI)#i', $ua)) {
        return 'wap2';
    }
    return 'html';
}

function is_wml(string $mode): bool
{
    return $mode === 'wml';
}

/** absolute url of this script, wap devices hate relative urls without base */
function self_url(array $extra = []): string
{
    $params = array_merge($_GET, $extra);
    $q = http_build_query($params);
    $self = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
    return htmlspecialchars($self . ($q ? '?' . $q : ''), ENT_QUOTES);
}

/** link to a proxied, resized image */
function img_proxy_url(string $url, string $mode): string
{
    $q = http_build_query(['u' => $url, 'm' => $mode]);
    return 'img.php?' . $q;
}

/** write a <img> tag (html/wap2) or wml-safe text, since wml 1.1 <img> only allows wbmp */
function img_tag(string $url, string $mode, int $w, int $h, string $alt, bool $priority = false): string
{
    $src = img_proxy_url($url, $mode);
    if ($mode === 'wml') {
        // WAP1: only wbmp is guaranteed; alt text is the real content, nya
        return '<img src="' . htmlspecialchars($src, ENT_QUOTES) . '" alt="' . htmlspecialchars($alt, ENT_QUOTES) . '" width="' . $w . '" height="' . $h . '" />';
    }
    /* width/height are the *cropped* proxy size, so the box is reserved before
     * the bytes arrive (no CLS) — even in browsers that ignore modern CSS */
    return '<img src="' . htmlspecialchars($src, ENT_QUOTES) . '" alt="' . htmlspecialchars($alt, ENT_QUOTES) . '" width="' . $w . '" height="' . $h . '"' . ($priority ? ' fetchpriority="high"' : '') . ' />';
}
