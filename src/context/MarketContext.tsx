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

export function MarketProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(['bitcoin', 'ethereum']);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedZone, setSelectedZone] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading] = useState(false);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    // Filter cryptos based on category, zone, and search
    const filteredCryptos = mockCryptos.filter((crypto) => {
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
                cryptos: mockCryptos,
                stats: globalStats,
                topGainers,
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
