// Mock cryptocurrency data with Turkish Lira prices
export interface Crypto {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    image: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    change30d: number;
    change1y: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    sparkline: number[];
    category: string[];
}

// Helper to get change by timeframe
export function getChangeByTimeframe(crypto: Crypto, timeframe: '1h' | '24h' | '7d' | '30d' | '1y'): number {
    switch (timeframe) {
        case '1h': return crypto.change1h;
        case '24h': return crypto.change24h;
        case '7d': return crypto.change7d;
        case '30d': return crypto.change30d;
        case '1y': return crypto.change1y;
        default: return crypto.change24h;
    }
}

export interface GlobalStats {
    totalMarketCap: number;
    totalVolume24h: number;
    btcDominance: number;
    ethDominance: number;
    activeCryptos: number;
    markets: number;
    marketCapChange24h: number;
}

// Turkish Lira exchange rate (approximate) - for API integration
// const TRY_RATE = 35.5;

// Generate realistic sparkline data
const generateSparkline = (basePrice: number, volatility: number = 0.05): number[] => {
    const points = 24;
    const data: number[] = [];
    let price = basePrice * (1 - volatility);

    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
        price = Math.max(price + change, basePrice * 0.8);
        data.push(price);
    }
    return data;
};

export const globalStats: GlobalStats = {
    totalMarketCap: 134.19 * 1e12, // ₺134.19T
    totalVolume24h: 4.72 * 1e12, // ₺4.72T
    btcDominance: 58.43,
    ethDominance: 12.09,
    activeCryptos: 15234,
    markets: 1124,
    marketCapChange24h: 0.35,
};

