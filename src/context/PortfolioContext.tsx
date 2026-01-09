import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Holding {
    coinId: string;
    quantity: number;
    buyPrice: number; // Price per unit when purchased (in TRY)
    addedAt: number;  // Timestamp
}

interface PortfolioContextType {
    holdings: Holding[];
    addHolding: (coinId: string, quantity: number, buyPrice: number) => void;
    removeHolding: (coinId: string) => void;
    updateHolding: (coinId: string, quantity: number, buyPrice?: number) => void;
    getHolding: (coinId: string) => Holding | undefined;
    clearPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'kripto-paralar-portfolio';

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [holdings, setHoldings] = useState<Holding[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : [];
            } catch {
                return [];
            }
        }
        return [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
    }, [holdings]);

    const addHolding = (coinId: string, quantity: number, buyPrice: number) => {
        setHoldings((prev) => {
            // Check if already exists
            const existing = prev.find((h) => h.coinId === coinId);
            if (existing) {
                // Update existing - average the buy price
                const totalValue = existing.quantity * existing.buyPrice + quantity * buyPrice;
                const totalQuantity = existing.quantity + quantity;
                const avgPrice = totalValue / totalQuantity;

                return prev.map((h) =>
                    h.coinId === coinId
                        ? { ...h, quantity: totalQuantity, buyPrice: avgPrice }
                        : h
                );
            }
            // Add new
            return [...prev, { coinId, quantity, buyPrice, addedAt: Date.now() }];
        });
    };

    const removeHolding = (coinId: string) => {
        setHoldings((prev) => prev.filter((h) => h.coinId !== coinId));
    };

    const updateHolding = (coinId: string, quantity: number, buyPrice?: number) => {
        setHoldings((prev) =>
            prev.map((h) =>
                h.coinId === coinId
                    ? { ...h, quantity, ...(buyPrice !== undefined && { buyPrice }) }
                    : h
            )
        );
    };

    const getHolding = (coinId: string): Holding | undefined => {
        return holdings.find((h) => h.coinId === coinId);
    };

    const clearPortfolio = () => {
        setHoldings([]);
    };

    return (
        <PortfolioContext.Provider
            value={{
                holdings,
                addHolding,
                removeHolding,
                updateHolding,
                getHolding,
                clearPortfolio,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}
