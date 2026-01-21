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
    const { topGainers, topLosers, topVolume, trendingCoins } = useMarket();
    const { formatPrice } = useCurrency();

    const cards = [
        {
            title: 'Trend Olanlar',
            icon: <Flame className="w-4 h-4 text-orange-400" />,
            coins: trendingCoins.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-orange-500/20',
        },
        {
            title: 'En Çok Düşenler',
            icon: <div className="rotate-180"><TrendingUp className="w-4 h-4 text-loss" /></div>,
            coins: topLosers.map((c) => ({
                name: c.name,
                symbol: c.symbol,
                image: c.image,
                formattedPrice: formatPrice(c.price),
                change: c.change24h,
            })),
            accentColor: 'bg-loss/20',
        },
        {
            title: 'Kazandıran',
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
            title: 'Hacim',
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
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {cards.map((card) => (
                    <TrendingCard key={card.title} {...card} />
                ))}
            </div>

            {/* Verbatim Explanation */}
            <div className="bg-bg-tertiary/30 rounded-lg p-4 text-xs text-text-secondary border border-border/10">
                <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-neon-yellow" />
                    Bu Veriler Nasıl Hesaplanır?
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <strong className="text-orange-400 mb-1 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Trend Olanlar
                        </strong>
                        Son 24 saatte kullanıcılar tarafından en çok aranan ve ziyaret edilen kripto paraları listeler.
                    </div>
                    <div>
                        <strong className="text-loss mb-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 rotate-180" /> En Çok Düşenler
                        </strong>
                        Son 24 saat içinde piyasa değeri yüzdesel olarak en fazla değer kaybeden coinleri gösterir.
                    </div>
                    <div>
                        <strong className="text-profit mb-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Kazandıran
                        </strong>
                        Son 24 saat içinde yüzdesel olarak yatırımcısına en çok kazandıran varlıkları sıralar.
                    </div>
                    <div>
                        <strong className="text-neon-cyan mb-1 flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" /> Hacim
                        </strong>
                        Son 24 saatte borsalarda en çok alım-satım yapılan (işlem gören) en likit coinleri gösterir.
                    </div>
                </div>
            </div>
        </div>
    );
}
