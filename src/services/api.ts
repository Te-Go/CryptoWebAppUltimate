/**
 * CollectAPI Service Integration
 * Documentation: https://collectapi.com/api/economy/currency-api
 */

export interface CollectApiCurrency {
    code: string;
    name: string;
    rate: number;
    calculatedstr: string;
    calculated: number;
}

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
}

export interface CollectApiResponse<T> {
    success: boolean;
    result: T[];
}

const API_KEY = import.meta.env.VITE_COLLECTAPI_KEY || 'your_token';
const BASE_URL = 'https://api.collectapi.com/economy';

// Cache configuration
const CACHE_PREFIX = 'crypto_cache_';
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

/**
 * Fetch with Cache Strategy (Stale-While-Revalidate pattern manually implemented)
 */
async function fetchWithCache<T>(endpoint: string, queryParams: string = ''): Promise<CollectApiResponse<T>> {
    const cacheKey = `${CACHE_PREFIX}${endpoint}${queryParams}`;
    const cachedItem = localStorage.getItem(cacheKey);
    const now = Date.now();

    // 1. Check Cache
    if (cachedItem) {
        try {
            const { timestamp, data } = JSON.parse(cachedItem);
            // If cache is fresh (< 60 mins), return data immediately AND DO NOT FETCH
            if (now - timestamp < CACHE_DURATION) {
                console.log(`[Cache Hit] Serving ${endpoint} from local storage.`);
                return data;
            }
            console.log(`[Cache Stale] Expired ${endpoint}. Fetching new data...`);
        } catch (e) {
            console.warn('Error parsing cache, fetching fresh data.');
        }
    }

    // 2. Fetch Fresh Data (if no cache or stale)
    try {
        const url = `${BASE_URL}${endpoint}${queryParams}`;
        console.log(`[API Fetch] Requesting ${url}`);

        let apiKeyToUse = API_KEY;
        // Clean up key if it was pasted with 'apikey ' prefix in .env
        if (apiKeyToUse.startsWith('apikey ')) {
            // It's fine, the header expects "apikey token" or just "authorization: apikey token"
            // If the env var is "apikey xyz", we should verify if we need to add "apikey" again.
            // Standard format is header: "authorization: apikey your_token"
            // If env var is "apikey 3jP...", then header value matches.
        } else {
            // If just the token, prepend "apikey "
            apiKeyToUse = `apikey ${apiKeyToUse}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': apiKeyToUse
            }
        });

        const data: CollectApiResponse<T> = await response.json();

        if (data.success) {
            // 3. Update Cache
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: data
            }));
            return data;
        } else {
            console.error('[API Error]', data);
            // Return stale cache if available as fallback on error
            if (cachedItem) {
                const { data: staleData } = JSON.parse(cachedItem);
                return staleData;
            }
            return { success: false, result: [] };
        }
    } catch (error) {
        console.error('[Network Error]', error);
        // Fallback to cache on network error
        if (cachedItem) {
            const { data: staleData } = JSON.parse(cachedItem);
            return staleData;
        }
        return { success: false, result: [] };
    }
}

export const collectApi = {
    /**
     * Get All Currencies
     * Endpoint: /currencyToAll
     */
    getCurrencies: async (base: string = 'USD'): Promise<CollectApiResponse<CollectApiCurrency>> => {
        return fetchWithCache<CollectApiCurrency>('/currencyToAll', `?int=10&base=${base}`);
    },

    /**
     * Get All Cryptocurrencies
     * Endpoint: /cripto
     */
    getCryptos: async (): Promise<CollectApiResponse<CollectApiCrypto>> => {
        return fetchWithCache<CollectApiCrypto>('/cripto');
    }
};
