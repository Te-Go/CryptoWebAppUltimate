import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { useAltcoinSeason, getAltcoinSeasonColor } from '../../api/altcoinSeasonApi';

export function AltcoinSeasonGauge() {
    const data = useAltcoinSeason();

    // Calculate rotation angle for the needle (-90 to 90 degrees)
    const rotation = (data.score / 100) * 180 - 90;
    const color = getAltcoinSeasonColor(data.score);

    return (
        <GlassCard className="p-4 md:p-5" hover={false}>
            <div className="flex flex-col items-center">
                {/* Title */}
                <h3 className="text-sm font-medium text-text-muted mb-3">
                    Altcoin Sezon Endeksi
                </h3>

                {/* Gauge */}
                <div className="relative w-32 h-16 md:w-40 md:h-20">
                    {/* Background Arc */}
                    <svg viewBox="0 0 100 55" className="w-full h-full">
                        <defs>
                            <linearGradient id="altcoinGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F7931A" />
                                <stop offset="50%" stopColor="#C88FFA" />
                                <stop offset="100%" stopColor="#8E44AD" />
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
                        {/* Colored arc */}
                        <motion.path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="url(#altcoinGaugeGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: data.score / 100 }}
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
                        {data.score}
                    </p>
                    <p
                        className="text-sm font-semibold"
                        style={{ color }}
                    >
                        {data.classificationTurkish}
                    </p>
                </motion.div>

                {/* Info */}
                <p className="text-xs text-text-muted mt-2">
                    {data.altcoinsOutperforming}/{data.totalAltcoins} altcoin BTC'yi geçiyor
                </p>

                {/* Scale labels */}
                <div className="flex justify-between w-full mt-2 px-2">
                    <span className="text-[10px] text-text-muted">🟠 BTC</span>
                    <span className="text-[10px] text-text-muted">🟣 Altcoin</span>
                </div>
            </div>
        </GlassCard>
    );
}
