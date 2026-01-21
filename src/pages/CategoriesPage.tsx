import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';
import { useMarket } from '../context/MarketContext';
import { categories } from '../data/mockCryptos';

const categoryDescriptions: Record<string, string> = {
    'all': 'Tüm kripto para birimleri.',
    'defi': 'Merkeziyetsiz finans (DeFi) protokolleri, bankasız bankacılık işlemleri sunar.',
    'layer-1': 'Kendi blok zincirine sahip olan temel ağlar (Örn: Bitcoin, Ethereum).',
    'layer-2': 'Layer 1 ağlarını hızlandırmak ve ucuzlatmak için çalışan katmanlar.',
    'meme': 'İnternet kültürü ve şakalar üzerine kurulu, topluluk odaklı coinler.',
    'ai': 'Yapay zeka (AI) teknolojilerini blok zinciri ile birleştiren projeler.',
    'gaming': 'Oyun içi ekonomiler ve Play-to-Earn modelleri sunan oyun tokenleri.',
    'nft': 'Benzersiz dijital varlıklar ve koleksiyonlar için kullanılan tokenler.',
    'stablecoin': 'Fiyatı dolar veya altın gibi varlıklara sabitlenmiş kripto paralar.'
};

export function CategoriesPage() {
    const { cryptos } = useMarket();

    // Filter categories to remove 'all' as it's not a specific sector for this view
    const displayCategories = categories.filter(c => c.id !== 'all');

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="Kripto Para Kategorileri ve Sektörleri"
                description="DeFi, Metaverse, Web3, Yapay Zeka ve daha fazlası. Kripto para ekosistemini kategorilere göre keşfedin."
                keywords={['kripto kategoriler', 'defi coinleri', 'metaverse coinleri', 'yapay zeka coinleri', 'altcoin sepeti']}
                canonicalUrl="/categories"
            />

            <Header />

            <main className="container py-8 space-y-8">
                {/* Hero */}
                <section className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                        Kripto Sektörlerini Keşfedin
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Yatırım yapmak istediğiniz alanı seçin ve o sektörün en iyi projelerini inceleyin.
                    </p>
                </section>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCategories.map((category) => {
                        // Find top 3 coins in this category by market cap (mockCryptos is usually sorted or we filter high rank)
                        const topCoins = cryptos
                            .filter(c => c.category.includes(category.id))
                            .sort((a, b) => a.rank - b.rank)
                            .slice(0, 3);

                        return (
                            <Link key={category.id} to={`/?category=${category.id}`} className="block group">
                                <GlassCard className="h-full p-6 flex flex-col relative overflow-hidden" hover={true}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-xl font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
                                            {category.name}
                                        </h2>
                                    </div>

                                    <p className="text-text-secondary text-sm mb-6 flex-grow">
                                        {categoryDescriptions[category.id] || 'Bu kategori hakkında detaylı bilgi.'}
                                    </p>

                                    {/* Top Coins Preview */}
                                    <div className="space-y-3">
                                        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                            Öne Çıkanlar
                                        </div>
                                        <div className="flex -space-x-2 overflow-hidden py-1">
                                            {topCoins.map((coin) => (
                                                <img
                                                    key={coin.id}
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-bg-secondary"
                                                    title={coin.name}
                                                />
                                            ))}
                                            {topCoins.length === 0 && (
                                                <span className="text-sm text-text-muted italic">Henüz veri yok</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center text-neon-cyan text-sm font-medium group/btn">
                                        İncele
                                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </GlassCard>
                            </Link>
                        );
                    })}
                </div>

                {/* Info Section */}
                <GlassCard className="p-6 md:p-8 flex items-start gap-4">
                    <div className="p-3 bg-neon-blue/10 rounded-full text-neon-blue hidden md:block">
                        <Info className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Neden Kategorilere Göre İncelemelisiniz?</h3>
                        <p className="text-text-secondary mb-4">
                            Kripto para piyasası artık sadece Bitcoin'den ibaret değil. Farklı kullanım alanlarına sahip binlerce proje var.
                            Portföyünüzü çeşitlendirmek (diversification) riskinizi azaltmanın en iyi yoludur. Tek bir sektöre odaklanmak yerine,
                            DeFi, Yapay Zeka ve Layer 1 gibi farklı alanlara yatırım yaparak fırsatları artırabilirsiniz.
                        </p>
                    </div>
                </GlassCard>

            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
