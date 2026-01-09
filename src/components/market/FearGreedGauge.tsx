import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { useFearGreed, getFearGreedColor } from '../../api/fearGreedApi';

export function FearGreedGauge() {
    const { data, isLoading } = useFearGreed();

    // Calculate rotation angle for the needle (-90 to 90 degrees)
    const rotation = (data.value / 100) * 180 - 90;

    // Calculate how long ago the data was updated
    const getTimeAgo = () => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - data.timestamp;
        const hours = Math.floor(diff / 3600);
        if (hours < 1) return 'Az önce';
        if (hours === 1) return '1 saat önce';
        return `${hours} saat önce`;
    };

    const color = getFearGreedColor(data.value);

    return (
        <GlassCard className="p-4 md:p-5" hover={false}>
            <div className="flex flex-col items-center">
                {/* Title */}
                <h3 className="text-sm font-medium text-text-muted mb-3">
                    Korku & Açgözlülük Endeksi
                </h3>

                {/* Gauge */}
                <div className="relative w-32 h-16 md:w-40 md:h-20">
                    {/* Background Arc */}
                    <svg viewBox="0 0 100 55" className="w-full h-full">
                        <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF3366" />
                                <stop offset="25%" stopColor="#FF6B35" />
                                <stop offset="50%" stopColor="#FFD700" />
                                <stop offset="75%" stopColor="#7ED957" />
                                <stop offset="100%" stopColor="#00FF88" />
                            </linearGradient>
                        </defs>
                        {/* Background arc */}
                        <path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="rgba(139, 154, 171, 0.15)"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        {/* Colored arc based on value */}
                        <motion.path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: data.value / 100 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </svg>

                    {/* Needle */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 origin-bottom"
                        style={{
                            width: '2px',
                            height: '35%',
                            backgroundColor: color,
                            marginLeft: '-1px',
                            boxShadow: `0 0 10px ${color}`,
                        }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: rotation }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    />

                    {/* Center dot */}
                    <div
                        className="absolute bottom-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 translate-y-1/2"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
                        }}
                    />
                </div>

                {/* Value Display */}
                <motion.div
                    className="mt-3 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p
                        className="text-2xl md:text-3xl font-bold font-display"
                        style={{ color }}
                    >
                        {isLoading ? '...' : data.value}
                    </p>
                    <p
                        className="text-sm font-semibold"
                        style={{ color }}
                    >
                        {data.valueTurkish}
                    </p>
                </motion.div>

                {/* Update time */}
                <p className="text-xs text-text-muted mt-2">
                    Güncellendi: {getTimeAgo()}
                </p>

                {/* Scale labels */}
                <div className="flex justify-between w-full mt-2 px-2">
                    <span className="text-[10px] text-text-muted">Korku</span>
                    <span className="text-[10px] text-text-muted">Açgözlülük</span>
                </div>
            </div>
        </GlassCard>
    );
}
