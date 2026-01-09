import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { InContentAd } from '../components/ads/AdSlot';

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();

    // Mock data - In real app, fetch from CMS or Markdown files
    const post = {
        title: 'Bitcoin Nedir? Yeni Başlayanlar İçin Kapsamlı Rehber',
        date: '10 Ocak 2026',
        readTime: '5 dk okuma',
        content: `
            <p className="mb-4">Bitcoin (BTC), herhangi bir merkez bankasına, resmi kuruluşa veya yöneticiye bağlı olmayan ilk merkeziyetsiz dijital para birimidir. 2008 krizi sonrası Satoshi Nakamoto takma adlı kişi veya grup tarafından yayınlanan "Bitcoin: Eşler Arası Elektronik Nakit Sistemi" adlı makale ile ortaya çıkmıştır.</p>
            
            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Bitcoin Nasıl Çalışır?</h2>
            <p className="mb-4">Bitcoin, Blockchain (Blokzincir) adı verilen dağıtık bir defter teknolojisi üzerinde çalışır. Bu teknoloji sayesinde yapılan tüm işlemler şeffaf bir şekilde kaydedilir ve değiştirilemez. Ağdaki madenciler, yüksek işlem gücü gerektiren matematiksel problemleri çözerek transferleri onaylar ve ağın güvenliğini sağlar.</p>
            
            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Neden Değerlidir?</h2>
            <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Sınırlı Arz:</strong> Toplam Bitcoin arzı 21 milyon adet ile sınırlandırılmıştır.</li>
                <li><strong>Merkeziyetsizlik:</strong> Hiçbir devlet veya kurum tarafından kontrol edilemez.</li>
                <li><strong>Bölünebilirlik:</strong> 1 Bitcoin, 100 milyon Satoshi'ye bölünebilir.</li>
                <li><strong>Taşınabilirlik:</strong> Dünyanın her yerine dakikalar içinde transfer edilebilir.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">Bitcoin Nasıl Saklanır?</h2>
            <p className="mb-4">Bitcoin'lerinizi borsalarda tutabileceğiniz gibi, kendi kontrolünüzdeki cüzdanlarda da saklayabilirsiniz:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li><strong>Sıcak Cüzdanlar:</strong> İnternete bağlı yazılım cüzdanları (Örn: MetaMask, TrustWallet). Hızlı erişim sağlar ancak güvenlik riski daha yüksektir.</li>
                <li><strong>Soğuk Cüzdanlar:</strong> İnternet bağlantısı olmayan donanım cüzdanları (Örn: Ledger, Trezor). En güvenli saklama yöntemidir.</li>
            </ol>
        `
    };

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title={`${post.title} | Kripto Eğitim`}
                description="Bitcoin'in tarihçesi, çalışma prensibi ve temel özellikleri hakkında detaylı rehber. Yeni başlayanlar için kripto para eğitimi."
                keywords={['bitcoin', 'btc nedir', 'kripto eğitim', 'blockchain']}
                canonicalUrl={`/egitim/${slug}`}
                ogType="article"
            />

            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Eğitim', url: '/egitim' },
                    { name: post.title, url: `/egitim/${slug}` }
                ]}
            />

            <Header />

            <main className="container py-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/egitim" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Eğitim Ana Sayfa
                    </Link>

                    <GlassCard className="p-8 md:p-12">
                        <header className="mb-8 border-b border-border/30 pb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-text-muted">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {post.date}
                                </span>
                                <span>{post.readTime}</span>
                                <button className="ml-auto hover:text-neon-cyan transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </header>

                        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-neon-cyan prose-strong:text-text-primary">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        <div className="my-8">
                            <InContentAd />
                        </div>

                    </GlassCard>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
