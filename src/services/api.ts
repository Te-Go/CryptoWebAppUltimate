/**
 * CoinGecko API Service Integration
 * Documentation: https://www.coingecko.com/en/api/documentation
 */

// CoinGecko Data Interface (Partial for what we need)
export interface CoinGeckoCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h_in_currency?: number;
    price_change_percentage_7d_in_currency?: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    sparkline_in_7d?: {
        price: number[];
    };
}

// Keeping the older Response interface wrapper to minimize breaking changes in MarketContext
// But strictly speaking, CoinGecko returns an array directly, so we'll wrap it.
export interface CollectApiResponse<T> {
    success: boolean;
    result: T[];
}

// Mapping to match the old 'CollectApiCrypto' shape so MarketContext doesn't break
export interface CollectApiCrypto {
    code: string;
    name: string;
    currency: string;
    price: number;
    pricestr: string;
    changeHour: number;
    changeDay: number;
    changeWeek: number;
    volume: number;
    marketCap: number;
    circulatingSupply: string;
    image?: string;
}

const API_KEY = 'CG-5SK9AskaFhoFYrEdSFcXDmeG'; // Provided by user
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Cache configuration
const CACHE_PREFIX = 'cg_cache_';
// 30 req/min = 1 req every 2 seconds.
// We can cache for 60 seconds (1 minute) to be safe and responsive enough.
const CACHE_DURATION = 60 * 1000;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

// --- SAFE STORAGE WRAPPERS ---
// These prevent crashes from quota limits, private browsing, or corrupted data.

interface CacheEntry<T> {
    timestamp: number;
    data: T;
}

function safeGetItem<T>(key: string): CacheEntry<T> | null {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;
        return JSON.parse(item) as CacheEntry<T>;
    } catch (e) {
        console.warn(`[Depolama] "${key}" anahtarı okunamadı:`, e);
        // Attempt to remove corrupted entry
        try { localStorage.removeItem(key); } catch { /* ignore */ }
        return null;
    }
}

function safeSetItem<T>(key: string, value: CacheEntry<T>): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`[Depolama] "${key}" anahtarı yazılamadı. Kota aşılmış olabilir.`, e);
        // Optional: clear old cache entries to make space
    }
}

// --- FETCH WITH RETRY (Exponential Backoff) ---
async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
    let lastError: Error | null = null;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'accept': 'application/json' }
            });

            // Success or client error (4xx) - don't retry client errors
            if (response.ok || (response.status >= 400 && response.status < 500)) {
                return response;
            }

            // Server error (5xx) - retry
            console.warn(`[Yeniden Deneme ${i + 1}/${retries}] Sunucu hatası ${response.status}`);
            lastError = new Error(`API Hatası: ${response.status} ${response.statusText}`);
        } catch (error) {
            // Network error - retry
            console.warn(`[Yeniden Deneme ${i + 1}/${retries}] Ağ hatası:`, error);
            lastError = error instanceof Error ? error : new Error(String(error));
        }

        // Wait before retrying (exponential backoff)
        if (i < retries - 1) {
            const delay = INITIAL_BACKOFF_MS * Math.pow(2, i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw lastError || new Error('Maksimum deneme sayısına ulaşıldı');
}

/**
 * Fetch with Cache Strategy (Resilient)
 */
async function fetchWithCache<T>(endpoint: string, queryParams: string = ''): Promise<T | null> {
    const cacheKey = `${CACHE_PREFIX}${endpoint}${queryParams}`;
    const cached = safeGetItem<T>(cacheKey);
    const now = Date.now();

    // 1. Check Cache
    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        console.log(`[Önbellek] ${endpoint} önbellekten sunuluyor`);
        return cached.data;
    }

    // 2. Fetch Fresh Data with Retry
    try {
        const url = `${BASE_URL}${endpoint}${queryParams}&x_cg_demo_api_key=${API_KEY}`;
        console.log(`[API İsteği] ${endpoint} isteniyor`);

        const response = await fetchWithRetry(url);

        if (!response.ok) {
            console.error(`[API Hatası] Durum: ${response.status}`);
            throw new Error(`API Hatası: ${response.statusText}`);
        }

        const data: T = await response.json();

        // 3. Update Cache (safely)
        safeSetItem(cacheKey, { timestamp: now, data });
        return data;

    } catch (error) {
        console.error('[İstek Başarısız]', error);
        // Fallback to stale cache on any error
        if (cached) {
            console.log(`[Eski Önbellek] ${endpoint} için eski veri sunuluyor`);
            return cached.data;
        }
        return null;
    }
}

export const collectApi = {
    /**
     * Get Cryptos (Mapped to old structure for compatibility)
     */
    getCryptos: async (): Promise<CollectApiResponse<CollectApiCrypto>> => {
        // Fetch Top 100 coins in TRY, including sparkline and price change percentages for 1h, 24h, 7d
        const endpoint = '/coins/markets';
        const params = '?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d';

        const data = await fetchWithCache<CoinGeckoCoin[]>(endpoint, params);

        if (!data) {
            return { success: false, result: [] };
        }

        // Map CoinGecko response to the shape MarketContext expects
        const mappedResult: CollectApiCrypto[] = data.map(coin => ({
            code: coin.symbol.toUpperCase(),
            name: coin.name,
            currency: 'TRY',
            price: coin.current_price,
            pricestr: `₺${coin.current_price}`,
            changeHour: coin.price_change_percentage_1h_in_currency || 0,
            changeDay: coin.price_change_percentage_24h || 0,
            changeWeek: coin.price_change_percentage_7d_in_currency || 0,
            volume: coin.total_volume,
            marketCap: coin.market_cap,
            circulatingSupply: coin.circulating_supply.toString(),
            image: coin.image
        }));

        return { success: true, result: mappedResult };
    }
};
