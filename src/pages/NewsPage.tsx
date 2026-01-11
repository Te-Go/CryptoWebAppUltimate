import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { HeaderAd, SidebarAd, LargeRectAd } from '../components/ads/AdSlot';

import { mockNews } from '../data/mockNews';

// Transform mockNews to match NewsPage structure if needed, or just use it directly
// For this page we want the "internal" articles (ids 5, 6, 7) that have slugs
const newsArticles = mockNews.filter(n => n.slug);

export function NewsPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="Kripto Para Haberleri ve Yorumları"
                description="En güncel Bitcoin, Ethereum ve altcoin haberleri, piyasa analizleri ve uzman yorumları Kripto Paralar'da."
                keywords={['kripto haber', 'bitcoin haberleri', 'altcoin analiz', 'blockchain haberleri']}
                canonicalUrl="/haberler"
            />
            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Haberler', url: '/haberler' }
                ]}
            />

            <Header />

            <main className="container py-6">
                <HeaderAd className="mb-8" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary mb-2 font-display">
                                Kripto Haberleri
                            </h1>
                            <p className="text-text-secondary">
                                Piyasadan son dakika gelişmeler, analizler ve özel dosyalar.
                            </p>
                        </div>

                        {/* Featured Article */}
                        <Link to={`/haberler/${newsArticles[0].slug}`} className="block group">
                            <GlassCard className="overflow-hidden" hover={true}>
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <img
                                        src={newsArticles[0].image}
                                        alt={newsArticles[0].title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-neon-cyan/90 text-bg-primary px-3 py-1 rounded text-sm font-bold shadow-lg">
                                            {newsArticles[0].category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {newsArticles[0].time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {newsArticles[0].source}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-neon-cyan transition-colors">
                                        {newsArticles[0].title}
                                    </h2>
                                    <p className="text-text-secondary line-clamp-2">
                                        {newsArticles[0].excerpt}
                                    </p>
                                </div>
                            </GlassCard>
                        </Link>

                        {/* Recent News Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {newsArticles.slice(1).map((article) => (
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
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-8">
                        <SidebarAd />

                        <GlassCard className="p-6 sticky lg:fixed lg:top-24 lg:w-80 z-10">
                            <h3 className="text-lg font-semibold text-text-primary mb-4 font-display border-b border-white/5 pb-2">
                                Popüler Kategoriler
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Bitcoin', 'Ethereum', 'Altcoinler', 'Analiz', 'Düzenleme', 'Teknoloji', 'Metaverse', 'NFT'].map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/haberler?tag=${tag.toLowerCase()}`}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-bg-tertiary hover:bg-white/5 text-text-secondary hover:text-text-primary rounded-lg text-sm transition-colors border border-white/5"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </GlassCard>

                        <LargeRectAd />
                    </aside>
                </div>
            </main>

            <Footer showAd={false} />
            <BottomNav />
        </div>
    );
}
