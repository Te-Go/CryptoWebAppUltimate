import { Header } from '../components/layout/Header';
import { LiveTicker } from '../components/layout/LiveTicker';
import { BottomNav } from '../components/layout/BottomNav';
import { Footer } from '../components/layout/Footer';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MarketOverview } from '../components/market/MarketOverview';
import { HeaderAd } from '../components/ads/AdSlot';
import { TrendingCards } from '../components/market/TrendingCards';
import { CurrencySelector } from '../components/market/CurrencySelector';
import { TimeframeSelector } from '../components/market/TimeframeSelector';
import { CategoryTabs } from '../components/market/CategoryTabs';
import { ZoneFilters } from '../components/market/ZoneFilters';
import { CryptoTable } from '../components/market/CryptoTable';
import { LatestNews } from '../components/news/LatestNews';
import { HomepageFAQ } from '../components/seo/HomepageFAQ';
import { useMarket } from '../context/MarketContext';
import { DashboardTools } from '../components/market/DashboardTools';
import { TimeMachineCalculator } from '../components/tools/TimeMachineCalculator';
import { ImpermanentLossCalculator } from '../components/tools/ImpermanentLossCalculator';

export function HomePage() {
    const { cryptos } = useMarket();
    // Find BTC for the dynamic title (High traffic/interest signal)
    const btc = cryptos.find(c => c.symbol === 'BTC');

    // Format data for SEOHead
    // If we have data, we show it. If not (SSR/Loading), we fall back to static defaults in SEOHead.
    const dynamicSEO = btc ? {
        price: btc.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
        change: btc.change24h,
        symbol: 'BTC'
    } : undefined;

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
                {/* SEO Meta Tags - Now Dynamic! */}
                <SEOHead
                    title="Canlı Kripto Para Fiyatları ve Piyasa Analizi"
                    description="Türkiye'nin en kapsamlı kripto para platformu. Bitcoin, Ethereum ve altcoin fiyatlarını anlık takip edin, piyasa analizlerini inceleyin."
                    keywords={['kripto para', 'bitcoin fiyatı', 'altcoin', 'kripto analiz', 'canlı borsa']}
                    canonicalUrl="/"
                    dynamicData={dynamicSEO}
                />

                {/* Schema Structured Data */}
                {/* SEO Schema Injection */}
                <SchemaMarkup type="organization" />
                <SchemaMarkup type="webapp" />
                <SchemaMarkup type="liveblog" />

                <LiveTicker />

                <main className="container mx-auto px-4 py-8 space-y-8">

                    {/* Header */}
                    <Header />

                    {/* Header Ad Slot */}
                    <HeaderAd />

                    {/* Market Dashboard Grid */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4 font-display">Piyasa Özeti</h2>
                        <MarketOverview />
                    </section>

                    {/* Tools & Gauges (Middle Section) */}
                    <section className="mb-8">
                        <DashboardTools />
                    </section>

                    {/* NEW: Smart Calculators Section */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4 font-display">Akıllı Hesaplayıcılar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TimeMachineCalculator />
                            <ImpermanentLossCalculator />
                        </div>
                    </section>

                    {/* Trending Cards */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                            Öne Çıkanlar <span className="text-text-muted font-normal text-sm">(24 Saat)</span>
                        </h2>
                        <TrendingCards />
                    </section>

                    {/* Filters & Crypto Table (Full Width) */}
                    <section className="glass-card p-6 mt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <h2 className="text-lg font-semibold text-text-primary font-display">
                                Piyasa Değerine Göre Kripto Paralar
                            </h2>
                            <div className="flex items-center gap-2">
                                <CurrencySelector />
                                <TimeframeSelector />
                            </div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <CategoryTabs />
                            <ZoneFilters />
                        </div>

                        {/* Crypto Table Component */}
                        <CryptoTable />
                    </section>

                    {/* FAQ Section */}
                    <HomepageFAQ />

                    {/* Latest News */}
                    <LatestNews />

                    <Footer />

                    {/* Bottom Navigation (Mobile) */}
                    <BottomNav />
                </main>
            </div>
        </ErrorBoundary>
    );
}
