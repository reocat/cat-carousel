<?php
/**
 * cat-carousel-php :: config
 * Retro remake of https://github.com/reocat/cat-carousel — no JavaScript needed.
 */

const APP_NAME    = 'Cat Carousel';
const APP_VERSION = '0.1.0';
const APP_DESCRIPTION = 'A zero-JavaScript retro cat carousel with HTML, XHTML-MP (WAP2) and WML (WAP 1.x) faces. Random cats, dogs, ducks and bears on everything from a modern browser to a Nokia 3310.';

/* ---- authors, nya~ ------------------------------------------------------ */
const AUTHORS = [
    'reocat'       => 'https://github.com/reocat',
    'L1ttleWizard' => 'https://github.com/L1ttleWizard',
];
const UPSTREAM_REPO = 'https://github.com/reocat/cat-carousel';

/* ---- cache -------------------------------------------------------------- */
define('CACHE_DIR', __DIR__ . '/cache');
define('CACHE_TTL_IMG', 86400);    // remote image cache: 1 day
define('CACHE_TTL_JSON', 900);     // api json cache: 15 min
define('CACHE_TTL_META', 30);      // ?meta=... tiny ttl: 30 sec

/* ---- carousel ----------------------------------------------------------- */
define('IMG_COUNT', 10);           // images fetched per page view
define('DEFAULT_COLOR', 'ffdead'); // sandy paper, same as the original default
define('HELLO_COLORS', [          // "?color=" links, one per animal
    'ffdead' => 'sandy',
    'ffffff' => 'snow',
    'ffe4e1' => 'misty',
    'e0ffff' => 'lightcyan',
    'f5f5dc' => 'beige',
    'ffb6c1' => 'nyanpink',
]);

/* ---- device sizes ------------------------------------------------------- */
/* desktop page shows the same size as the original (900x600, scaled by CSS) */
define('DESKTOP_W', 640);          // proxy keeps bandwidth sane; 900x600 if you like pixel roast
define('DESKTOP_H', 427);
define('WAP2_W', 240);             // early smartphones / XHTML-MP
define('WAP2_H', 320);
define('WML_W', 96);               // WBMP for openwave-era handsets (1-bit!)
define('WML_H', 128);

/* ---- image proxy -------------------------------------------------------- */
/* img.php?u=… is reachable by anyone, so it may only ever fetch the animal
 * providers below (suffix match, subdomains included). Without this the
 * carousel is an open proxy that will happily fetch 127.0.0.1, 10.x or
 * 169.254.169.254 for a stranger, nya.
 * NOTE: keep this in sync with lib/apis.php */
const IMG_HOST_ALLOW = [
    'thecatapi.com',   // catapi (images live on cdn2.)
    'cataas.com',      // cataas
    'random.dog',      // dogapi
    'random-d.uk',     // duckapi
    'nekos.life',      // nekoapi
    'place.dog',       // placedog
    'placebear.com',   // placebear
];

/* ---- text mode (session-dependent) ------------------------------------- */
function hell_mode(): bool
{
    return !empty($_SESSION['hell']);
}

function current_color(): string
{
    $c = $_SESSION['color'] ?? DEFAULT_COLOR;
    return preg_match('/^[0-9a-fA-F]{6}$/', (string) $c) ? strtolower((string) $c) : DEFAULT_COLOR;
}
