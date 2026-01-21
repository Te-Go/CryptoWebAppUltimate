import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { mockEducationArticles } from '../data/mockEducation';
import { SidebarAd, InContentAd } from '../components/ads/AdSlot';

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const article = mockEducationArticles.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">İçerik Bulunamadı</h1>
                    <Link to="/egitim" className="text-neon-cyan hover:underline">
                        Eğitim Merkezine Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title={article.title}
                description={article.excerpt}
                keywords={[article.category, 'kripto eğitim', 'blockchain rehberi', 'bitcoin dersleri']}
                canonicalUrl={`/egitim/${slug}`}
                ogImage={article.image}
                ogType="article"
            />
            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Eğitim', url: '/egitim' },
                    { name: article.title, url: `/egitim/${slug}` }
                ]}
            />

            <Header />

            <main className="container py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Article Content */}
                    <article className="flex-1">
                        {/* Breadcrumb & Navigation */}
                        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
                            <Link to="/egitim" className="hover:text-neon-cyan flex items-center gap-1 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Eğitim
                            </Link>
                            <ChevronRight className="w-3 h-3 text-text-muted/50" />
                            <span className="text-neon-cyan font-medium truncate max-w-[200px] sm:max-w-none">
                                {article.category}
                            </span>
                        </div>

                        {/* Title & Metadata */}
                        <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 font-display leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-8 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-bold text-xs ring-2 ring-bg-primary">
                                    {article.author.charAt(0)}
                                </div>
                                <span className="font-medium text-text-primary">{article.author}</span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-border/50"></span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-neon-cyan" />
                                {article.date}
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-border/50"></span>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-neon-cyan" />
                                {article.readTime} Okuma
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 hover:bg-white/5 bg-bg-tertiary rounded-full transition-all hover:scale-110 active:scale-95 border border-white/5" title="Paylaş">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 hover:bg-white/5 bg-bg-tertiary rounded-full transition-all hover:scale-110 active:scale-95 border border-white/5" title="Yazdır">
                                    <Printer className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-2xl shadow-neon-cyan/5 ring-1 ring-white/10 group relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Content Body */}
                        <GlassCard className="p-8 md:p-10 mb-10" hover={false}>
                            <div className="prose prose-invert prose-lg max-w-none 
                                prose-headings:font-display prose-headings:text-text-primary prose-headings:scroll-mt-24
                                prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline
                                prose-blockquote:border-l-neon-cyan prose-blockquote:bg-bg-tertiary/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                                prose-p:text-text-secondary prose-p:leading-relaxed
                                prose-strong:text-text-primary prose-strong:font-bold
                                prose-code:text-neon-purple prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                prose-img:rounded-xl prose-img:border prose-img:border-white/5
                                font-sans">
                                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                            </div>

                            {/* Mobile/Responsive Ad in content */}
                            <div className="mt-8 border-t border-white/5 pt-8">
                                <InContentAd slotId="education-in-content" />
                            </div>
                        </GlassCard>

                        {/* Tags */}
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Etiketler</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Eğitim', article.category, 'Rehber', 'Kripto 101'].map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/egitim`}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-bg-tertiary hover:bg-bg-tertiary/80 text-text-secondary hover:text-neon-cyan rounded-full text-sm transition-all border border-white/5 hover:border-neon-cyan/30"
                                    >
                                        <Tag className="w-3.5 h-3.5" />
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-8">
                        {/* More Guides */}
                        <GlassCard className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-text-primary font-display">
                                    Diğer Rehberler
                                </h3>
                                <Link to="/egitim" className="text-xs text-neon-cyan hover:underline">Tümünü Gör</Link>
                            </div>

                            <div className="space-y-5">
                                {mockEducationArticles
                                    .filter(a => a.id !== article.id)
                                    .map((item) => (
                                        <Link key={item.id} to={`/egitim/${item.slug}`} className="block group">
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative border border-white/5">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider mb-1 block">
                                                        {item.category}
                                                    </span>
                                                    <h4 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-neon-cyan transition-colors mb-1">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-xs text-text-muted flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {item.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </GlassCard>

                        {/* Sticky Ad Slot (Optimized for AdSense - Desktop Only) */}
                        <div className="sticky top-24 hidden lg:block">
                            <SidebarAd slotId="education-sidebar-sticky" className="w-full" />
                            <p className="text-[10px] text-text-muted text-center mt-2 opacity-50">Reklam</p>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
