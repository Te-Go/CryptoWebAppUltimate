import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Shield, Server } from 'lucide-react';

export function Layer1Stats({ coin }: { coin: Crypto }) {
    // Mock data for L1 stats (in a real app, this would come from API)
    const tps = Math.floor(Math.random() * 50000) + 1000;
    const validators = Math.floor(Math.random() * 5000) + 100;
    const blockTime = (Math.random() * 10 + 0.4).toFixed(1);

    return (
        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-neon-blue" />
                Ağ İstatistikleri
            </h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">İşlem Kapasitesi (Anlık)</p>
                    <p className="text-xl font-bold text-neon-cyan">{tps.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Doğrulayıcılar</p>
                    <p className="text-xl font-bold text-white">{validators.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-bg-secondary/30 rounded-lg">
                    <p className="text-xs text-text-muted mb-1">Blok Süresi</p>
                    <p className="text-xl font-bold text-neon-purple">{blockTime}s</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Konsensüs</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                        <Shield className="w-3 h-3 text-profit" />
                        {coin.category.includes('pow') ? 'Proof of Work' : 'Proof of Stake'}
                    </span>
                </div>
            </div>
        </GlassCard>
    );
}
