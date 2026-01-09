import { Flame, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';

interface TrendingCardProps {
    title: string;
    icon: React.ReactNode;
    coins: { name: string; symbol: string; image: string; formattedPrice: string; change: number }[];
    accentColor: string;
}

function TrendingCard({ title, icon, coins, accentColor }: TrendingCardProps) {
    return (
        <GlassCard className="p-4" hover={false}>
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg ${accentColor}`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-text-primary">{title}</h3>
            </div>
            <div className="space-y-3">
                {coins.slice(0, 3).map((coin, index) => (
                    <div key={coin.symbol} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-text-muted text-xs w-4">{index + 1}</span>
                            <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                            <div>
                                <p className="text-sm font-medium text-text-primary">{coin.symbol}</p>
                                <p className="text-xs text-text-muted">{coin.formattedPrice}</p>
                            </div>
                        </div>
                        <span
                            className={`text-sm font-medium ${coin.change >= 0 ? 'text-profit' : 'text-loss'
                                }`}
                        >
                            {coin.change >= 0 ? '+' : ''}
                            {coin.change.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

export function TrendingCards() {
    const { topGainers, topVolume, newListings } = useMarket();
    const { formatPrice } = useCurrency();

    const cards = [
        {
            title: '🔥 Sıcak',
            icon: <Flame className="w-4 h-4 text-orange-400" />,
            coins: topGainers.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-orange-500/20',
        },
        {
            title: '🆕 Yeni',
            icon: <Sparkles className="w-4 h-4 text-blue-400" />,
            coins: newListings.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-blue-500/20',
        },
        {
            title: '📈 Kazandıran',
            icon: <TrendingUp className="w-4 h-4 text-profit" />,
            coins: topGainers.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-profit/20',
        },
        {
            title: '📊 Hacim',
            icon: <BarChart3 className="w-4 h-4 text-neon-cyan" />,
            coins: topVolume.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-neon-cyan/20',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {cards.map((card) => (
                <TrendingCard key={card.title} {...card} />
            ))}
        </div>
    );
}
