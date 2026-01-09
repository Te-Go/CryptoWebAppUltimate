import { motion } from 'framer-motion';
import { useTimeframe, timeframeOptions, type Timeframe } from '../../context/TimeframeContext';

export function TimeframeSelector() {
    const { timeframe, setTimeframe } = useTimeframe();

    return (
        <div className="flex items-center gap-1 p-1 bg-bg-secondary/50 rounded-xl backdrop-blur-sm border border-white/5">
            {timeframeOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setTimeframe(option.id as Timeframe)}
                    className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg"
                    style={{
                        color: timeframe === option.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    }}
                >
                    {timeframe === option.id && (
                        <motion.div
                            layoutId="timeframe-active"
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(0, 163, 255, 0.1))',
                                border: '1px solid rgba(0, 229, 255, 0.3)',
                                boxShadow: '0 0 20px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.05)',
                            }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    <span className="relative z-10">{option.labelShort}</span>
                </button>
            ))}
        </div>
    );
}

// Compact version for inline use (e.g., in CoinDetailPage chart)
export function TimeframeSelectorCompact() {
    const { timeframe, setTimeframe } = useTimeframe();

    return (
        <div className="flex items-center gap-0.5 p-0.5 bg-bg-secondary/30 rounded-lg">
            {timeframeOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setTimeframe(option.id as Timeframe)}
                    className={`
                        px-2 py-1 text-xs font-medium rounded-md transition-all duration-200
                        ${timeframe === option.id
                            ? 'bg-accent-primary/20 text-accent-primary shadow-glow-sm'
                            : 'text-text-tertiary hover:text-text-secondary hover:bg-white/5'
                        }
                    `}
                >
                    {option.labelShort}
                </button>
            ))}
        </div>
    );
}
