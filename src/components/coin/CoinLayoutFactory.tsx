import type { Crypto } from '../../data/mockCryptos';
import { Layer1Stats } from './modules/Layer1Stats';
import { DeFiStats } from './modules/DeFiStats';
import { MemeStats } from './modules/MemeStats';
import { AiStats } from './modules/AiStats';
import { StablecoinStats } from './modules/StablecoinStats';
import { ExchangeStats } from './modules/ExchangeStats';
import { GenericStats } from './modules/GenericStats';

export type CoinArchetype = 'layer-1' | 'defi' | 'meme' | 'ai' | 'stablecoin' | 'exchange' | 'standard';

/**
 * Determines the coin archetype based on category array.
 * Per Golden Master SEO Blueprint 4.1: Template Entropy to avoid doorway pages.
 */
export function getArchetype(category: string[]): CoinArchetype {
    // Priority order matters - most specific first
    if (category.includes('stablecoin')) return 'stablecoin';
    if (category.includes('exchange-token') || category.includes('exchange')) return 'exchange';
    if (category.includes('meme')) return 'meme';
    if (category.includes('ai')) return 'ai';
    if (category.includes('defi') || category.includes('dex')) return 'defi';
    if (category.includes('layer-1') || category.includes('layer-2') || category.includes('layer-0')) return 'layer-1';
    return 'standard';
}

/**
 * CoinLayoutFactory - Renders archetype-specific modules.
 * Ensures every coin page has unique content structure.
 */
export function CoinLayoutFactory({ coin }: { coin: Crypto }) {
    const archetype = getArchetype(coin.category);

    switch (archetype) {
        case 'layer-1':
            return <Layer1Stats coin={coin} />;
        case 'defi':
            return <DeFiStats coin={coin} />;
        case 'meme':
            return <MemeStats coin={coin} />;
        case 'ai':
            return <AiStats coin={coin} />;
        case 'stablecoin':
            return <StablecoinStats coin={coin} />;
        case 'exchange':
            return <ExchangeStats coin={coin} />;
        case 'standard':
        default:
            // GenericStats ensures no page returns null (SEO safety)
            return <GenericStats coin={coin} />;
    }
}

