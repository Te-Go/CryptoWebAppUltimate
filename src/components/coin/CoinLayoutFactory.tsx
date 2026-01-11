import type { Crypto } from '../../data/mockCryptos';
import { Layer1Stats } from './modules/Layer1Stats';
import { DeFiStats } from './modules/DeFiStats';
import { MemeStats } from './modules/MemeStats';
import { AiStats } from './modules/AiStats';

export type CoinArchetype = 'layer-1' | 'defi' | 'meme' | 'ai' | 'standard';

export function getArchetype(category: string[]): CoinArchetype {
    if (category.includes('meme')) return 'meme';
    if (category.includes('ai')) return 'ai';
    if (category.includes('defi')) return 'defi';
    if (category.includes('layer-1') || category.includes('layer-2')) return 'layer-1';
    return 'standard';
}

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
        default:
            return null; // Standard coins don't get an extra module for now, or use a generic one
    }
}
