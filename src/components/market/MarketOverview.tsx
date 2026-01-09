import { TrendingUp, BarChart3, Coins, Activity } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';

export function MarketOverview() {
    const { stats } = useMarket();
    const { formatLargeNumber } = useCurrency();

    const statsData = [
        {
            label: 'Toplam Piyasa Değeri',
            value: formatLargeNumber(stats.totalMarketCap),
            change: stats.marketCapChange24h,
            icon: TrendingUp,
            color: 'cyan',
        },
        {
            label: '24s İşlem Hacmi',
            value: formatLargeNumber(stats.totalVolume24h),
            icon: BarChart3,
            color: 'blue',
        },
        {
            label: 'BTC Hakimiyeti',
            value: `${stats.btcDominance.toFixed(2)}%`,
            icon: Coins,
            color: 'gold',
        },
        {
            label: 'Aktif Kripto',
            value: stats.activeCryptos.toLocaleString('tr-TR'),
            icon: Activity,
            color: 'purple',
        },
    ];

    const colorClasses = {
        cyan: 'from-neon-cyan/20 to-transparent text-neon-cyan',
        blue: 'from-neon-blue/20 to-transparent text-neon-blue',
        gold: 'from-accent-gold/20 to-transparent text-accent-gold',
        purple: 'from-neon-purple/20 to-transparent text-neon-purple',
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {statsData.map((stat) => {
                const Icon = stat.icon;
                const colors = colorClasses[stat.color as keyof typeof colorClasses];

                return (
                    <GlassCard key={stat.label} className="p-4 md:p-5" hover={false}>
                        <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colors}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            {stat.change !== undefined && (
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded ${stat.change >= 0
                                        ? 'bg-profit/15 text-profit'
                                        : 'bg-loss/15 text-loss'
                                        }`}
                                >
                                    {stat.change >= 0 ? '+' : ''}
                                    {stat.change.toFixed(2)}%
                                </span>
                            )}
                        </div>
                        <p className="text-text-muted text-xs md:text-sm mb-1">{stat.label}</p>
                        <p className="text-lg md:text-xl font-bold text-text-primary font-display">
                            {stat.value}
                        </p>
                    </GlassCard>
                );
            })}
        </div>
    );
}
