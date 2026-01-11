import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Currency types
export type Currency = 'TRY' | 'USD' | 'EUR';

export interface CurrencyOption {
    id: Currency;
    symbol: string;
    name: string;
    flag: string;
}

// Currency options with symbols
export const currencyOptions: CurrencyOption[] = [
    { id: 'TRY', symbol: '₺', name: 'Türk Lirası', flag: '🇹🇷' },
    { id: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { id: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
];

// Exchange rates relative to USD (base prices are stored in TRY)
// TRY_TO_USD = 1/35.5, EUR_TO_USD = 1/0.92
interface ExchangeRates {
    TRY: number; // TRY per 1 USD
    USD: number; // always 1
    EUR: number; // EUR per 1 USD
}

// Default mock rates (will be updated from API when available)
const DEFAULT_RATES: ExchangeRates = {
    TRY: 35.5,  // 1 USD = 35.5 TRY
    USD: 1.0,
    EUR: 0.92,  // 1 USD = 0.92 EUR
};

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    currencySymbol: string;
    currencyOption: CurrencyOption;
    rates: ExchangeRates;
    convertFromTRY: (priceInTRY: number) => number;
    formatPrice: (priceInTRY: number) => string;
    formatLargeNumber: (numInTRY: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'kripto-paralar-currency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && ['TRY', 'USD', 'EUR'].includes(stored)) {
                return stored as Currency;
            }
        }
        return 'TRY';
    });

    const [rates] = useState<ExchangeRates>(DEFAULT_RATES);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, currency);
    }, [currency]);

    const setCurrency = (c: Currency) => {
        setCurrencyState(c);
    };

    const currencyOption = currencyOptions.find(opt => opt.id === currency)!;

    // Convert price from TRY to target currency
    const convertFromTRY = (priceInTRY: number): number => {
        if (priceInTRY === undefined || priceInTRY === null || isNaN(priceInTRY)) return 0;
        if (currency === 'TRY') return priceInTRY;
        // First convert TRY to USD, then to target currency
        const priceInUSD = priceInTRY / rates.TRY;
        return priceInUSD * rates[currency];
    };

    // Format price with currency symbol
    const formatPrice = (priceInTRY: number): string => {
        if (priceInTRY === undefined || priceInTRY === null || isNaN(priceInTRY)) return `${currencyOption.symbol}0.00`;

        // Handle extremely small numbers (like Pepe, Shib)
        // If price is 0 (or close to it) from conversion logic but input was valid, show high precision
        const converted = convertFromTRY(priceInTRY);
        const symbol = currencyOption.symbol;

        let formatted: string;
        if (converted === 0) {
            formatted = "0.00";
        } else if (converted >= 1000) {
            formatted = new Intl.NumberFormat(currency === 'TRY' ? 'tr-TR' : 'en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(converted);
        } else {
            formatted = new Intl.NumberFormat(currency === 'TRY' ? 'tr-TR' : 'en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: converted < 1 ? 6 : 2, // 6 decimal places for small coins
            }).format(converted);
        }

        return `${symbol}${formatted}`;
    };

    // Format large numbers (market cap, volume) with suffix
    const formatLargeNumber = (numInTRY: number): string => {
        if (numInTRY === undefined || numInTRY === null || isNaN(numInTRY)) return `${currencyOption.symbol}0`;

        const converted = convertFromTRY(numInTRY);
        const symbol = currencyOption.symbol;

        if (converted >= 1e12) return `${symbol}${(converted / 1e12).toFixed(2)}T`;
        if (converted >= 1e9) return `${symbol}${(converted / 1e9).toFixed(2)}B`;
        if (converted >= 1e6) return `${symbol}${(converted / 1e6).toFixed(2)}M`;
        return `${symbol}${converted.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                currencySymbol: currencyOption.symbol,
                currencyOption,
                rates,
                convertFromTRY,
                formatPrice,
                formatLargeNumber,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
