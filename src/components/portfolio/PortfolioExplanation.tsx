import { ShieldCheck, Zap, Globe } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function PortfolioExplanation() {
    return (
        <section className="space-y-6 mt-12 pb-12">
            <h2 className="text-2xl font-bold text-text-primary font-display text-center mb-8">
                Ücretsiz Kripto Para Portföy Takip Aracı
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <div className="bg-neon-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                        %100 Gizlilik Odaklı
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Portföy verileriniz sunucularımıza gönderilmez. Tüm bilgiler
                        <strong> tarayıcınızın yerel hafızasında (LocalStorage)</strong> şifrelenmeden saklanır.
                        Bu sayede varlıklarınızın kaydı sadece sizin cihazınızda kalır.
                    </p>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="bg-neon-purple/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-neon-purple" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                        Anlık Fiyat Takibi
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Yatırımlarınızın değerini <strong>TRY, USD ve EUR</strong> cinsinden anlık olarak takip edin.
                        Kripto para piyasalarındaki dalgalanmaları ve portföyünüzün toplam değerini, kar/zarar durumunu
                        saniye saniye görüntüleyin.
                    </p>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="bg-neon-cyan/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                        Geniş Kripto Desteği
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Bitcoin, Ethereum, Solana ve <strong>Binance TR</strong> üzerindeki popüler altcoinleri
                        takip edin. DeFi, Meme Coin, Metaverse ve Web3 projelerini portföyünüze ekleyerek
                        tek bir ekrandan yönetin.
                    </p>
                </GlassCard>
            </div>

            <GlassCard className="p-8 mt-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                    Neden Portföy Takibi Yapmalısınız?
                </h3>
                <div className="space-y-4 text-text-secondary">
                    <p>
                        Başarılı bir kripto para yatırımcısı olmanın ilk kuralı, yatırımlarınızı düzenli olarak takip etmektir.
                        Hangi fiyattan ne kadar aldığınızı, ortalama maliyetinizi ve net kar durumunuzu bilmek,
                        panik satışlarını önler ve stratejik kararlar almanıza yardımcı olur.
                    </p>
                    <p>
                        Bu araç sayesinde Excel tablolarıyla uğraşmadan, karmaşık borsa arayüzlerinde kaybolmadan
                        net varlık durumunuzu görebilirsiniz.
                    </p>
                </div>
            </GlassCard>
        </section>
    );
}
