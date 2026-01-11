import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Brain, Cpu } from 'lucide-react';

export function AiStats({ }: { coin: Crypto }) {
    // Mock AI stats
    const computePower = (Math.random() * 50).toFixed(1);
    const models = Math.floor(Math.random() * 100);

    return (
        <GlassCard className="p-6 border-neon-cyan/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-neon-cyan" />
                AI Network Metrics
            </h3>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-neon-cyan/10">
                        <Cpu className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                        <p className="text-sm text-text-muted">Compute Power</p>
                        <p className="text-xl font-bold text-white">{computePower} PFlops</p>
                    </div>
                </div>

                <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-neon-cyan h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }} />
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Active Models</span>
                    <span className="text-neon-cyan font-bold">{models}</span>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-2">
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">Inference</span>
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">Training</span>
                    <span className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-muted">Data</span>
                </div>
            </div>
        </GlassCard>
    );
}
