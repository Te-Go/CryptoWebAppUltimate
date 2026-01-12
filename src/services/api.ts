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

/**
 * Fetch with Cache Strategy
 */
async function fetchWithCache<T>(endpoint: string, queryParams: string = ''): Promise<T | null> {
    const cacheKey = `${CACHE_PREFIX}${endpoint}${queryParams}`;
    const cachedItem = localStorage.getItem(cacheKey);
    const now = Date.now();

    // 1. Check Cache
    if (cachedItem) {
        try {
            const { timestamp, data } = JSON.parse(cachedItem);
            if (now - timestamp < CACHE_DURATION) {
                console.log(`[Cache Hit] Serving ${endpoint}`);
                return data;
            }
        } catch (e) {
            console.warn('Error parsing cache, fetching fresh data.');
        }
    }

    // 2. Fetch Fresh Data
    try {
        const url = `${BASE_URL}${endpoint}${queryParams}&x_cg_demo_api_key=${API_KEY}`;
        console.log(`[API Fetch] Requesting ${endpoint}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Status: ${response.status}`);
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data: T = await response.json();

        // 3. Update Cache
        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: now,
            data: data
        }));
        return data;

    } catch (error) {
        console.error('[Network Error]', error);
        // Fallback to cache on network error
        if (cachedItem) {
            const { data: staleData } = JSON.parse(cachedItem);
            return staleData;
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
