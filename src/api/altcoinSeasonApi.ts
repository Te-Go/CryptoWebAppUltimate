import { useMarket } from '../context/MarketContext';

export interface AltcoinSeasonData {
    score: number;
    classification: string;
    classificationTurkish: string;
    altcoinsOutperforming: number;
    totalAltcoins: number;
}

// Turkish classification mapping
const getTurkishClassification = (score: number): { en: string; tr: string } => {
    if (score <= 25) return { en: 'Bitcoin Season', tr: 'Bitcoin Sezonu' };
    if (score <= 75) return { en: 'Neutral', tr: 'Nötr' };
    return { en: 'Altcoin Season', tr: 'Altcoin Sezonu' };
};

// Get color based on score (orange for BTC, purple for altcoins)
export const getAltcoinSeasonColor = (score: number): string => {
    if (score <= 25) return '#F7931A'; // Bitcoin orange
    if (score <= 40) return '#E8A33C';
    if (score <= 60) return '#C88FFA'; // Purple transition
    if (score <= 75) return '#9B59B6';
    return '#8E44AD'; // Deep purple for altcoin season
};

// Calculate altcoin season from crypto data
export function calculateAltcoinSeason(cryptos: { id: string; change30d: number }[]): AltcoinSeasonData {
    // Find Bitcoin's performance
    const bitcoin = cryptos.find(c => c.id === 'bitcoin');
    const btcChange = bitcoin?.change30d ?? 0;

    // Filter altcoins (exclude bitcoin) and count how many outperform BTC
    const altcoins = cryptos.filter(c => c.id !== 'bitcoin');
    const outperforming = altcoins.filter(c => c.change30d > btcChange);

    // Calculate score (0-100)
    const score = altcoins.length > 0
        ? Math.round((outperforming.length / altcoins.length) * 100)
        : 50;

    const classification = getTurkishClassification(score);

    return {
        score,
        classification: classification.en,
        classificationTurkish: classification.tr,
        altcoinsOutperforming: outperforming.length,
        totalAltcoins: altcoins.length,
    };
}

export function useAltcoinSeason(): AltcoinSeasonData {
    const { cryptos } = useMarket();
    return calculateAltcoinSeason(cryptos);
}
