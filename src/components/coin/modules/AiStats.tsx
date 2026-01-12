import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Brain, Cpu } from 'lucide-react';

export function AiStats({ coin }: { coin: Crypto }) {
    // Mock AI stats enhanced with Dev Activity
    const devActivity = coin.developerActivity || Math.floor(Math.random() * 500);
    const computePower = (devActivity / 100).toFixed(1); // Pseudo-correlation

    return (
        <GlassCard className="p-6 border-neon-cyan/30">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-neon-cyan" />
                AI Ağı ve Geliştirme
            </h3>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-neon-cyan/10">
                        <Cpu className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                        <p className="text-sm text-text-muted">Haftalık Geliştirme</p>
                        <p className="text-xl font-bold text-text-primary">{devActivity} Commit</p>
                    </div>
                </div>

                <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-neon-cyan h-full rounded-full" style={{ width: `${Math.min(devActivity / 50, 100)}%` }} />
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Hesaplama Gücü</span>
                    <span className="text-neon-cyan font-bold">{computePower} EH/s (Est)</span>
                </div>

                <div className="pt-4 border-t border-border/10 flex gap-2">
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">Inference</span>
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">Model Training</span>
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">GPU</span>
                </div>
            </div>
        </GlassCard>
    );
}