export const mockCryptos: Crypto[] = [
    {
        id: 'bitcoin',
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        price: 3_927_500, // ~$110,500 * 35.5
        change1h: 0.12,
        change24h: 2.35,
        change7d: -1.24,
        change30d: 15.67,
        change1y: 142.35,
        marketCap: 78_409_729_395_304,
        volume24h: 1_785_702_219_354,
        circulatingSupply: 19_850_000,
        sparkline: generateSparkline(3_927_500),
        category: ['layer-1', 'pow'],
    },
    {
        id: 'ethereum',
        rank: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        price: 134_515, // ~$3,790 * 35.5
        change1h: -0.08,
        change24h: 1.87,
        change7d: 4.52,
        change30d: 22.45,
        change1y: 89.12,
        marketCap: 16_222_399_500_149,
        volume24h: 965_440_690_281,
        circulatingSupply: 120_450_000,
        sparkline: generateSparkline(134_515),
        category: ['layer-1', 'smart-contracts', 'defi'],
    },
    {
        id: 'tether',
        rank: 3,
        name: 'Tether',
        symbol: 'USDT',
        image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
        price: 35.52,
        change1h: 0.01,
        change24h: 0.02,
        change7d: 0.01,
        change30d: 0.03,
        change1y: 0.05,
        marketCap: 8_062_267_071_538,
        volume24h: 3_867_338_436_573,
        circulatingSupply: 143_000_000_000,
        sparkline: generateSparkline(35.52, 0.001),
        category: ['stablecoin'],
    },
    {
        id: 'xrp',
        rank: 4,
        name: 'XRP',
        symbol: 'XRP',
        image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
        price: 96.87,
        change1h: 0.45,
        change24h: 5.23,
        change7d: 12.45,
        change30d: 45.23,
        change1y: 312.45,
        marketCap: 5_579_407_553_121,
        volume24h: 187_594_753_485,
        circulatingSupply: 57_600_000_000,
        sparkline: generateSparkline(96.87, 0.08),
        category: ['layer-1', 'payments'],
    },
    {
        id: 'bnb',
        rank: 5,
        name: 'BNB',
        symbol: 'BNB',
        image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
        price: 36_725,
        change1h: -0.22,
        change24h: 0.89,
        change7d: 2.15,
        change30d: 8.45,
        change1y: 156.78,
        marketCap: 5_329_340_859_336,
        volume24h: 90_171_855_150,
        circulatingSupply: 145_000_000,
        sparkline: generateSparkline(36_725),
        category: ['layer-1', 'exchange-token', 'bnb-chain'],
    },
    {
        id: 'solana',
        rank: 6,
        name: 'Solana',
        symbol: 'SOL',
        image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
        price: 7_207,
        change1h: 0.67,
        change24h: 3.45,
        change7d: -2.87,
        change30d: 18.92,
        change1y: 245.67,
        marketCap: 3_402_472_203_318,
        volume24h: 212_121_457_103,
        circulatingSupply: 472_000_000,
        sparkline: generateSparkline(7_207, 0.07),
        category: ['layer-1', 'smart-contracts', 'solana-ecosystem'],
    },
    {
        id: 'usdc',
        rank: 7,
        name: 'USD Coin',
        symbol: 'USDC',
        image: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
        price: 35.51,
        change1h: 0.00,
        change24h: 0.01,
        change7d: 0.02,
        change30d: 0.04,
        change1y: 0.08,
        marketCap: 3_232_883_760_315,
        volume24h: 550_465_688_345,
        circulatingSupply: 91_000_000_000,
        sparkline: generateSparkline(35.51, 0.001),
        category: ['stablecoin'],
    },
    {
        id: 'dogecoin',
        rank: 8,
        name: 'Dogecoin',
        symbol: 'DOGE',
        image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
        price: 12.78,
        change1h: 1.23,
        change24h: 8.45,
        change7d: 15.67,
        change30d: 42.34,
        change1y: 178.92,
        marketCap: 1_035_162_804_667,
        volume24h: 68_634_662_032,
        circulatingSupply: 147_000_000_000,
        sparkline: generateSparkline(12.78, 0.12),
        category: ['meme', 'pow'],
    },
    {
        id: 'cardano',
        rank: 9,
        name: 'Cardano',
        symbol: 'ADA',
        image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
        price: 38.24,
        change1h: 0.34,
        change24h: 2.15,
        change7d: 6.78,
        change30d: 28.45,
        change1y: 65.23,
        marketCap: 613_977_402_577,
        volume24h: 26_297_972_301,
        circulatingSupply: 35_500_000_000,
        sparkline: generateSparkline(38.24, 0.06),
        category: ['layer-1', 'smart-contracts', 'pos'],
    },
    {
        id: 'tron',
        rank: 10,
        name: 'TRON',
        symbol: 'TRX',
        image: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png',
        price: 9.23,
        change1h: 0.15,
        change24h: 1.23,
        change7d: 3.45,
        change30d: 12.67,
        change1y: 98.45,
        marketCap: 1_200_122_971_282,
        volume24h: 23_875_944_020,
        circulatingSupply: 86_200_000_000,
        sparkline: generateSparkline(9.23),
        category: ['layer-1', 'smart-contracts'],
    },
    {
        id: 'chainlink',
        rank: 11,
        name: 'Chainlink',
        symbol: 'LINK',
        image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
        price: 894.25,
        change1h: -0.45,
        change24h: 4.56,
        change7d: 8.92,
        change30d: 32.15,
        change1y: 189.34,
        marketCap: 404_452_177_452,
        volume24h: 28_689_818_811,
        circulatingSupply: 626_000_000,
        sparkline: generateSparkline(894.25, 0.07),
        category: ['oracle', 'defi'],
    },
    {
        id: 'avalanche',
        rank: 12,
        name: 'Avalanche',
        symbol: 'AVAX',
        image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
        price: 1_456.78,
        change1h: 0.89,
        change24h: 5.67,
        change7d: -3.21,
        change30d: 14.56,
        change1y: 78.23,
        marketCap: 245_678_901_234,
        volume24h: 15_678_901_234,
        circulatingSupply: 412_000_000,
        sparkline: generateSparkline(1_456.78, 0.08),
        category: ['layer-1', 'smart-contracts', 'defi'],
    },
    {
        id: 'polkadot',
        rank: 13,
        name: 'Polkadot',
        symbol: 'DOT',
        image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
        price: 284.56,
        change1h: 0.23,
        change24h: 3.45,
        change7d: 7.89,
        change30d: 21.34,
        change1y: 45.67,
        marketCap: 198_765_432_109,
        volume24h: 12_345_678_901,
        circulatingSupply: 1_450_000_000,
        sparkline: generateSparkline(284.56, 0.06),
        category: ['layer-0', 'smart-contracts'],
    },
    {
        id: 'shiba-inu',
        rank: 14,
        name: 'Shiba Inu',
        symbol: 'SHIB',
        image: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
        price: 0.000887,
        change1h: 2.34,
        change24h: 12.45,
        change7d: 25.67,
        change30d: 85.23,
        change1y: 456.78,
        marketCap: 145_678_901_234,
        volume24h: 8_765_432_109,
        circulatingSupply: 589_000_000_000_000,
        sparkline: generateSparkline(0.000887, 0.15),
        category: ['meme', 'ethereum-ecosystem'],
    },
    {
        id: 'polygon',
        rank: 15,
        name: 'Polygon',
        symbol: 'POL',
        image: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png',
        price: 17.82,
        change1h: -0.12,
        change24h: 2.89,
        change7d: 5.43,
        change30d: 18.76,
        change1y: 67.89,
        marketCap: 134_567_890_123,
        volume24h: 6_543_210_987,
        circulatingSupply: 10_000_000_000,
        sparkline: generateSparkline(17.82, 0.06),
        category: ['layer-2', 'smart-contracts', 'scaling'],
    },
    {
        id: 'litecoin',
        rank: 16,
        name: 'Litecoin',
        symbol: 'LTC',
        image: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
        price: 4_123.45,
        change1h: 0.45,
        change24h: 1.23,
        change7d: 2.34,
        change30d: 9.87,
        change1y: 34.56,
        marketCap: 123_456_789_012,
        volume24h: 5_432_109_876,
        circulatingSupply: 75_000_000,
        sparkline: generateSparkline(4_123.45),
        category: ['layer-1', 'pow', 'payments'],
    },
    {
        id: 'uniswap',
        rank: 17,
        name: 'Uniswap',
        symbol: 'UNI',
        image: 'https://assets.coingecko.com/coins/images/12504/small/uniswap.png',
        price: 532.18,
        change1h: 0.78,
        change24h: 4.56,
        change7d: 9.87,
        change30d: 35.67,
        change1y: 123.45,
        marketCap: 112_345_678_901,
        volume24h: 4_321_098_765,
        circulatingSupply: 1_000_000_000,
        sparkline: generateSparkline(532.18, 0.07),
        category: ['defi', 'dex', 'ethereum-ecosystem'],
    },
    {
        id: 'near',
        rank: 18,
        name: 'NEAR Protocol',
        symbol: 'NEAR',
        image: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg',
        price: 213.45,
        change1h: 1.23,
        change24h: 6.78,
        change7d: 12.34,
        change30d: 45.89,
        change1y: 278.90,
        marketCap: 98_765_432_109,
        volume24h: 3_210_987_654,
        circulatingSupply: 1_200_000_000,
        sparkline: generateSparkline(213.45, 0.08),
        category: ['layer-1', 'smart-contracts', 'ai'],
    },
    {
        id: 'pepe',
        rank: 19,
        name: 'Pepe',
        symbol: 'PEPE',
        image: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg',
        price: 0.000711,
        change1h: 3.45,
        change24h: 15.67,
        change7d: 35.89,
        change30d: 125.45,
        change1y: 890.12,
        marketCap: 87_654_321_098,
        volume24h: 7_654_321_098,
        circulatingSupply: 420_690_000_000_000,
        sparkline: generateSparkline(0.000711, 0.2),
        category: ['meme', 'ethereum-ecosystem'],
    },
    {
        id: 'sui',
        rank: 20,
        name: 'Sui',
        symbol: 'SUI',
        image: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
        price: 156.78,
        change1h: 0.89,
        change24h: 5.43,
        change7d: 18.76,
        change30d: 67.89,
        change1y: 345.67,
        marketCap: 76_543_210_987,
        volume24h: 4_567_890_123,
        circulatingSupply: 2_800_000_000,
        sparkline: generateSparkline(156.78, 0.1),
        category: ['layer-1', 'smart-contracts', 'move'],
    },
];

