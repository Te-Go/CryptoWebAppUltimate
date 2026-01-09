import useSWR from 'swr';

export interface FearGreedData {
    value: number;
    valueClassification: string;
    valueTurkish: string;
    timestamp: number;
    timeUntilUpdate: number;
}

interface ApiResponse {
    data: {
        value: string;
        value_classification: string;
        timestamp: string;
        time_until_update: string;
    }[];
}

// Turkish classification mapping
const getTurkishClassification = (value: number): string => {
    if (value <= 24) return 'Aşırı Korku';
    if (value <= 49) return 'Korku';
    if (value === 50) return 'Nötr';
    if (value <= 74) return 'Açgözlülük';
    return 'Aşırı Açgözlülük';
};

// Get color based on value
export const getFearGreedColor = (value: number): string => {
    if (value <= 24) return '#FF3366'; // Extreme Fear - Red
    if (value <= 39) return '#FF6B35'; // Fear - Orange-Red
    if (value <= 49) return '#FFB800'; // Fear - Orange
    if (value <= 54) return '#FFD700'; // Neutral - Yellow
    if (value <= 64) return '#B8E986'; // Greed - Light Green
    if (value <= 74) return '#7ED957'; // Greed - Green
    return '#00FF88'; // Extreme Greed - Bright Green
};

const fetcher = async (url: string): Promise<FearGreedData> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch Fear & Greed data');
    }
    const json: ApiResponse = await response.json();
    const data = json.data[0];
    const value = parseInt(data.value, 10);

    return {
        value,
        valueClassification: data.value_classification,
        valueTurkish: getTurkishClassification(value),
        timestamp: parseInt(data.timestamp, 10),
        timeUntilUpdate: parseInt(data.time_until_update, 10),
    };
};

// Fallback mock data for when API is unavailable
const MOCK_DATA: FearGreedData = {
    value: 27,
    valueClassification: 'Fear',
    valueTurkish: 'Korku',
    timestamp: Math.floor(Date.now() / 1000),
    timeUntilUpdate: 3600,
};

export function useFearGreed() {
    const { data, error, isLoading } = useSWR<FearGreedData>(
        'https://api.alternative.me/fng/',
        fetcher,
        {
            refreshInterval: 4 * 60 * 60 * 1000, // Refresh every 4 hours
            revalidateOnFocus: false,
            dedupingInterval: 60 * 60 * 1000, // Dedupe for 1 hour
            fallbackData: MOCK_DATA,
        }
    );

    return {
        data: data ?? MOCK_DATA,
        isLoading,
        isError: !!error,
    };
}
