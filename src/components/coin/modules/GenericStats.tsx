import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { BarChart3, TrendingUp, CircleDollarSign } from 'lucide-react';

export function GenericStats({ coin }: { coin: Crypto }) {
    // Generic fallback for coins without specific archetype
    const formatNumber = (num: number) => {
        if (num >= 1e12) return `₺${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `₺${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `₺${(num / 1e6).toFixed(0)}M`;
        return `₺${num.toLocaleString('tr-TR')}`;
    };

    const supplyRatio = coin.circulatingSupply / (coin.maxSupply || coin.circulatingSupply);
    const volumeToMcapRatio = (coin.volume24h / coin.marketCap * 100).toFixed(1);

    return (
        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-neon-blue" />
                Temel Metrikler
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {/* Volume to Market Cap Ratio */}
                <div className="p-4 bg-bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-neon-cyan" />
                        <span className="text-xs text-text-muted">Hacim/Değer Oranı</span>
                    </div>
                    <p className="text-xl font-bold text-text-primary">%{volumeToMcapRatio}</p>
                    <p className="text-xs text-text-muted mt-1">
                        {parseFloat(volumeToMcapRatio) > 10 ? 'Yüksek Likidite' : 'Normal Likidite'}
                    </p>
                </div>

                {/* Supply Ratio */}
                <div className="p-4 bg-bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <CircleDollarSign className="w-4 h-4 text-neon-purple" />
                        <span className="text-xs text-text-muted">Dolaşım Oranı</span>
                    </div>
                    <p className="text-xl font-bold text-text-primary">%{(supplyRatio * 100).toFixed(0)}</p>
                    <div className="w-full bg-bg-tertiary h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-neon-purple rounded-full"
                            style={{ width: `${supplyRatio * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 bg-bg-secondary/20 rounded-lg">
                    <p className="text-xs text-text-muted">Dolaşımdaki Arz</p>
                    <p className="text-sm font-bold text-text-primary">
                        {(coin.circulatingSupply / 1e6).toFixed(1)}M
                    </p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/20 rounded-lg">
                    <p className="text-xs text-text-muted">Max Arz</p>
                    <p className="text-sm font-bold text-text-primary">
                        {coin.maxSupply ? `${(coin.maxSupply / 1e6).toFixed(1)}M` : '∞'}
                    </p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/20 rounded-lg">
                    <p className="text-xs text-text-muted">Piyasa Değeri</p>
                    <p className="text-sm font-bold text-text-primary">
                        {formatNumber(coin.marketCap)}
                    </p>
                </div>
            </div>
        </GlassCard>
    );
}
