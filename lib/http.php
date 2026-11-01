<?php
/** opportunistic janitor: ~2% of requests sweep cache files past 2x ttl
 * (the img cache never shrank by itself; small disks stay small, nya) */
function gc_cache(): void
{
    if (mt_rand(1, 50) !== 1) {
        return;
    }
    $limit = time() - CACHE_TTL_IMG * 2;
    foreach (glob(CACHE_DIR . '/*') ?: [] as $f) {
        if (is_file($f) && filemtime($f) < $limit) {
            @unlink($f);
        }
    }
}

/** curl GET with a dumb file cache. $url is the cache key. */
function http_get_cached(string $url, int $ttl): string
{
    $dir = CACHE_DIR;
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
    $key = $dir . '/http_' . sha1($url) . '.cache';
    /* ttl 0 = bypass: always hit upstream and refresh the cache
     * (used by the "fresh batch" pull at the end of the reel, nya) */
    if ($ttl > 0 && is_file($key) && (time() - filemtime($key)) < $ttl) {
        return (string) file_get_contents($key);
    }
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 5,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_USERAGENT      => 'cat-carousel-php/' . APP_VERSION . ' (retro edition)',
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($body === false || $code >= 400) {
        // serve stale cache rather than nothing (offline-friendly, nya~)
        return is_file($key) ? (string) file_get_contents($key) : '';
    }
    @file_put_contents($key, $body);
    return (string) $body;
}

/** GET json from several endpoints in parallel; returns list of decoded payloads ('' on failure).
 * NOTE: deliberately no disk cache — these are dice-roll endpoints and ten
 * identical urls would collapse into one cached roll. Always live. */
function http_get_json_multi(array $urls, int $ttl): array
{
    if (!$urls) {
        return [];
    }
    $mh  = curl_multi_init();
    $chs = [];
    foreach ($urls as $i => $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS      => 5,
            CURLOPT_TIMEOUT        => 6,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_USERAGENT      => 'cat-carousel-php/' . APP_VERSION . ' (retro edition)',
        ]);
        curl_multi_add_handle($mh, $ch);
        $chs[$i] = $ch;
    }
    do {
        curl_multi_exec($mh, $running);
        if ($running) {
            curl_multi_select($mh, 0.2);
        }
    } while ($running);
    $out = [];
    foreach ($chs as $i => $ch) {
        $body = curl_multi_getcontent($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $out[$i] = ($body !== false && $body !== null && $code < 400) ? json_decode((string) $body, true) : null;
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
    curl_multi_close($mh);
    return $out;
}

/** GET a single JSON document. */
function http_get_json(string $url, int $ttl)
{
    $raw = http_get_cached($url, $ttl);
    return $raw === '' ? null : json_decode($raw, true);
}
