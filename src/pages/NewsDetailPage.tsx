import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Printer, Tag } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { HeaderAd, InContentAd, SidebarAd } from '../components/ads/AdSlot';

// Mock Data (In a real app, this would be fetched from API)
const mockArticles = {
    'bitcoin-boga-sezonu-hazirliklari-100-bin-dolar-hedefi': {
        title: 'Bitcoin (BTC) Boğa Sezonuna Hazırlanıyor: 100.000 Dolar Hedefi Gerçekçi mi?',
        excerpt: 'Kripto para piyasasının lideri Bitcoin, kurumsal alımlar ve yaklaşan halving döngüsüyle yeni bir boğa koşusuna hazırlanıyor. Analistler 100 bin dolar hedefini işaret ediyor.',
        author: 'Ahmet Yılmaz',
        date: '10 Ocak 2026',
        readTime: '5 dk',
        category: 'Analiz',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop',
        content: `
            <p className="lead text-lg text-text-secondary mb-6">Bitcoin (BTC), son dönemde gösterdiği fiyat performansı ve kurumsal yatırımcıların artan ilgisiyle birlikte piyasaların odak noktası haline geldi. Özellikle büyük fon yöneticilerinin Bitcoin'e olan ilgisi, 100.000 dolar hedefinin artık hayal olmadığını gösteriyor.</p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Kurumsal İlgi Artıyor</h2>
            <p className="text-text-secondary mb-6">Wall Street devlerinin kripto para piyasasına girmesiyle birlikte, Bitcoin artık sadece bireysel yatırımcıların değil, kurumsal portföylerin de vazgeçilmez bir parçası oldu. ETF onayları sonrası artan hacim, bu tezi doğruluyor.</p>
            
            <p className="text-text-secondary mb-6">Analistlere göre, arz şoku ve talep artışının birleşimi, fiyatı yukarı yönlü baskılamaya devam edecek. Özellikle madencilerin satış baskısının azalması, boğa piyasasının temel dinamiklerinden biri olarak görülüyor.</p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Teknik Göstergeler Ne Diyor?</h2>
            <p className="text-text-secondary mb-6">Haftalık grafiklerde oluşan yükselen kanal formasyonu ve RSI indikatörünün pozitif uyumsuzluğu, yükseliş trendinin devam edebileceğine işaret ediyor. Ancak 48.000 dolar seviyesindeki direnç, kısa vadede kritik bir eşik olarak takip edilmeli.</p>

            <blockquote className="border-l-4 border-neon-cyan pl-4 py-2 my-8 bg-bg-tertiary/30 italic text-text-primary">
                "Bitcoin'in dijital altın olarak kabul görmesi, uzun vadede değer saklama aracı olarak konumunu güçlendiriyor. 2026 yılı, kripto paralar için dönüm noktası olabilir." - Piyasa Analisti
            </blockquote>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">100.000 Dolar Hedefi</h2>
            <p className="text-text-secondary mb-6">Birçok finans kuruluşunun raporunda yer alan 100.000 dolar hedefi, enflasyonist ortamda yatırımcıların güvenli liman arayışıyla destekleniyor. Eğer mevcut trend korunursa, bu hedefe yıl sonuna kadar ulaşılması muhtemel görünüyor.</p>
        `
    },
    'turkiye-kripto-para-duzenlemesi-yasa-tasarisi-detaylari': {
        title: "Türkiye'de Kripto Para Düzenlemesi: Yeni Yasa Tasarısı Neler Getiriyor?",
        excerpt: 'TBMM gündemindeki yeni kripto varlık yasa tasarısı, borsalara lisans zorunluluğu ve vergilendirme konularını içeriyor. İşte tasarıdan öne çıkan başlıklar.',
        author: 'Zeynep Kaya',
        date: '9 Ocak 2026',
        readTime: '4 dk',
        category: 'Düzenleme',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop',
        content: `
            <p className="lead text-lg text-text-secondary mb-6">Türkiye Büyük Millet Meclisi'ne sunulan yeni kripto varlık yasa tasarısı, sektörde şeffaflığı artırmayı ve yatırımcıları korumayı hedefliyor. Tasarı, kripto para borsalarının lisanslamasından vergilendirmeye kadar geniş bir yelpazeyi kapsıyor.</p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Lisans Zorunluluğu Geliyor</h2>
            <p className="text-text-secondary mb-6">Tasarıya göre, Türkiye'de faaliyet gösteren tüm kripto para borsaları SPK (Sermaye Piyasası Kurulu) tarafından denetlenecek ve lisans almak zorunda olacak. Lisanssız faaliyet gösteren platformlara erişim engeli getirilecek.</p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Vergilendirme Nasıl Olacak?</h2>
            <p className="text-text-secondary mb-6">Yatırımcıların en çok merak ettiği konu olan vergilendirme hususunda, belirli bir tutarın üzerindeki kazançlardan %10 ile %20 arasında stopaj kesintisi yapılması planlanıyor. Ancak küçük yatırımcıları etkilememesi için bir istisna tutarı belirlenecek.</p>
        `
    },
    'ethereum-etf-onayi-altcoin-rallisi-basliyor-mu': {
        title: 'Ethereum ETF Onayı Bekleniyor: Altcoin Rallisi Başlayacak mı?',
        excerpt: "ABD SEC'in Ethereum Spot ETF başvurularını onaylaması beklenirken, piyasada altcoin rallisi beklentisi artıyor. Ethereum ekosistemindeki son gelişmeler.",
        author: 'Mehmet Demir',
        date: '8 Ocak 2026',
        readTime: '3 dk',
        category: 'Altcoinler',
        image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072&auto=format&fit=crop',
        content: `
            <p className="lead text-lg text-text-secondary mb-6">Bitcoin Spot ETF'lerinin onaylanmasının ardından gözler Ethereum'a çevrildi. BlackRock ve Fidelity gibi devlerin Ethereum Spot ETF başvurularının onaylanması, piyasada yeni bir likidite dalgası yaratabilir.</p>

            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Altcoin Sezonu Kapıda mı?</h2>
            <p className="text-text-secondary mb-6">Tarihsel veriler, Ethereum'un Bitcoin'e karşı güçlendiği dönemlerde altcoin rallilerinin başladığını gösteriyor. ETH/BTC paritesindeki toparlanma, diğer altcoinler için de yükseliş sinyali olarak yorumlanıyor.</p>
        `
    }
};

