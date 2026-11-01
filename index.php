<?php
/**
 * cat-carousel.php :: index
 * A no-JavaScript retro remake of https://github.com/reocat/cat-carousel
 * Serves three faces depending on who knocks:
 *   - modern html (still works fine, zero JS)
 *   - XHTML-MP for WAP2 feature phones
 *   - WML cards for WAP 1.x handsets (images as dithered WBMP)
 */
require __DIR__ . '/config.php';
require __DIR__ . '/lib/http.php';
require __DIR__ . '/lib/apis.php';
require __DIR__ . '/lib/mode.php';

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_cache_limiter('');
    session_start();
    header('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
}

$mode  = detect_mode();
$isWml = is_wml($mode);

/* ---- state (the redux store, but it is just $_SESSION, nya) ------------- */
$prevPage  = $_SESSION['last_page'] ?? null;
$prevHell  = !empty($_SESSION['hell']);
$prevColor = $_SESSION['color'] ?? DEFAULT_COLOR;

$apiChanged = false;
// ?api=catapi|cataas|dogapi|duckapi|nekoapi|placedog|placebear
if (isset($_GET['api']) && array_key_exists((string) $_GET['api'], carousel_providers())) {
    $_SESSION['api'] = (string) $_GET['api'];
    $apiChanged = true;
}
$api = $_SESSION['api'] ?? 'catapi';

// ?hell=on|off — death mode. no konami code here, old phones only have a numpad
$hellChanged = false;
if (isset($_GET['hell'])) {
    $newHell = ($_GET['hell'] === 'on');
    $hellChanged = ($newHell !== $prevHell);
    $_SESSION['hell'] = $newHell;
}

// ?color=ffdead etc
$colorChanged = false;
if (isset($_GET['color']) && preg_match('/^[0-9a-fA-F]{6}$/', (string) $_GET['color'])) {
    $newColor = strtolower((string) $_GET['color']);
    $colorChanged = ($newColor !== $prevColor);
    $_SESSION['color'] = $newColor;
}
$color = current_color();

// ?page=N — the "carousel" is just prev/next links, truly zero JS
$page = max(0, min(9, (int) ($_GET['page'] ?? 0)));
$pageChanged = isset($_GET['page']) && ($page !== $prevPage);

// secret page, like the original konami egg that switched to nekoapi
if (isset($_GET['nyan'])) {
    $_SESSION['api'] = 'nekoapi';
    $_SESSION['hell'] = true;
    $api = 'nekoapi';
    $apiChanged = true;
}

/* ---- fetch images -------------------------------------------------------
 * Pull a genuinely fresh batch (ttl=0) on initial load, page refresh,
 * provider switch, or ?fresh=1 at the end of the reel. Keep $_SESSION['images']
 * only when actively stepping < / > through pages or toggling color/death mode. */
$isStepOrToggle = ($pageChanged || $hellChanged || $colorChanged) && !isset($_GET['fresh']) && !$apiChanged;
if (isset($_GET['fresh'])) {
    unset($_GET['fresh']); // consumed; don't leak into later links
}
if (!$isStepOrToggle || !isset($_SESSION['images']) || !is_array($_SESSION['images']) || !$_SESSION['images']
    || (time() - ($_SESSION['images_at'] ?? 0)) > CACHE_TTL_JSON) {
    $_SESSION['images']    = provider_fetch($api, 0);
    $_SESSION['images_at'] = time();
    if (!$pageChanged) {
        $page = 0;
    }
}
$_SESSION['last_page'] = $page;
$images = $_SESSION['images'];
$total  = count($images);
if (!$total) {
    $images = [];
    $total  = 0;
}
$page = $total ? min($page, $total - 1) : 0;

