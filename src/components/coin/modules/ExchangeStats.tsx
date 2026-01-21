import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Building2, Flame, ArrowLeftRight } from 'lucide-react';

export function ExchangeStats({ coin }: { coin: Crypto }) {
    // Exchange token-specific metrics
    const burnRate = Math.floor(Math.random() * 500000) + 100000; // Tokens burned monthly
    const tradingPairs = Math.floor(coin.volume24h / 1e9) * 50 + 500;
    const exchangeVolume = coin.volume24h * 10; // Exchange total volume estimate

    const formatVolume = (vol: number) => {
        if (vol >= 1e12) return `₺${(vol / 1e12).toFixed(1)}T`;
        if (vol >= 1e9) return `₺${(vol / 1e9).toFixed(1)}B`;
        return `₺${(vol / 1e6).toFixed(0)}M`;
    };

    return (
        <GlassCard className="p-6 border-accent-gold/30">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent-gold" />
                Borsa Token Metrikleri
            </h3>

            <div className="space-y-4">
                {/* Exchange Volume */}
                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent-gold/10">
                            <ArrowLeftRight className="w-5 h-5 text-accent-gold" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Borsa 24s Hacmi</p>
                            <p className="text-lg font-bold text-text-primary">{formatVolume(exchangeVolume)}</p>
                        </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-profit/20 text-profit rounded">Top 5</span>
                </div>

                {/* Burn Mechanism */}
                <div className="flex items-center justify-between p-3 bg-bg-secondary/30 rounded-lg border border-loss/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-loss/10">
                            <Flame className="w-5 h-5 text-loss" />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">Aylık Yakım</p>
                            <p className="text-lg font-bold text-loss">{burnRate.toLocaleString('tr-TR')} {coin.symbol}</p>
                        </div>
                    </div>
                    <span className="text-xs text-text-muted">Deflasyonist</span>
                </div>

                {/* Trading Pairs */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-bg-secondary/30 rounded-lg text-center">
                        <p className="text-xs text-text-muted mb-1">İşlem Çiftleri</p>
                        <p className="text-xl font-bold text-neon-blue">{tradingPairs}+</p>
                    </div>
                    <div className="p-3 bg-bg-secondary/30 rounded-lg text-center">
                        <p className="text-xs text-text-muted mb-1">İşlem Ücreti İndirimi</p>
                        <p className="text-xl font-bold text-profit">%25</p>
                    </div>
                </div>
            </div>

            {/* Utility Note */}
            <div className="mt-4 pt-4 border-t border-border/10">
                <p className="text-xs text-text-muted">
                    <span className="text-accent-gold font-medium">{coin.symbol}</span> tutarak işlem ücretlerinde indirim,
                    launchpad erişimi ve özel VIP avantajlarından yararlanın.
                </p>
            </div>
        </GlassCard>
    );
}
