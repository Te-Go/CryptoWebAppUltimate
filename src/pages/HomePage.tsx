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

export function HomePage() {
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
                {/* SEO Meta Tags */}
                <SEOHead
                    title="Canlı Kripto Para Fiyatları ve Piyasa Analizi"
                    description="Türkiye'nin en kapsamlı kripto para platformu. Bitcoin, Ethereum ve altcoin fiyatlarını anlık takip edin, piyasa analizlerini inceleyin."
                    keywords={['kripto para', 'bitcoin fiyatı', 'altcoin', 'kripto analiz', 'canlı borsa']}
                    canonicalUrl="/"
                />

                {/* Schema Structured Data */}
                <SchemaMarkup type="organization" />

                {/* Live Ticker */}
                <LiveTicker />

                {/* Header */}
                <Header />

                {/* Header Ad Slot */}
                <HeaderAd />

                {/* Market Overview Stats */}
                <section>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        Piyasa Özeti
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
                        <div className="col-span-2 lg:col-span-4">
                            <MarketOverview />
                        </div>
                        {/* 
                        <div className="col-span-1">
                            <FearGreedGauge />
                        </div>
                        <div className="col-span-1">
                            <AltcoinSeasonGauge />
                        </div>
                        <div className="col-span-2 lg:col-span-6">
                            <CryptoConverter />
                        </div> */}
                    </div>
                </section>

                {/* Trending Cards */}
                <section>
                    <h2 className="text-lg font-semibold text-text-primary mb-4 font-display">
                        Öne Çıkanlar <span className="text-text-muted font-normal text-sm">(24 Saat)</span>
                    </h2>
                    <TrendingCards />
                </section>

                {/* Filters */}
                <section className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 className="text-lg font-semibold text-text-primary font-display">
                            Piyasa Değerine Göre Kripto Paralar
                        </h2>
                        <div className="flex items-center gap-2">
                            <CurrencySelector />
                            <TimeframeSelector />
                        </div>
                    </div>
                    <CategoryTabs />
                    <ZoneFilters />
                </section>

                {/* Crypto Table Component */}
                <section>
                    <CryptoTable />
                </section>

                {/* FAQ Section */}
                {/* <FAQ /> */}

                {/* Latest News */}
                <LatestNews />

                <Footer />

                {/* Bottom Navigation (Mobile) */}
                <BottomNav />
            </div>
        </ErrorBoundary>
    );
}
