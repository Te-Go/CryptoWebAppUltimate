import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import {
    mockCryptos,
    globalStats,
    topGainers,
    topLosers,
    topVolume,
    newListings,
    trendingCoins,
    categories,
    zones,
    type Crypto,
    type GlobalStats
} from '../data/mockCryptos';

interface MarketContextType {
    cryptos: Crypto[];
    stats: GlobalStats;
    topGainers: Crypto[];
    topLosers: Crypto[];
    topVolume: Crypto[];
    newListings: Crypto[];
    trendingCoins: Crypto[];
    categories: { id: string; name: string; icon: string }[];
    zones: { id: string; name: string }[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    selectedZone: string;
    setSelectedZone: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredCryptos: Crypto[];
    isLoading: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

import { useEffect } from 'react';
import { collectApi } from '../services/api';

export function MarketProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(['bitcoin', 'ethereum']);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedZone, setSelectedZone] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [cryptos, setCryptos] = useState<Crypto[]>(mockCryptos);
    const [stats, setStats] = useState<GlobalStats>(globalStats);

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch Prices
                const response = await collectApi.getCryptos();

                if (response.success && response.result.length > 0) {
                    console.log('API Data Loaded:', response.result.length, 'coins');

                    // Map API Data to our Crypto interface
                    // We need to merge with mock data to keep the rich metadata (description, sparkline, etc.) 
                    // that the simple price API doesn't provide.
                    const updatedCryptos = mockCryptos.map(mockCoin => {
                        const apiCoin = response.result.find(c => c.code === mockCoin.symbol || c.name.toLowerCase() === mockCoin.name.toLowerCase());

                        if (apiCoin) {
                            return {
                                ...mockCoin,
                                price: (typeof apiCoin.price === 'number') ? apiCoin.price : mockCoin.price,
                                change24h: (typeof apiCoin.changeDay === 'number') ? apiCoin.changeDay : mockCoin.change24h,
                                change7d: (typeof apiCoin.changeWeek === 'number') ? apiCoin.changeWeek : mockCoin.change7d,
                                change1h: (typeof apiCoin.changeHour === 'number') ? apiCoin.changeHour : mockCoin.change1h,
                                marketCap: (typeof apiCoin.marketCap === 'number') ? apiCoin.marketCap : mockCoin.marketCap,
                                volume24h: (typeof apiCoin.volume === 'number') ? apiCoin.volume : mockCoin.volume24h,
                                circulatingSupply: (apiCoin.circulatingSupply && typeof apiCoin.circulatingSupply === 'string')
                                    ? parseFloat(apiCoin.circulatingSupply.replace(/[^0-9.]/g, ''))
                                    : (typeof apiCoin.circulatingSupply === 'number' ? apiCoin.circulatingSupply : mockCoin.circulatingSupply)
                            };
                        }
                        return mockCoin; // Return mock data if not found in API (e.g. some long tail coins)
                    });

                    setCryptos(updatedCryptos);
                } else {
                    console.warn('API returned success=false or empty result. Using mock data.');
                }
            } catch (error) {
                console.error('Failed to fetch market data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    // Filter cryptos based on category, zone, and search
    // Use the STATE 'cryptos' instead of imported 'mockCryptos'
    const filteredCryptos = cryptos.filter((crypto) => {
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (
                !crypto.name.toLowerCase().includes(query) &&
                !crypto.symbol.toLowerCase().includes(query)
            ) {
                return false;
            }
        }

        // Category filter
        if (selectedCategory !== 'all' && !crypto.category.includes(selectedCategory)) {
            return false;
        }

        // Zone filter
        if (selectedZone !== 'all' && !crypto.category.includes(selectedZone)) {
            return false;
        }

        return true;
    });

    return (
        <MarketContext.Provider
            value={{
                cryptos: cryptos, // Use state
                stats: stats, // Use state
                topGainers, // Still using mock derived lists - in a full app these should be derived from 'cryptos' state too
                topLosers,
                topVolume,
                newListings,
                trendingCoins,
                categories,
                zones,
                favorites,
                toggleFavorite,
                selectedCategory,
                setSelectedCategory,
                selectedZone,
                setSelectedZone,
                searchQuery,
                setSearchQuery,
                filteredCryptos,
                isLoading,
            }}
        >
            {children}
        </MarketContext.Provider>
    );
}

export function useMarket() {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
}
