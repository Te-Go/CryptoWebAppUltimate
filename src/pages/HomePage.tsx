import { Header } from '../components/layout/Header';
import { LiveTicker } from '../components/layout/LiveTicker';
import { BottomNav } from '../components/layout/BottomNav';
import { Footer } from '../components/layout/Footer';
import { MarketOverview } from '../components/market/MarketOverview';
import { GlassCard } from '../components/ui/GlassCard';
import { FearGreedGauge } from '../components/market/FearGreedGauge';
import { AltcoinSeasonGauge } from '../components/market/AltcoinSeasonGauge';
import { TrendingCards } from '../components/market/TrendingCards';
import { CategoryTabs } from '../components/market/CategoryTabs';
import { ZoneFilters } from '../components/market/ZoneFilters';
import { CryptoTable } from '../components/market/CryptoTable';
import { TimeframeSelector } from '../components/market/TimeframeSelector';
import { CurrencySelector } from '../components/market/CurrencySelector';
import { CryptoConverter } from '../components/tools/CryptoConverter';
import { HeaderAd, FooterAd } from '../components/ads/AdSlot';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

export function HomePage() {
    return (
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

            {/* Main Content */}
            <main className="container py-6 space-y-6">
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
                        <div className="col-span-1">
                            <FearGreedGauge />
                        </div>
                        <div className="col-span-1">
                            <AltcoinSeasonGauge />
                        </div>
                        <div className="col-span-2 lg:col-span-6">
                            <CryptoConverter />
                        </div>
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

                {/* Crypto Table */}
                <section>
                    <CryptoTable />
                </section>

                {/* FAQ Section */}
                <section className="container py-8">
                    <GlassCard className="p-6">
                        <h2 className="text-2xl font-bold text-text-primary mb-6 font-display">Sıkça Sorulan Sorular</h2>
                        <div className="space-y-4">
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-bg-tertiary hover:bg-white/5 transition-colors">
                                    <span className="font-medium text-text-primary">Kripto para nasıl alınır?</span>
                                    <span className="transform group-open:rotate-180 transition-transform text-neon-cyan">▼</span>
                                </summary>
                                <div className="p-4 text-text-secondary">
                                    Türkiye'deki güvenilir kripto para borsaları (Binance TR, BtcTurk, Paribu vb.) üzerinden hesap açarak, banka havalesi ile TL yatırıp kripto para alım satımı yapabilirsiniz.
                                </div>
                            </details>
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-bg-tertiary hover:bg-white/5 transition-colors">
                                    <span className="font-medium text-text-primary">Bitcoin nedir?</span>
                                    <span className="transform group-open:rotate-180 transition-transform text-neon-cyan">▼</span>
                                </summary>
                                <div className="p-4 text-text-secondary">
                                    Bitcoin, merkeziyetsiz bir dijital para birimidir. Blockchain teknolojisi üzerine kurulu olan Bitcoin, kişiden kişiye (P2P) transfer imkanı sunar ve herhangi bir merkeze bağlı değildir.
                                </div>
                            </details>
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-bg-tertiary hover:bg-white/5 transition-colors">
                                    <span className="font-medium text-text-primary">Kripto paralar yasal mı?</span>
                                    <span className="transform group-open:rotate-180 transition-transform text-neon-cyan">▼</span>
                                </summary>
                                <div className="p-4 text-text-secondary">
                                    Türkiye'de kripto para alım satımı yapmak yasaldır. Ancak, vergilendirme ve düzenlemelerle ilgili çalışmalar (SPK) devam etmektedir. Güncel mevzuatı takip etmeniz önerilir.
                                </div>
                            </details>
                        </div>
                    </GlassCard>
                </section>

                {/* Footer Ad */}
                <div className="container py-8">
                    <FooterAd slotId="home-footer-ad" />
                </div>
            </main>

            <Footer />

            {/* Bottom Navigation (Mobile) */}
            <BottomNav />
        </div>
    );
}
