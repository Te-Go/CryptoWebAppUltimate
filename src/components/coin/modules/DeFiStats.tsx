import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { RefreshCw, Lock, Wallet } from 'lucide-react';

export function DeFiStats({ coin }: { coin: Crypto }) {
    // Use real mocked data if available, or generate a realistic fallback
    const tvlValue = coin.tvl || (coin.marketCap * 0.15);
    const tvlFormatted = tvlValue < 1e9
        ? `₺${(tvlValue / 1e6).toFixed(0)}M`
        : `₺${(tvlValue / 1e9).toFixed(2)}B`;

    const apyValue = coin.apy || (Math.random() * 15 + 2).toFixed(2);

    return (
        <GlassCard className="p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl -mr-10 -mt-10" />

            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2 relative z-10">
                <RefreshCw className="w-5 h-5 text-neon-green" />
                {coin.name} DeFi Metrikleri
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg border border-profit/20">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-profit" />
                        <div>
                            <p className="text-xs text-text-muted">Kilitli Toplam Değer (TVL)</p>
                            <p className="text-lg font-bold text-text-primary">{tvlFormatted}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-neon-blue" />
                        <div>
                            <p className="text-xs text-text-muted">Ortalama Getiri (APY)</p>
                            <p className="text-lg font-bold text-neon-blue">%{apyValue}</p>
                        </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">Tahmini</span>
                </div>
            </div>
        </GlassCard>
    );
}
