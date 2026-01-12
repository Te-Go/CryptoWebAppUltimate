import { useState, useMemo } from 'react'; // Add imports
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { SentimentVote } from '../components/market/SentimentVote';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { PeopleAlsoAsk } from '../components/seo/PeopleAlsoAsk';
import { HeaderAd, InContentAd } from '../components/ads/AdSlot';
import { CryptoConverter } from '../components/tools/CryptoConverter';
import { TimeMachineCalculator } from '../components/tools/TimeMachineCalculator';
import { CoinLayoutFactory } from '../components/coin/CoinLayoutFactory';
import { CoinComparison } from '../components/coin/CoinComparison';
import { getSmartSummary, getSmartFAQs } from '../components/seo/SmartContentEngine';
import { useMarket } from '../context/MarketContext';
import { useCurrency } from '../context/CurrencyContext';
// Import mock generator
import { generateHistory } from '../data/mockCryptos';
import { LatestNews } from '../components/news/LatestNews';

export function CoinDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { cryptos, favorites, toggleFavorite } = useMarket();
    const { formatPrice, formatLargeNumber } = useCurrency();
    const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d' | '30d' | '3m'>('24h');

    const coin = cryptos.find((c) => c.id === id);

    const isFavorite = coin ? favorites.includes(coin.id) : false;
    const isPositive = coin ? coin.change24h >= 0 : false;

    // Smart SEO Content
    const summary = coin ? getSmartSummary(coin) : '';
    const faqs = coin ? getSmartFAQs(coin) : [];
    const lastUpdated = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    // Generate chart data based on loaded coin AND selected timeframe
    const chartData = useMemo(() => {
        if (!coin) return [];

        // If 24h, use the static sparkline to keep it consistent with home, otherwise generate
        const rawData = timeframe === '24h'
            ? coin.sparkline
            : generateHistory(coin.price, timeframe);

        return rawData.map((price, index) => ({
            time: index.toString(), // Simplified time x-axis
            price,
        }));
    }, [coin, timeframe]);

    // Calculate Y-axis domain with 10% padding
    const yAxisDomain = useMemo(() => {
        if (!chartData.length) return ['auto', 'auto'];
        const prices = chartData.map(d => d.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min;

        // If no variation (flat line), add small buffer
        if (range === 0) return [min * 0.99, max * 1.01];

        const padding = range * 0.10; // 10% of the range
        return [min - padding, max + padding];
    }, [chartData]);

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
                title={`${coin.name} (${coin.symbol}) Fiyatı: ₺${coin.price.toFixed(2)} | Canlı Grafik ve Yorumlar`}
                description={summary.substring(0, 160) + '...'}
                keywords={[coin.name, `${coin.name} fiyatı`, `${coin.name} yorum`, `${coin.name} nedir`, coin.symbol, ...coin.category]}
                canonicalUrl={`/coin/${coin.id}`}
                ogImage={coin.image}
            />

            {/* Schema Structured Data */}
            <SchemaMarkup type="coin" data={coin} />
            <SchemaMarkup type="faq" faqs={faqs} />
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
                                {/* Freshness Signal */}
                                <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
                                    <Clock className="w-3 h-3" />
                                    <span>Son güncelleme: {lastUpdated}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <NeonButton
                                variant="outline"
                                onClick={() => toggleFavorite(coin.id)}
                            >
                                <Star
                                    className={`w-4 h-4 ${isFavorite ? 'fill-accent-gold text-accent-gold' : ''}`}
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

                {/* Price Chart - Moved to 2nd position */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <h2 className="text-lg font-semibold text-text-primary font-display">
                            Fiyat Grafiği
                        </h2>
                        <div className="flex bg-bg-secondary/50 rounded-lg p-1 overflow-x-auto">
                            {(['1h', '24h', '7d', '30d', '3m'] as const).map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all whitespace-nowrap ${timeframe === tf
                                        ? 'bg-neon-blue/20 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                                        }`}
                                >
                                    {tf === '1h' ? '1S' : tf === '24h' ? '24S' : tf === '7d' ? '7G' : tf === '30d' ? '30G' : '3A'}
                                </button>
                            ))}
                        </div>
                    </div>
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
                                    interval={Math.floor(chartData.length / 6)}
                                />
                                <YAxis
                                    domain={yAxisDomain}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#8B9AAB', fontSize: 10 }}
                                    tickFormatter={(value) => {
                                        // Short format for Y-axis (e.g. 3.4M) to avoid clutter
                                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                                        return value.toFixed(2);
                                    }}
                                    width={40}
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
                                    animationDuration={500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Dynamic Archetype Modules (Layer 1, DeFi, etc.) */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <CoinLayoutFactory coin={coin} />
                </div>

                {/* Smart Comparison Module (SEO Context Anchor) */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <CoinComparison coin={coin} />
                </div>

                {/* Tools Grid (Converter & Time Machine) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <CryptoConverter />
                    <TimeMachineCalculator />
                </div>

                {/* Smart Summary - Replacing Static Text */}
                <GlassCard className="p-6" hover={false}>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        {coin.name} Nedir? Güncel Analiz
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                        {summary}
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

                {/* Community Sentiment */}
                <SentimentVote coinId={coin.id} />

                {/* Price Chart Moved Up */}

                {/* Latest News & Comments */}
                <LatestNews className="py-2" />

                {/* Price Changes & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <GlassCard key={stat.label} className="p-4" hover={false}>
                                <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                                <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
                            </GlassCard>
                        ))}
                    </div>
                    <GlassCard className="p-6" hover={false}>
                        <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                            Zaman Dilimleri
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: '1S', value: coin.change1h },
                                { label: '24S', value: coin.change24h },
                                { label: '7G', value: coin.change7d },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <p className="text-text-muted text-sm mb-2">{item.label}</p>
                                    <p
                                        className={`text-lg font-bold ${item.value >= 0 ? 'text-profit' : 'text-loss'
                                            }`}
                                    >
                                        {item.value >= 0 ? '+' : ''}
                                        {item.value.toFixed(2)}%
                                    </p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>



                {/* Smart FAQ */}
                <PeopleAlsoAsk
                    faqs={faqs}
                    title={`${coin.name} Hakkında Sıkça Sorulan Sorular`}
                />
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
