import { motion } from 'framer-motion';
import { useSentiment } from '../../context/SentimentContext';
import { GlassCard } from '../ui/GlassCard';

interface SentimentVoteProps {
    coinId: string;
    compact?: boolean;
}

export function SentimentVote({ coinId, compact = false }: SentimentVoteProps) {
    const { getSentiment, vote } = useSentiment();
    const sentiment = getSentiment(coinId);

    const bullishPercent = sentiment.bullishPercent;
    const bearishPercent = 100 - bullishPercent;

    const handleVote = (voteType: 'bullish' | 'bearish') => {
        vote(coinId, voteType);
    };

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleVote('bullish')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${sentiment.userVote === 'bullish'
                            ? 'bg-profit/20 text-profit border border-profit/50'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-profit/10 hover:text-profit'
                        }`}
                >
                    🐂 {bullishPercent.toFixed(0)}%
                </button>
                <button
                    onClick={() => handleVote('bearish')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${sentiment.userVote === 'bearish'
                            ? 'bg-loss/20 text-loss border border-loss/50'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-loss/10 hover:text-loss'
                        }`}
                >
                    🐻 {bearishPercent.toFixed(0)}%
                </button>
            </div>
        );
    }

    return (
        <GlassCard className="p-4" hover={false}>
            <h3 className="text-sm font-medium text-text-muted mb-3 text-center">
                Topluluk Duyarlılığı
            </h3>

            {/* Progress Bar */}
            <div className="relative h-3 rounded-full overflow-hidden bg-bg-tertiary mb-3">
                <motion.div
                    className="absolute left-0 top-0 h-full rounded-l-full"
                    style={{ backgroundColor: '#00FF88' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bullishPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <motion.div
                    className="absolute right-0 top-0 h-full rounded-r-full"
                    style={{ backgroundColor: '#FF3366' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bearishPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Vote Buttons */}
            <div className="flex gap-2">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote('bullish')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${sentiment.userVote === 'bullish'
                            ? 'bg-profit/20 text-profit border-2 border-profit shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-profit/10 hover:text-profit border-2 border-transparent'
                        }`}
                >
                    <span className="text-lg">🐂</span>
                    <span>Yükseliş</span>
                    <span className="text-xs opacity-75">{bullishPercent.toFixed(0)}%</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote('bearish')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${sentiment.userVote === 'bearish'
                            ? 'bg-loss/20 text-loss border-2 border-loss shadow-[0_0_15px_rgba(255,51,102,0.3)]'
                            : 'bg-bg-tertiary text-text-secondary hover:bg-loss/10 hover:text-loss border-2 border-transparent'
                        }`}
                >
                    <span className="text-lg">🐻</span>
                    <span>Düşüş</span>
                    <span className="text-xs opacity-75">{bearishPercent.toFixed(0)}%</span>
                </motion.button>
            </div>

            {/* Vote Count */}
            <p className="text-center text-xs text-text-muted mt-3">
                {sentiment.totalVotes.toLocaleString('tr-TR')} oy
            </p>
        </GlassCard>
    );
}