/* ---- link helpers -------------------------------------------------------- */
function page_link(int $p): string
{
    return htmlspecialchars('?' . http_build_query(array_merge($_GET, ['page' => $p])), ENT_QUOTES);
}
function api_link(string $key, string $label, string $cur): string
{
    $sel = $key === $cur;
    return ($sel ? '[ ' : '')
        . '<a href="' . htmlspecialchars('?' . http_build_query(array_merge($_GET, ['api' => $key, 'page' => 0])), ENT_QUOTES) . '">'
        . $label . '</a>' . ($sel ? ' ]' : '');
}

$label = provider_label($api);
$title = "Random {$label} Image Carousel";

/* ---- output -------------------------------------------------------------- */
if ($isWml) {
    header('Content-Type: text/vnd.wap.wml; charset=utf-8');
    echo '<?xml version="1.0" encoding="utf-8"?>' . "\n";
    echo "<!DOCTYPE wml PUBLIC \"-//WAPFORUM//DTD WML 1.1//EN\" \"http://www.wapforum.org/DTD/wml_1.1.dtd\">\n";
    echo "<wml>\n <card id=\"c1\" title=\"" . htmlspecialchars(APP_NAME, ENT_QUOTES) . "\">\n";
    echo "  <p align=\"center\"><b>" . htmlspecialchars($title, ENT_QUOTES) . "</b></p>\n";
    if (hell_mode()) {
        echo "  <p align=\"center\"><i>~~ NYAN DEATH MODE ~~</i></p>\n";
        /* WAP1 face: static 1-bit nyan tile, 652 bytes — real WBMP, mime pinned,
         * works even where the gateway mangles css or has no gif support. */
        echo "  <p align=\"center\"><img src=\"img.php?a=nyan-wml\" alt=\"nyan nyan nyan\" /></p>\n";
    }
    if ($total) {
        echo "  <p align=\"center\">\n";
        echo "   " . img_tag($images[$page], 'wml', WML_W, WML_H, "picture " . ($page + 1)) . "\n";
        echo "   <br/>[" . ($page + 1) . "/" . $total . "]\n";
        echo "  </p>\n";
        echo "  <p align=\"center\">\n";
        if ($page > 0) {
            echo "   <a href=\"" . page_link($page - 1) . "\">&lt;&lt; prev</a> ";
        }
        if ($page < $total - 1) {
            echo "   <a href=\"" . page_link($page + 1) . "\">next &gt;&gt;</a>\n";
        } else {
            // end of the reel: wrap and pull a fresh batch, like refetch() did
            echo "   <a href=\"" . htmlspecialchars('?' . http_build_query(array_merge($_GET, ['page' => 0, 'fresh' => 1])), ENT_QUOTES) . "\">next &gt;&gt;</a>\n";
        }
        echo "  </p>\n";
    } else {
        echo "  <p align=\"center\">the " . htmlspecialchars($label, ENT_QUOTES) . " api is asleep, try again~</p>\n";
        echo "  <p align=\"center\"><a href=\"" . htmlspecialchars('?' . http_build_query(['api' => 'catapi', 'page' => 0]), ENT_QUOTES) . "\">retry cats</a></p>\n";
    }
    echo "  <p align=\"center\">---<br/>\n";
    foreach (carousel_providers() as $key => $row) {
        echo "   " . api_link($key, $row[0], $api) . "<br/>\n";
    }
    echo "  </p>\n";
    echo "  <p align=\"center\">\n";
    echo "   <a href=\"" . htmlspecialchars('?' . http_build_query(array_merge($_GET, ['hell' => hell_mode() ? 'off' : 'on'])), ENT_QUOTES) . "\">";
    echo hell_mode() ? "calm down" : "death mode";
    echo "</a><br/>\n";
    foreach (HELLO_COLORS as $hex => $name) {
        echo "   <a href=\"" . htmlspecialchars('?' . http_build_query(array_merge($_GET, ['color' => $hex])), ENT_QUOTES) . "\">" . htmlspecialchars($name, ENT_QUOTES) . "</a> ";
    }
    echo "\n  </p>\n";
    echo "  <p align=\"center\">made by <a href=\"" . UPSTREAM_REPO . "\">reocat + L1ttleWizard</a><br/>retro php port 2026</p>\n";
    echo " </card>\n</wml>\n";
    exit;
}

