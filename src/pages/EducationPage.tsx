import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { BookOpen, Shield, Calculator, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

const guides = [
    {
        title: 'Bitcoin Nedir?',
        slug: 'bitcoin-nedir',
        description: 'Kripto paraların atası Bitcoin hakkında bilmeniz gereken her şey. Tarihçesi, çalışma mantığı ve nasıl üretildiği.',
        icon: BookOpen,
        color: 'text-orange-500',
    },
    {
        title: 'Kripto Vergi Rehberi',
        slug: 'kripto-vergi-turkiye',
        description: "Türkiye'de kripto para vergilendirmesi nasıl yapılıyor? Yasal düzenlemeler ve bilmeniz gerekenler.",
        icon: Calculator,
        color: 'text-green-500',
    },
    {
        title: 'Güvenli Cüzdan Kullanımı',
        slug: 'guvenli-cuzdan',
        description: 'Varlıklarınızı borsada mı yoksa soğuk cüzdanda mı saklamalısınız? Metamask ve Ledger kurulum rehberi.',
        icon: Shield,
        color: 'text-blue-500',
    },
    {
        title: 'Altcoin Sepeti Nasıl Yapılır?',
        slug: 'altcoin-sepeti-yapimi',
        description: 'Risk yönetimi yaparak dengeli bir kripto para portföyü oluşturmanın incelikleri.',
        icon: FileText,
        color: 'text-purple-500',
    },
];

export function EducationPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="Kripto Para Eğitim Rehberi - Bitcoin, Blockchain ve Analiz"
                description="Kripto para dünyasını öğrenin. Bitcoin nedir, nasıl alınır, teknik analiz ve güvenli cüzdan kullanımı hakkında ücretsiz eğitimler."
                keywords={['kripto eğitim', 'bitcoin nedir', 'blockchain eğitimi', 'teknik analiz dersleri']}
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

            <main className="container py-8 space-y-8">
                <section className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                        Kripto Para Akademi
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Sıfırdan zirveye kripto para dünyasını keşfedin. Ücretsiz rehberler, analizler ve ipuçları.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => {
                        const Icon = guide.icon;
                        return (
                            <Link key={guide.slug} to={`/egitim/${guide.slug}`} className="block h-full">
                                <GlassCard className="h-full flex flex-col p-6 hover:border-neon-cyan/50 transition-colors" hover={true}>
                                    <div className={`w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center mb-6 ${guide.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-text-primary mb-3">
                                        {guide.title}
                                    </h2>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                                        {guide.description}
                                    </p>
                                    <div className="flex items-center text-neon-cyan text-sm font-medium mt-auto">
                                        Okumaya Başla <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </GlassCard>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
