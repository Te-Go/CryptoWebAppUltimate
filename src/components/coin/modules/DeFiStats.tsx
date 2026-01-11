import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { RefreshCw, Lock, Wallet } from 'lucide-react';

export function DeFiStats({ coin }: { coin: Crypto }) {
    // Mock DeFi stats
    const tvl = (coin.marketCap * (0.3 + Math.random() * 0.5)).toLocaleString(undefined, { maximumFractionDigits: 0 });
    const apy = (Math.random() * 15 + 2).toFixed(2);

    return (
        <GlassCard className="p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl -mr-10 -mt-10" />

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <RefreshCw className="w-5 h-5 text-neon-green" />
                DeFi Protokol İstatistikleri
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg border border-profit/20">
                    <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-profit" />
                        <div>
                            <p className="text-xs text-text-muted">Kilitli Toplam Değer (TVL)</p>
                            <p className="text-lg font-bold text-white">₺{tvl}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-neon-blue" />
                        <div>
                            <p className="text-xs text-text-muted">Ortalama Getiri (APY)</p>
                            <p className="text-lg font-bold text-neon-blue">{apy}%</p>
                        </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">Değişken</span>
                </div>
            </div>
        </GlassCard>
    );
}
