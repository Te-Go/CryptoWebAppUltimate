import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type VoteType = 'bullish' | 'bearish' | null;

interface SentimentData {
    bullishPercent: number;
    totalVotes: number;
    userVote: VoteType;
}

interface SentimentContextType {
    getSentiment: (coinId: string) => SentimentData;
    vote: (coinId: string, voteType: 'bullish' | 'bearish') => void;
    hasVoted: (coinId: string) => boolean;
}

const SentimentContext = createContext<SentimentContextType | undefined>(undefined);

const STORAGE_KEY = 'kripto-paralar-sentiment';

// Generate mock aggregate sentiment data for each coin
const generateMockSentiment = (coinId: string): { bullishPercent: number; totalVotes: number } => {
    // Use coinId hash to generate consistent random values
    let hash = 0;
    for (let i = 0; i < coinId.length; i++) {
        hash = coinId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Top coins tend to be more bullish (60-85%)
    const baseBullish = 55 + Math.abs(hash % 30);
    const totalVotes = 1000 + Math.abs((hash * 7) % 9000);

    return {
        bullishPercent: baseBullish,
        totalVotes,
    };
};

export function SentimentProvider({ children }: { children: ReactNode }) {
    // User's votes stored as { coinId: 'bullish' | 'bearish' }
    const [userVotes, setUserVotes] = useState<Record<string, VoteType>>(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                return stored ? JSON.parse(stored) : {};
            } catch {
                return {};
            }
        }
        return {};
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userVotes));
    }, [userVotes]);

    const getSentiment = (coinId: string): SentimentData => {
        const mock = generateMockSentiment(coinId);
        const userVote = userVotes[coinId] || null;

        // Adjust percentages slightly based on user vote
        let bullishPercent = mock.bullishPercent;
        if (userVote === 'bullish') {
            bullishPercent = Math.min(99, bullishPercent + 0.5);
        } else if (userVote === 'bearish') {
            bullishPercent = Math.max(1, bullishPercent - 0.5);
        }

        return {
            bullishPercent: Math.round(bullishPercent * 10) / 10,
            totalVotes: mock.totalVotes + (userVote ? 1 : 0),
            userVote,
        };
    };

    const vote = (coinId: string, voteType: 'bullish' | 'bearish') => {
        setUserVotes((prev) => {
            const currentVote = prev[coinId];
            // Toggle off if same vote, otherwise set new vote
            if (currentVote === voteType) {
                const { [coinId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [coinId]: voteType };
        });
    };

    const hasVoted = (coinId: string): boolean => {
        return !!userVotes[coinId];
    };

    return (
        <SentimentContext.Provider value={{ getSentiment, vote, hasVoted }}>
            {children}
        </SentimentContext.Provider>
    );
}

export function useSentiment() {
    const context = useContext(SentimentContext);
    if (context === undefined) {
        throw new Error('useSentiment must be used within a SentimentProvider');
    }
    return context;
}
