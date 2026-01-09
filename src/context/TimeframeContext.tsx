import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Timeframe types
export type Timeframe = '1h' | '24h' | '7d' | '30d' | '1y';

export interface TimeframeOption {
    id: Timeframe;
    label: string;
    labelShort: string;
}

// Turkish timeframe labels
export const timeframeOptions: TimeframeOption[] = [
    { id: '1h', label: '1 Saat', labelShort: '1S' },
    { id: '24h', label: '24 Saat', labelShort: '24S' },
    { id: '7d', label: '7 Gün', labelShort: '7G' },
    { id: '30d', label: '30 Gün', labelShort: '30G' },
    { id: '1y', label: '1 Yıl', labelShort: '1Y' },
];

interface TimeframeContextType {
    timeframe: Timeframe;
    setTimeframe: (tf: Timeframe) => void;
    timeframeLabel: string;
    timeframeLabelShort: string;
}

const TimeframeContext = createContext<TimeframeContextType | undefined>(undefined);

const STORAGE_KEY = 'kripto-paralar-timeframe';

export function TimeframeProvider({ children }: { children: ReactNode }) {
    const [timeframe, setTimeframeState] = useState<Timeframe>(() => {
        // Load from localStorage or default to 24h
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && ['1h', '24h', '7d', '30d', '1y'].includes(stored)) {
                return stored as Timeframe;
            }
        }
        return '24h';
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, timeframe);
    }, [timeframe]);

    const setTimeframe = (tf: Timeframe) => {
        setTimeframeState(tf);
    };

    const currentOption = timeframeOptions.find(opt => opt.id === timeframe)!;

    return (
        <TimeframeContext.Provider
            value={{
                timeframe,
                setTimeframe,
                timeframeLabel: currentOption.label,
                timeframeLabelShort: currentOption.labelShort,
            }}
        >
            {children}
        </TimeframeContext.Provider>
    );
}

export function useTimeframe() {
    const context = useContext(TimeframeContext);
    if (context === undefined) {
        throw new Error('useTimeframe must be used within a TimeframeProvider');
    }
    return context;
}