export function NewsDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const article = slug ? mockArticles[slug as keyof typeof mockArticles] : null;

    if (!article) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">Haber Bulunamadı</h1>
                    <Link to="/haberler" className="text-neon-cyan hover:underline">
                        Haberlere Dön
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
                keywords={[article.category, 'kripto haber', 'bitcoin analizi']}
                canonicalUrl={`/haberler/${slug}`}
                ogImage={article.image}
                ogType="article"
            />
            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Haberler', url: '/haberler' },
                    { name: article.title, url: `/haberler/${slug}` }
                ]}
            />

            <Header />

            <main className="container py-6">
                <HeaderAd className="mb-8" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Article Content */}
                    <article className="flex-1">
                        {/* Breadcrumb & Navigation */}
                        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
                            <Link to="/haberler" className="hover:text-neon-cyan flex items-center gap-1 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Haberler
                            </Link>
                            <span>/</span>
                            <span className="text-text-secondary truncate max-w-[200px] sm:max-w-none">
                                {article.category}
                            </span>
                        </div>

                        {/* Title & Metadata */}
                        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-8 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-bold text-xs">
                                    {article.author.charAt(0)}
                                </div>
                                <span className="font-medium text-text-primary">{article.author}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-text-muted/30"></span>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                            </div>
                            <span className="w-1 h-1 rounded-full bg-text-muted/30"></span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {article.readTime}
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors" title="Paylaş">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors" title="Yazdır">
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-neon-cyan/5 ring-1 ring-white/10">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Body */}
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-neon-cyan prose-blockquote:border-neon-cyan font-sans text-text-secondary space-y-4">
                            {/* In a real app, use dangerouslySetInnerHTML safely or a markdown parser */}
                            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex flex-wrap gap-2">
                                {['Haber', article.category, 'Kripto Para', 'Analiz'].map(tag => (
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
                        </div>

                        <div className="mt-8">
                            <InContentAd slotId='in-content-ad-news-detail' />
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-8">
                        <SidebarAd />

                        {/* More News */}
                        <GlassCard className="p-6">
                            <h3 className="text-lg font-semibold text-text-primary mb-4 font-display">
                                İlgini Çekebilir
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(mockArticles)
                                    .filter(([key]) => key !== slug)
                                    .map(([key, item]) => (
                                        <Link key={key} to={`/haberler/${key}`} className="block group">
                                            <div className="flex gap-3">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-neon-cyan transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-xs text-text-muted mt-1 block">
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </GlassCard>
                    </aside>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
