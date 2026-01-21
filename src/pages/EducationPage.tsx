import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { mockEducationArticles } from '../data/mockEducation';

export function EducationPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="Kripto Para Eğitim Merkezi | Blokzincir ve Yatırım Rehberleri"
                description="Kripto paralar, blockchain teknolojisi ve güvenli yatırım hakkında kapsamlı eğitimler. Sıfırdan uzmanlığa giden yolda ilk adımı atın."
                keywords={['kripto eğitim', 'blockchain nedir', 'bitcoin rehberi', 'tekni̇k analiz eğitim', 'kripto sözlük', 'nasıl coin alınır']}
                canonicalUrl="/egitim"
            />

            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Eğitim', url: '/egitim' }
                ]}
            />

            <Header />

            <main className="container py-8 space-y-12">
                {/* Hero Section */}
                <section className="text-center max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 font-display leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
                            Kripto Akademi
                        </span>
                    </h1>
                    <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
                        Kripto para dünyasını anlamak karmaşık olmak zorunda değil.
                        <br className="hidden md:block" />
                        Teknolojiyi, piyasayı ve güvenliği uzman kaleminden öğrenin.
                    </p>
                </section>

                {/* Article Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockEducationArticles.map((article) => (
                        <Link key={article.id} to={`/egitim/${article.slug}`} className="group block h-full">
                            <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_30px_-5px_var(--neon-cyan)]/20" hover={true}>
                                {/* Image Container */}
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent opacity-60" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full bg-bg-tertiary/90 backdrop-blur-md border border-white/10 text-xs font-semibold text-neon-cyan shadow-lg">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow relative">
                                    {/* Metadata */}
                                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4 uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {article.readTime}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-neon-cyan transition-colors font-display">
                                        {article.title}
                                    </h2>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    {/* CTA */}
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-sm font-semibold text-neon-cyan group-hover:translate-x-2 transition-transform duration-300">
                                        Okumaya Devam Et <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
