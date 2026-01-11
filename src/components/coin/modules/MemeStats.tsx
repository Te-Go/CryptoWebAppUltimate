import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Rocket, Flame, MessageCircle } from 'lucide-react';

export function MemeStats({ }: { coin: Crypto }) {
    // Mock Meme stats
    const hypeScore = Math.floor(Math.random() * 100);

    return (
        <GlassCard className="p-6 border-neon-pink/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-neon-pink" />
                Community Hype
            </h3>

            <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-neon-pink/30 bg-bg-secondary mb-2 relative">
                    <span className="text-3xl font-bold text-neon-pink">{hypeScore}</span>
                    <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs px-2 py-1 rounded-full">HOT</span>
                </div>
                <p className="text-sm text-text-muted">Social Sentiment Score</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-bg-secondary/30 rounded-lg border border-neon-purple/20">
                    <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> Mentions
                    </p>
                    <p className="font-bold text-neon-purple">Very High</p>
                </div>
                <div className="p-3 bg-bg-secondary/30 rounded-lg border border-loss/20">
                    <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-loss" /> Burn Rate
                    </p>
                    <p className="font-bold text-loss">{(Math.random() * 5).toFixed(2)}% / yr</p>
                </div>
            </div>
        </GlassCard>
    );
}
