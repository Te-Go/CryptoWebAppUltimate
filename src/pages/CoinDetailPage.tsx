import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { SentimentVote } from '../components/market/SentimentVote';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { CoinSummary } from '../components/seo/CoinSummary';
import { PeopleAlsoAsk, generateCoinFAQs } from '../components/seo/PeopleAlsoAsk';
import { HeaderAd, InContentAd } from '../components/ads/AdSlot';
import { CryptoConverter } from '../components/tools/CryptoConverter';
import { useMarket } from '../context/MarketContext';
import { useCurrency } from '../context/CurrencyContext';

export function CoinDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { cryptos, favorites, toggleFavorite } = useMarket();
    const { formatPrice, formatLargeNumber } = useCurrency();

    const coin = cryptos.find((c) => c.id === id);

    if (!coin) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">Kripto Bulunamadı</h1>
                    <Link to="/" className="text-neon-cyan hover:underline">
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        );
    }

    const isFavorite = favorites.includes(coin.id);
    const isPositive = coin.change24h >= 0;
    const faqs = generateCoinFAQs(coin.name, coin.symbol);

    // Generate chart data from sparkline
    const chartData = coin.sparkline.map((price, index) => ({
        time: `${index}s`,
        price,
    }));

    const stats = [
        { label: 'Piyasa Değeri', value: formatLargeNumber(coin.marketCap) },
        { label: '24s Hacim', value: formatLargeNumber(coin.volume24h) },
        { label: 'Dolaşımdaki Arz', value: coin.circulatingSupply.toLocaleString('tr-TR') + ' ' + coin.symbol },
        { label: 'Sıralama', value: `#${coin.rank}` },
    ];

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            {/* SEO Meta Tags */}
            <SEOHead
                title={`${coin.name} (${coin.symbol}) Fiyatı ve Grafiği`}
                description={`${coin.name} (${coin.symbol}) güncel fiyatı, piyasa değeri ve 24 saatlik değişim grafiği. ${coin.name} yorumları ve analizi Kripto Paralar'da.`}
                keywords={[coin.name, `${coin.name} fiyatı`, `${coin.name} satın al`, 'kripto para']}
                canonicalUrl={`/coin/${coin.id}`}
                ogImage={coin.image}
            />

            {/* Schema Structured Data */}
            <SchemaMarkup
                type="coin"
                data={coin}
            />
            <SchemaMarkup
                type="faq"
                faqs={faqs}
            />
            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Piyasalar', url: '/markets' },
                    { name: coin.name, url: `/coin/${coin.id}` },
                ]}
            />

            <Header />

            <main className="container py-6 space-y-6">
                {/* Header Ad Slot */}
                <HeaderAd />

                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Geri</span>
                    </Link>
                </div>

                {/* Coin Header */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-16 h-16 rounded-full"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-text-primary font-display">
                                        {coin.name}
                                    </h1>
                                    <span className="text-text-muted bg-bg-tertiary px-2 py-0.5 rounded text-sm">
                                        {coin.symbol}
                                    </span>
                                    <span className="text-text-muted bg-bg-tertiary px-2 py-0.5 rounded text-sm">
                                        #{coin.rank}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-3xl font-bold text-text-primary">
                                        {formatPrice(coin.price)}
                                    </span>
                                    <span
                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold ${isPositive
                                            ? 'bg-profit/15 text-profit'
                                            : 'bg-loss/15 text-loss'
                                            }`}
                                    >
                                        {isPositive ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        {Math.abs(coin.change24h).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <NeonButton
                                variant="outline"
                                onClick={() => toggleFavorite(coin.id)}
                            >
                                <Star
                                    className={`w-4 h-4 ${isFavorite ? 'fill-accent-gold text-accent-gold' : ''
                                        }`}
                                />
                                {isFavorite ? 'Favorilerde' : 'Favorilere Ekle'}
                            </NeonButton>
                            <NeonButton variant="primary">
                                <ExternalLink className="w-4 h-4" />
                                Satın Al
                            </NeonButton>
                        </div>
                    </div>
                </GlassCard>

                {/* AI Text Summary - SEO Optimization */}
                <CoinSummary coin={coin} />

                {/* Community Sentiment */}
                <SentimentVote coinId={coin.id} />

                {/* Price Chart */}
                <GlassCard className="p-6" hover={false}>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        Fiyat Grafiği (24 Saat)
                    </h2>
                    <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor={isPositive ? '#00FF88' : '#FF3366'}
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor={isPositive ? '#00FF88' : '#FF3366'}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#8B9AAB', fontSize: 12 }}
                                />
                                <YAxis
                                    hide
                                    domain={['dataMin - 100', 'dataMax + 100']}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#12161C',
                                        border: '1px solid rgba(139, 154, 171, 0.15)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                    formatter={(value) => [formatPrice(value as number), 'Fiyat']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={isPositive ? '#00FF88' : '#FF3366'}
                                    strokeWidth={2}
                                    fill="url(#priceGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* In Content Ad Slot */}
                <InContentAd />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <GlassCard key={stat.label} className="p-4" hover={false}>
                            <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                            <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
                        </GlassCard>
                    ))}
                </div>

                {/* Price Changes */}
                <GlassCard className="p-6" hover={false}>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        Fiyat Değişimi
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: '1 Saat', value: coin.change1h },
                            { label: '24 Saat', value: coin.change24h },
                            { label: '7 Gün', value: coin.change7d },
                        ].map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-text-muted text-sm mb-2">{item.label}</p>
                                <p
                                    className={`text-xl font-bold ${item.value >= 0 ? 'text-profit' : 'text-loss'
                                        }`}
                                >
                                    {item.value >= 0 ? '+' : ''}
                                    {item.value.toFixed(2)}%
                                </p>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* About Section */}
                <GlassCard className="p-6" hover={false}>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        {coin.name} Hakkında
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                        {coin.name} ({coin.symbol}), kripto para piyasasındaki en önemli dijital varlıklardan biridir.
                        Merkeziyetsiz yapısı ve blockchain teknolojisi sayesinde dünya genelinde milyonlarca kullanıcı
                        tarafından tercih edilmektedir. Piyasa değeri ve işlem hacmi açısından sektörün öncü
                        projelerinden biri olarak kabul edilmektedir.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {coin.category.map((cat) => (
                            <span
                                key={cat}
                                className="px-3 py-1 bg-bg-tertiary text-text-secondary text-sm rounded-full capitalize"
                            >
                                {cat.replace('-', ' ')}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                {/* Crypto Converter */}
                <CryptoConverter />

                {/* People Also Asked - FAQ */}
                <PeopleAlsoAsk
                    faqs={faqs}
                    title={`${coin.symbol} Sıkça Sorulan Sorular`}
                />
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