// Trending coins (top performers)
export const trendingCoins = mockCryptos
    .filter((c) => c.change24h > 5)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 4);

// Top gainers
export const topGainers = [...mockCryptos]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 4);

// Top losers
export const topLosers = [...mockCryptos]
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 4);

// Top volume
export const topVolume = [...mockCryptos]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 4);

// New listings (for demo, use last 4)
export const newListings = mockCryptos.slice(-4).reverse();

// Categories
export const categories = [
    { id: 'all', name: 'Tümü', icon: '🌐' },
    { id: 'defi', name: 'DeFi', icon: '💰' },
    { id: 'layer-1', name: 'Layer 1', icon: '⛓️' },
    { id: 'layer-2', name: 'Layer 2', icon: '🔗' },
    { id: 'meme', name: 'Meme', icon: '🐸' },
    { id: 'ai', name: 'AI', icon: '🤖' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'nft', name: 'NFT', icon: '🖼️' },
    { id: 'stablecoin', name: 'Stablecoin', icon: '💵' },
];

// Zone filters (blockchain ecosystems)
export const zones = [
    { id: 'all', name: 'Tümü' },
    { id: 'ethereum-ecosystem', name: 'Ethereum' },
    { id: 'bnb-chain', name: 'BNB Chain' },
    { id: 'solana-ecosystem', name: 'Solana' },
    { id: 'polygon', name: 'Polygon' },
    { id: 'arbitrum', name: 'Arbitrum' },
    { id: 'optimism', name: 'Optimism' },
    { id: 'avalanche', name: 'Avalanche' },
    { id: 'base', name: 'Base' },
];
