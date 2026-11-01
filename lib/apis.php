<?php
/**
 * The eight animal APIs from the original carousel, ported 1:1-ish.
 * Each returns a plain list of image URLs (or [] when the API is asleep).
 */

/** providers: key => [label, fetcher] */
function carousel_providers(): array
{
    return [
        'catapi'   => ['Cat',    'fetch_catapi'],
        'cataas'   => ['Cat',    'fetch_cataas'],
        'dogapi'   => ['Dog',    'fetch_dogapi'],
        'duckapi'  => ['Duck',   'fetch_duckapi'],
        'nekoapi'  => ['Neko',   'fetch_nekoapi'],
        'placedog'     => ['Dog',    'fetch_placedog'],
        'placebear'    => ['Bear',   'fetch_placebear'],
        // placekitten rest in peace — origin serves HTTP 521 since ~2025, nya
        // shibe.online rest in peace — domain lapsed, see fetch_cataas()
    ];
}

function provider_label(string $key): string
{
    $p = carousel_providers();
    return $p[$key][0] ?? 'Cat';
}

function provider_fetch(string $key, int $jsonTtl = CACHE_TTL_JSON): array
{
    $p = carousel_providers();
    if (!isset($p[$key])) {
        return [];
    }
    // ttl 0 = bypass the json cache entirely (the "fresh batch" pull);
    // fetchers that don't take a ttl just ignore the extra arg
    $urls = call_user_func($p[$key][1], $jsonTtl);
    // dedupe + keep only http(s) urls, nya
    $urls = array_values(array_unique(array_filter((array) $urls, function ($u) {
        return is_string($u) && preg_match('#^https?://#i', $u);
    })));
    return array_slice($urls, 0, IMG_COUNT);
}

/* ---- the cat ones (json list of urls) ---------------------------------- */

function fetch_catapi(int $ttl = 0): array
{
    // Always pass ttl=0 so each batch roll fetches a genuinely new set of 10 random cats
    $data = http_get_json('https://api.thecatapi.com/v1/images/search?limit=' . IMG_COUNT, 0);
    $out = [];
    foreach ((array) $data as $row) {
        if (!empty($row['url'])) {
            $out[] = $row['url'];
        }
    }
    return $out;
}

/**
 * shibe.online rest in peace (the domain lapsed and the renewal price went to
 * the moon, nya) — cataas.com took its spot in the carousel.
 * /api/cats returns a stable slice, so pull a pool and shuffle it server-side;
 * if the list is asleep, fall back to parallel rolls of the random-cat dice.
 */
function fetch_cataas(int $ttl = CACHE_TTL_JSON): array
{
    $pool = http_get_json('https://cataas.com/api/cats?limit=100', $ttl ?: CACHE_TTL_JSON);
    $ids = [];
    foreach ((array) $pool as $row) {
        if (!empty($row['id'])) {
            $ids[] = $row['id'];
        }
    }
    if (count($ids) >= IMG_COUNT) {
        shuffle($ids);
        $out = [];
        foreach (array_slice($ids, 0, IMG_COUNT) as $id) {
            $out[] = 'https://cataas.com/cat/' . $id;
        }
        return $out;
    }
    // fallback: single random cats, fetched in parallel like the old Promise.all days
    $res = http_get_json_multi(array_fill(0, IMG_COUNT, 'https://cataas.com/cat?json=true'), CACHE_TTL_META);
    $out = [];
    foreach ($res as $j) {
        if (!empty($j['url'])) {
            $out[] = $j['url'];
        } elseif (!empty($j['id'])) {
            $out[] = 'https://cataas.com/cat/' . $j['id'];
        }
    }
    return $out;
}

/* ---- one request per image (parallel curl, like Promise.all) ----------- */

function fetch_dogapi(int $ttl = CACHE_TTL_META): array
{
    $res = http_get_json_multi(array_fill(0, 10, 'https://random.dog/woof.json'), $ttl);
    $out = [];
    foreach ($res as $j) {
        // random.dog also serves .mp4/.webm — the GD proxy can't decode those
        if (!empty($j['url']) && preg_match('#\.(jpe?g|png|gif)(\?|$)#i', (string) $j['url'])) {
            $out[] = $j['url'];
        }
    }
    return $out;
}

function fetch_nekoapi(int $ttl = CACHE_TTL_META): array
{
    $res = http_get_json_multi(array_fill(0, IMG_COUNT, 'https://nekos.life/api/v2/img/neko'), $ttl);
    $out = [];
    foreach ($res as $j) {
        if (!empty($j['url'])) {
            $out[] = $j['url'];
        }
    }
    return $out;
}

function fetch_duckapi(int $ttl = CACHE_TTL_META): array
{
    $res = http_get_json_multi(array_fill(0, 8, 'https://random-d.uk/api/v2/random'), $ttl);
    $out = [];
    foreach ($res as $j) {
        if (!empty($j['url'])) {
            $u = (string) $j['url'];
            // random-d.uk hands out http:// urls — upgrade, or https pages block them
            $out[] = preg_replace('#^http://#i', 'https://', $u);
        }
    }
    return $out;
}

/* ---- place* services: no api, just sized urls (original did the same) -- */

function fetch_placedog(): array
{
    $out = [];
    $used = [];
    while (count($out) < 8) {
        $w = random_int(820, 960);
        $h = random_int(540, 640);
        $key = $w . 'x' . $h;
        if (!isset($used[$key])) {
            $used[$key] = true;
            $out[] = 'https://place.dog/' . $w . '/' . $h;
        }
    }
    return $out;
}

// fetch_placekitten() rests here — origin serves HTTP 521, provider removed

function fetch_placebear(): array
{
    $out = [];
    $used = [];
    while (count($out) < 8) {
        $w = random_int(820, 960);
        $h = random_int(540, 640);
        $key = $w . 'x' . $h;
        if (!isset($used[$key])) {
            $used[$key] = true;
            $out[] = 'https://placebear.com/' . $w . '/' . $h;
        }
    }
    return $out;
}
