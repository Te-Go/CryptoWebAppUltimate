import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Shield, Server } from 'lucide-react';

export function Layer1Stats({ coin }: { coin: Crypto }) {
    // Use real data where available, fallback to mock
    // Validators and Block Time aren't in our core mock data yet, so we simulate them
    const tps = Math.floor(Math.random() * 50000) + 1000;

    // Format large numbers
    const formatSupply = (num?: number) => num ? (num / 1e6).toFixed(1) + 'M' : '∞';

    return (
        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-neon-blue" />
                {coin.name} Ağ Verileri
            </h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Hashrate / Güç</p>
                    <p className="text-sm lg:text-xl font-bold text-neon-cyan">
                        {coin.hashrate || `${tps} TPS`}
                    </p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Max Arz</p>
                    <p className="text-sm lg:text-xl font-bold text-text-primary">
                        {coin.maxSupply ? formatSupply(coin.maxSupply) : 'Sınırsız'}
                    </p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Piyasa Hakimiyeti</p>
                    <p className="text-xl font-bold text-neon-purple">
                        {coin.dominance ? `%${coin.dominance}` : '-%'}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/10">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Konsensüs Mekanizması</span>
                    <span className="text-text-primary font-semibold flex items-center gap-1">
                        <Shield className="w-3 h-3 text-profit" />
                        {coin.category.includes('pow') ? 'Proof of Work (PoW)' : 'Proof of Stake (PoS)'}
                    </span>
                </div>
            </div>
        </GlassCard>
    );
}