/* ---- html / xhtml-mp ----------------------------------------------------- */
if ($mode === 'wap2') {
    header('Content-Type: application/vnd.wap.xhtml+xml; charset=utf-8');
    echo '<?xml version="1.0" encoding="utf-8"?>' . "\n";
    echo "<!DOCTYPE html PUBLIC \"-//WAPFORUM//DTD XHTML Mobile 1.0//EN\" \"http://www.wapforum.org/DTD/xhtml-mobile10.dtd\">\n";
} else {
    header('Content-Type: text/html; charset=utf-8');
    echo "<!DOCTYPE html>\n";
}
$hell  = hell_mode();
$bg    = '#' . $color;
$nekos = ($api === 'nekoapi');
$isHtml = ($mode === 'html');
$rel    = $isHtml ? ' rel="noopener"' : ''; // HTML5-only, keep XHTML-MP clean
?>
<html xmlns="http://www.w3.org/1999/xhtml"<?= $mode === 'html' ? ' lang="en"' : '' ?> xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="<?= htmlspecialchars(APP_DESCRIPTION, ENT_QUOTES) ?>" />
<title><?= htmlspecialchars($title . ' :: ' . APP_NAME, ENT_QUOTES) ?></title>
<?php if ($mode === 'html' && $total): /* the cat is the LCP: tell the browser early, even before it reaches the <img> */ ?>
<link rel="preload" as="image" href="<?= htmlspecialchars(img_proxy_url($images[$page], 'html'), ENT_QUOTES) ?>" fetchpriority="high" />
<?php endif; ?>
<?php if ($mode === 'html' && $total > 1): /* warm the next cat while this one renders — zero js, just a hint */ ?>
<link rel="prefetch" href="<?= htmlspecialchars(img_proxy_url($images[($page + 1) % $total], 'html'), ENT_QUOTES) ?>" fetchpriority="low" />
<?php endif; ?>
<?php if ($mode === 'html'): ?>
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<?php endif; ?>
<?php if ($isHtml): /* ARD: current rel=ard, plus the predecessor name for older crawlers */ ?>
<link rel="ard" href="/.well-known/ard.json" />
<link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
<?php endif; ?>
<?php if ($mode === 'html'): ?>
<style>
  /* ---- the original look, hand-written css, no tailwind was harmed ----
   * Everything below is plain CSS 2.1 at heart: flexbox, vw, border-radius and
   * gradients are progressive extras, so IE6/Netscape still get a usable page. */
  * { padding: 0; margin: 0; box-sizing: border-box; text-align: center; font-family: "Courier New", monospace; letter-spacing: 2px; }
  html { background: <?= $bg ?>; }
  body { background: <?= $bg ?>; min-height: 100vh; display: -ms-flexbox; display: flex; -ms-flex-direction: column; flex-direction: column; -ms-flex-align: center; align-items: center; padding: 18px 10px; }
  /* margin:auto centres in a short flex column, but collapses to 0 when the
   * content is taller than the screen — no clipped top on tiny displays */
  .page { width: 100%; max-width: 980px; margin: auto; position: relative; z-index: 1; }
  h1 { color: #5c4033; text-shadow: 1px 1px 2px sandybrown; font-size: 26px; line-height: 1.25; margin: 4px 0 12px; }
  .imgbox { width: 640px; max-width: 92vw; margin: 0 auto 14px; }
  .imgbox img { display: block; max-width: 100%; margin: 0 auto; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 0 5px rgb(123,63,0); }
  .counter { color: #5c4033; font-size: 13px; margin-top: 4px; }
  .nav { font-size: 18px; margin: 4px 0 14px; }
  .nav a, .nav span { display: inline-block; min-width: 30px; line-height: 30px; color: #7a4a21; text-decoration: none; border: 1px solid #b98d5f; background: #fff; background: rgba(255,255,255,.55); padding: 0 12px; border-radius: 50px; }
  .nav span { border-color: transparent; background: transparent; color: #b98d5f; }
  .providers { font-size: 14px; line-height: 1.9; }
  .providers a { color: #7a4a21; }
  .colors { font-size: 13px; line-height: 2.2; margin-top: 4px; }
  /* inline-block + margins keeps the swatches wrapping cleanly at every width;
   * the padding also gives them a 24px+ touch target */
  .colors a { display: inline-block; color: #3a2a1e; text-decoration: none; padding: 5px 9px; margin: 2px; border-radius: 4px; border: 1px solid #0004; }
  .hell-btn { margin: 6px 0; }
  .hell-btn a { display: inline-block; color: #fff; background: #c8102e; background: linear-gradient(90deg, red, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9, red); border-radius: 8px; padding: 5px 12px; text-decoration: none; font-size: 13px; }
  .nyan h1 { font-size: 40px; color: #ff2f92; text-shadow: 0 0 9px rgba(255,204,0,.41); animation: rainbow 2s linear infinite; }
  /* gradient-clip only where the browser actually supports it — otherwise the
   * title would go color:transparent and vanish on old Edge/IE, nya */
  @supports ((-webkit-background-clip: text) or (background-clip: text)) {
    .nyan h1 { background: linear-gradient(red, #ff9a00 10%, #d0de21 20%, #4fdc4a 30%, #3fdad8 40%, #2fc9e2 50%, #1c7fee 60%, #5f15f2 70%, #ba0cf8 80%, #fb07d9 90%, red) 0 0/100% 200%; -webkit-background-clip: text; background-clip: text; color: transparent; }
  }
  .nyan .bgflash { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 0; pointer-events: none; background: linear-gradient(45deg, #ff0080, #ff8c00, #ffee00, #00e676, #00b0ff, #d500f9, #ff0080) 0 0/200% 200%; animation: rainbow 2s linear infinite; opacity: .35; }
  @keyframes rainbow { 100% { background-position: 0 -200%; } }
  /* nyan tile field for death mode — 6-frame animated gif, tiled by css.
   * Single-layer fallback first for CSS2 browsers, then staggered brick
   * layout (two offset layers at 2x integer pixel scale) for CSS3+, nya~ */
  .nyan .bgflash {
    background: #fff url('img.php?a=nyan&v=2') repeat;
    background-image: url('img.php?a=nyan&v=2'), url('img.php?a=nyan&v=2');
    background-color: #fff;
    background-repeat: repeat, repeat;
    background-size: 240px 136px, 240px 136px;
    background-position: 0 0, 120px 68px;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    opacity: 1;
    animation: none;
  }
  .nyan .nyanbar { position: fixed; top: 0; left: 0; right: 0; height: 44px; background: rgba(255,255,255,.9); z-index: 0; pointer-events: none; }
  .authors { font-size: 12px; line-height: 1.7; color: #5c4033; margin-top: 12px; }
  .authors a { color: inherit; }
  @media (max-width: 680px) {
    .imgbox img { width: 100%; height: auto; }
  }
  @media (max-width: 480px) {
    h1 { font-size: 22px; letter-spacing: 1px; }
    .providers { font-size: 13px; }
    .colors a { padding: 4px 7px; }
    .nyan .bgflash { background-size: 180px 102px, 180px 102px; background-position: 0 0, 90px 51px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .nyan h1, .nyan .bgflash { animation: none; }
  }
</style>
<?php else: /* wap2: keep it tiny, no css at all */ ?>
<?php endif; ?>
</head>
<body<?= $hell ? ' class="nyan"' : '' ?>>
<?php if ($hell && $mode === 'html'): ?><div class="bgflash"></div><div class="nyanbar"></div><?php elseif ($hell && $mode === 'wap2'): ?><p><img src="img.php?a=nyan" alt="nyan nyan nyan" width="120" height="68" /></p><?php endif; ?>
<div class="page"<?= $isHtml ? ' role="main"' : '' ?>>
<h1><?= htmlspecialchars($title, ENT_QUOTES) ?></h1>
<?php if ($hell): ?><p><b><?= $nekos ? 'NYAN NYAN NYAN' : '~~ death mode ~~' ?></b></p><?php endif; ?>

<?php if ($total): ?>
  <div class="imgbox">
    <?= img_tag($images[$page], $mode, $mode === 'wap2' ? WAP2_W : DESKTOP_W, $mode === 'wap2' ? WAP2_H : DESKTOP_H, $label . ' ' . ($page + 1), $mode === 'html') ?>
    <div class="counter">[<?= $page + 1 ?>/<?= $total ?>]</div>
  </div>
  <div class="nav">
    <?php if ($page > 0): ?><a href="<?= page_link($page - 1) ?>"<?= $isHtml ? ' aria-label="Previous image"' : '' ?>>&lt;</a><?php else: ?><span<?= $isHtml ? ' aria-hidden="true"' : '' ?>>&lt;</span><?php endif; ?>
    <?php if ($page < $total - 1): ?><a href="<?= page_link($page + 1) ?>"<?= $isHtml ? ' aria-label="Next image"' : '' ?>>&gt;</a><?php else: ?><a href="<?= htmlspecialchars('?' . http_build_query(array_merge($_GET, ['page' => 0, 'fresh' => 1])), ENT_QUOTES) ?>" title="fresh batch"<?= $isHtml ? ' aria-label="Next batch"' : '' ?>>&gt;&gt;</a><?php endif; ?>
  </div>
<?php else: ?>
  <p>the <?= htmlspecialchars($label, ENT_QUOTES) ?> api is asleep, try again~</p>
  <p><a href="<?= htmlspecialchars('?' . http_build_query(['api' => 'catapi', 'page' => 0]), ENT_QUOTES) ?>">retry cats</a></p>
<?php endif; ?>

<p class="providers">
  <?= api_link('catapi', 'cat', $api) ?>
  <?= api_link('cataas', 'cataas', $api) ?>
  <?= api_link('dogapi', 'dog', $api) ?>
  <?= api_link('duckapi', 'duck', $api) ?>
  <?= api_link('nekoapi', 'neko', $api) ?>
  <?= api_link('placedog', 'placedog', $api) ?>
  <?= api_link('placebear', 'bear', $api) ?>
</p>

<p class="hell-btn">
  <a href="<?= htmlspecialchars('?' . http_build_query(array_merge($_GET, ['hell' => $hell ? 'off' : 'on'])), ENT_QUOTES) ?>">
    <?= $hell ? 'toggle death mode (off)' : 'toggle death mode' ?>
  </a>
</p>

<p class="colors">
  <?php foreach (HELLO_COLORS as $hex => $name): ?>
    <a style="background:#<?= $hex ?>" href="<?= htmlspecialchars('?' . http_build_query(array_merge($_GET, ['color' => $hex])), ENT_QUOTES) ?>"><?= htmlspecialchars($name, ENT_QUOTES) ?></a>
  <?php endforeach; ?>
</p>

<p class="authors">
  made by <a href="https://github.com/reocat"<?= $rel ?>>reocat</a> and <a href="https://github.com/L1ttleWizard"<?= $rel ?>>L1ttleWizard</a> &middot; <a href="<?= UPSTREAM_REPO ?>"<?= $rel ?>>original</a> &middot; <a href="<?= htmlspecialchars('?' . http_build_query(array_merge($_GET, ['nyan' => 1])), ENT_QUOTES) ?>">???</a>
</p>
</div>
</body>
</html>
