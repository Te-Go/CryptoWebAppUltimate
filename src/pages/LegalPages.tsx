import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SEOHead } from '../components/seo/SEOHead';

export function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead title="Gizlilik Politikası" description="Kripto Paralar gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler." canonicalUrl="/gizlilik-politikasi" />
            <Header />
            <main className="container py-12 max-w-4xl">
                <GlassCard className="p-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-8 font-display">Gizlilik Politikası</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                        <p>Son Güncelleme: 10 Ocak 2026</p>
                        <p>TG Dijital ("Şirket") olarak, kripto-paralar.com web sitesini ziyaret eden kullanıcılarımızın gizliliğine önem veriyoruz.</p>

                        <h3>1. Toplanan Veriler</h3>
                        <p>Web sitemizi ziyaret ettiğinizde, deneyiminizi iyileştirmek amacıyla IP adresi, tarayıcı türü gibi teknik veriler ve çerezler aracılığıyla anonim kullanım verileri toplanabilir.</p>

                        <h3>2. Çerezler (Cookies)</h3>
                        <p>Kullanıcı deneyimini artırmak ve tercihlerinizi hatırlamak için çerezler kullanıyoruz. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman yönetebilirsiniz.</p>

                        <h3>3. Üçüncü Taraf Hizmetler</h3>
                        <p>Sitemizde Google Analytics ve Google AdSense gibi üçüncü taraf hizmetler kullanılmaktadır. Bu hizmetler, kendi gizlilik politikaları çerçevesinde veri toplayabilir.</p>

                        <h3>4. Veri Güvenliği</h3>
                        <p>Kişisel verilerinizin güvenliği için endüstri standardı güvenlik önlemleri uygulamaktayız.</p>

                        <h3>5. İletişim</h3>
                        <p>Gizlilik politikamızla ilgili sorularınız için <a href="mailto:info@kripto-paralar.com" className="text-neon-cyan">info@kripto-paralar.com</a> adresinden bize ulaşabilirsiniz.</p>
                    </div>
                </GlassCard>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}

export function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead title="Kullanım Koşulları" description="Kripto Paralar web sitesi kullanım koşulları ve yasal uyarılar." canonicalUrl="/kullanim-kosullari" />
            <Header />
            <main className="container py-12 max-w-4xl">
                <GlassCard className="p-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-8 font-display">Kullanım Koşulları</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                        <p>Lütfen kripto-paralar.com web sitesini kullanmadan önce bu kullanım koşullarını dikkatlice okuyunuz.</p>

                        <h3>1. Hizmetin Kapsamı</h3>
                        <p>Web sitemiz, kripto paralar hakkında haber, analiz ve veri sağlayan bir bilgilendirme platformudur. Sitemizde yer alan bilgiler yatırım tavsiyesi niteliği taşımaz.</p>

                        <h3>2. Yatırım Uyarısı</h3>
                        <p>Kripto para piyasaları yüksek volatiliteye sahiptir ve yatırım yapmak risk içerir. Kullanıcılar, yatırım kararlarını kendi sorumlulukları altında vermelidir. Kripto Paralar, oluşabilecek maddi kayıplardan sorumlu tutulamaz.</p>

                        <h3>3. İçerik Hakkı</h3>
                        <p>Sitedeki içerikler (metin, grafik, logo) TG Dijital'in fikri mülkiyetindedir ve izinsiz kopyalanamaz.</p>

                        <h3>4. Değişiklikler</h3>
                        <p>Kullanım koşullarını dilediğimiz zaman güncelleme hakkını saklı tutarız.</p>
                    </div>
                </GlassCard>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}

export function KVKKPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead title="KVKK Aydınlatma Metni" description="Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni." canonicalUrl="/kvkk" />
            <Header />
            <main className="container py-12 max-w-4xl">
                <GlassCard className="p-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-8 font-display">KVKK Aydınlatma Metni</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla TG Dijital olarak kişisel verilerinizi aşağıda açıklanan kapsamda işlemekteyiz.</p>

                        <h3>1. Kişisel Verilerin İşlenme Amacı</h3>
                        <p>Kişisel verileriniz, yasal yükümlülüklerin yerine getirilmesi, iletişim faaliyetlerinin yürütülmesi ve hizmet kalitesinin artırılması amacıyla işlenmektedir.</p>

                        <h3>2. Veri Toplama Yöntemi</h3>
                        <p>Kişisel verileriniz, web sitemiz, iletişim formları ve çerezler aracılığıyla elektronik ortamda toplanmaktadır.</p>

                        <h3>3. Haklarınız</h3>
                        <p>KVKK'nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, silinmesini veya düzeltilmesini talep etme hakkına sahipsiniz.</p>

                        <p>Taleplerinizi <a href="mailto:info@kripto-paralar.com" className="text-neon-cyan">info@kripto-paralar.com</a> adresine iletebilirsiniz.</p>
                    </div>
                </GlassCard>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
