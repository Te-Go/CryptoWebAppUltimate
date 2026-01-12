import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, ArrowLeft } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { HeaderAd } from '../components/ads/AdSlot';

import { mockNews } from '../data/mockNews';

// Transform mockNews to match NewsPage structure if needed, or just use it directly
// For this page we want the "internal" articles (ids 5, 6, 7) that have slugs
const allNewsArticles = mockNews.filter(n => n.slug);

export function NewsPage() {
    const { coinId } = useParams<{ coinId?: string }>();

    // Dynamic Filter Logic (Virtual Page Engine)
    const newsArticles = coinId
        ? allNewsArticles.filter(n =>
            n.title.toLowerCase().includes(coinId.toLowerCase()) ||
            n.excerpt?.toLowerCase().includes(coinId.toLowerCase()) ||
            n.category?.toLowerCase().includes(coinId.toLowerCase())
        )
        : allNewsArticles;

    // Fallback if no specific news found for the coin, show all but keep the H1 SEO optimized
    const displayArticles = newsArticles.length > 0 ? newsArticles : allNewsArticles;

    // Helper for formatting coin names (e.g., "shiba-inu" -> "Shiba Inu")
    const formatCoinName = (slug: string) => {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Dynamic SEO Titles
    const displayCoinName = coinId ? formatCoinName(coinId) : '';

    const pageTitle = coinId
        ? `${displayCoinName} Haberleri ve Son Dakika Gelişmeler`
        : 'Kripto Para Haberleri ve Yorumları';

    const pageDescription = coinId
        ? `En güncel ${displayCoinName} haberleri, fiyat analizleri, uzman yorumları ve piyasa beklentileri. ${displayCoinName} hakkında her şey.`
        : 'En güncel Bitcoin, Ethereum ve altcoin haberleri, piyasa analizleri ve uzman yorumları Kripto Paralar\'da.';

    const h1Title = coinId
        ? `${displayCoinName} Haberleri`
        : 'Kripto Haberleri';

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                keywords={['kripto haber', `${displayCoinName} haberleri`, `${displayCoinName} analiz`, 'altcoin analiz', 'blockchain haberleri']}
                canonicalUrl={coinId ? `/haberler/kripto/${coinId}` : "/haberler"}
            />
            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Haberler', url: '/haberler' },
                    ...(coinId ? [{ name: `${displayCoinName} Haberleri`, url: `/haberler/kripto/${coinId}` }] : [])
                ]}
            />

            <Header />

            <main className="container py-6">
                <HeaderAd className="mb-8" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            {/* Back Button */}
                            {coinId && (
                                <Link to="/haberler" className="inline-flex items-center gap-2 text-text-muted hover:text-neon-cyan transition-colors mb-4 group">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Tüm Haberlere Dön
                                </Link>
                            )}
                            <h1 className="text-3xl font-bold text-text-primary mb-2 font-display">
                                {h1Title}
                            </h1>
                            <p className="text-text-secondary">
                                {coinId ? `${displayCoinName} ile ilgili en son gelişmeler ve analizler.` : 'Piyasadan son dakika gelişmeler, analizler ve özel dosyalar.'}
                            </p>
                        </div>

                        {/* Featured Article */}
                        <Link to={`/haberler/${displayArticles[0].slug}`} className="block group">
                            <GlassCard className="overflow-hidden" hover={true}>
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <img
                                        src={displayArticles[0].image}
                                        alt={displayArticles[0].title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-neon-cyan/90 text-bg-primary px-3 py-1 rounded text-sm font-bold shadow-lg">
                                            {displayArticles[0].category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {displayArticles[0].time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {displayArticles[0].source}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-neon-cyan transition-colors">
                                        {displayArticles[0].title}
                                    </h2>
                                    <p className="text-text-secondary line-clamp-2">
                                        {displayArticles[0].excerpt}
                                    </p>
                                </div>
                            </GlassCard>
                        </Link>

                        {/* Recent News Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {displayArticles.slice(1).map((article) => (
                                <Link key={article.id} to={`/haberler/${article.slug}`} className="block group">
                                    <GlassCard className="h-full flex flex-col overflow-hidden" hover={true}>
                                        <div className="aspect-video w-full overflow-hidden relative">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-bg-tertiary/90 text-text-primary px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm border border-white/10">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 text-[10px] text-text-muted mb-2">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {article.time}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center text-neon-cyan text-sm font-medium mt-auto group/btn">
                                                Devamını Oku <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination / Load More */}
                        <div className="flex justify-center mt-8">
                            <button className="flex items-center gap-2 px-6 py-3 bg-bg-tertiary hover:bg-white/5 border border-border/10 rounded-xl text-text-primary font-semibold transition-all hover:scale-105 active:scale-95">
                                <ArrowRight className="w-5 h-5 rotate-90" />
                                Daha Fazla Oku
                            </button>
                        </div>

                        {/* Preview Component (Other News) */}
                        <div className="mt-12 pt-8 border-t border-border/10">
                            <h3 className="text-xl font-bold text-text-primary mb-6 font-display">
                                Diğer Popüler Haberler
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {allNewsArticles.filter(n => !displayArticles.find(d => d.id === n.id)).slice(0, 3).map((article) => (
                                    <Link key={article.id} to={`/haberler/${article.slug}`} className="block group">
                                        <GlassCard className="h-full p-4" hover={true}>
                                            <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 relative">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-bg-tertiary/90 text-text-primary px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-bold text-text-primary line-clamp-2 group-hover:text-neon-cyan transition-colors">
                                                {article.title}
                                            </h4>
                                            <span className="text-xs text-text-muted mt-2 block">
                                                {article.time}
                                            </span>
                                        </GlassCard>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-8">
                        {/* Fixed Categories - No Ads underneath to prevent overlap */}
                        <GlassCard className="p-6 hidden lg:block">
                            <h3 className="text-lg font-semibold text-text-primary mb-4 font-display border-b border-border/10 pb-2">
                                Popüler Kategoriler
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Bitcoin', 'Ethereum', 'Altcoinler', 'Analiz', 'Düzenleme', 'Teknoloji', 'Metaverse', 'NFT'].map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/haberler?tag=${tag.toLowerCase()}`}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-bg-tertiary hover:bg-white/5 text-text-secondary hover:text-text-primary rounded-lg text-sm transition-colors border border-border/10"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </GlassCard>
                    </aside>
                </div>
            </main>

            <Footer showAd={false} />
            <BottomNav />
        </div>
    );
}
