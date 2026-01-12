import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { Check, X, ExternalLink } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

interface Exchange {
    name: string;
    logo: string;
    trustScore: number;
    fees: string;
    pairs: number;
    depositMethods: string[];
    features: string[];
    pros: string[];
    cons: string[];
    url: string;
}

const exchanges: Exchange[] = [
    {
        name: 'Binance TR',
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        trustScore: 10,
        fees: '%0.10',
        pairs: 150,
        depositMethods: ['Ziraat', 'Vakıfbank', 'Akbank', 'FAST (7/24)'],
        features: ['TrBinance Transfer', 'Staking', 'Otomatik Yatırım'],
        pros: ['Global Binance\'e ücretsiz transfer', 'Düşük komisyon', 'Yüksek likidite'],
        cons: ['Müşteri hizmetleri yoğun', 'Bazen bakım çalışmaları'],
        url: 'https://www.trbinance.com',
    },
    {
        name: 'Paribu',
        logo: 'https://seeklogo.com/images/P/paribu-logo-509503460D-seeklogo.com.png',
        trustScore: 9,
        fees: '%0.25 - %0.35',
        pairs: 80,
        depositMethods: ['Tüm Bankalar (HAVALE/EFT)', 'Papara'],
        features: ['Box (Gaming)', 'Fan Tokenler', 'Kolay Al/Sat'],
        pros: ['Yerli ve köklü', 'Hızlı arayüz', 'Kolay kullanım'],
        cons: ['Komisyon oranları yüksek', 'Yoğunlukta yavaşlama'],
        url: 'https://www.paribu.com',
    },
    {
        name: 'BtcTurk | PRO',
        logo: 'https://seeklogo.com/images/B/btcturk-logo-7DA066A592-seeklogo.com.png',
        trustScore: 9,
        fees: '%0.05 - %0.09',
        pairs: 60,
        depositMethods: ['7 Banka ile 7/24', 'FAST'],
        features: ['Pro Arayüz', 'Gelişmiş Grafikler', 'Stop Limit'],
        pros: ['Çok düşük komisyon', 'Profesyonel arayüz', 'Güvenilir altyapı'],
        cons: ['Coin çeşitliliği az', 'Mobil uygulama bazen karmaşık'],
        url: 'https://pro.btcturk.com',
    },
];

const faqs = [
    {
        question: "Türkiye'deki kripto borsaları güvenilir mi?",
        answer: "Listelediğimiz borsalar (Binance TR, Paribu, BtcTurk) Türkiye'de yasal olarak faaliyet gösteren, MASAK (Mali Suçları Araştırma Kurulu) yükümlülüklerine uyan ve milyonlarca kullanıcısı olan köklü platformlardır. Ancak her zaman varlıklarınızın bir kısmını soğuk cüzdanlarda tutmanız önerilir."
    },
    {
        question: "En düşük komisyon hangi borsada?",
        answer: "Şu anda Binance TR %0.10 (binde 1) işlem ücreti ile en düşük standart komisyonu sunmaktadır. BNB kullanarak bu oranı %0.075'e kadar düşürebilirsiniz."
    },
    {
        question: "Banka hesabından nasıl para yatırılır?",
        answer: "Tüm bu borsalar Türk bankalarıyla entegredir. Ziraat, Vakıfbank, Akbank gibi anlaşmalı bankalardan 7/24 Havale yapabilir, diğer tüm bankalardan ise FAST (50.000 TL'ye kadar) ile anında veya EFT saatlerinde para yatırabilirsiniz."
    }
];

export function ExchangesPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="En İyi Türk Kripto Para Borsaları Karşılaştırması 2026"
                description="Binance TR, Paribu güvenilir mi? BtcTurk komisyon oranları. En güvenilir ve düşük komisyonlu Türk bitcoin borsalarını karşılaştırın."
                keywords={['kripto borsa', 'binance tr', 'paribu', 'btcturk', 'bitcoin borsaları', 'komisyon oranları']}
                canonicalUrl="/borsalar"
            />

            <SchemaMarkup
                type="breadcrumb"
                breadcrumbs={[
                    { name: 'Ana Sayfa', url: '/' },
                    { name: 'Borsalar', url: '/borsalar' }
                ]}
            />

            <SchemaMarkup
                type="faq"
                faqs={faqs}
            />

            <Header />

            <main className="container py-8 space-y-8">
                {/* Hero Section */}
                <section className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                        En İyi Türk Kripto Para Borsaları
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Komisyon oranları, güvenilirlik puanları ve kullanıcı deneyimine göre Türkiye'nin en popüler borsalarını karşılaştırın.
                    </p>
                </section>

                {/* Exchange Cards */}
                <section className="grid md:grid-cols-3 gap-6">
                    {exchanges.map((exchange) => (
                        <GlassCard key={exchange.name} className="flex flex-col h-full relative overflow-hidden" hover={true}>
                            {/* Trust Badge */}
                            <div className="absolute top-4 right-4 bg-profit/10 text-profit px-2 py-1 rounded text-xs font-bold border border-profit/20">
                                {exchange.trustScore}/10 Güven
                            </div>

                            <div className="p-6 flex-grow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center">
                                        {/* Fallback for logo if img fails, typically use generic icon */}
                                        <span className="text-xl font-bold text-text-primary">{exchange.name[0]}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-text-primary">{exchange.name}</h2>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">Komisyon Oranları</p>
                                        <p className="font-semibold text-text-primary">{exchange.fees}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">Coin Çeşitliliği</p>
                                        <p className="font-semibold text-text-primary">{exchange.pairs}+ Çift</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">Para Yatırma</p>
                                        <p className="text-sm text-text-secondary">{exchange.depositMethods.join(', ')}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-profit uppercase">Avantajlar</span>
                                        {exchange.pros.map(pro => (
                                            <div key={pro} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Check className="w-3 h-3 text-profit flex-shrink-0" />
                                                <span>{pro}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-loss uppercase">Dezavantajlar</span>
                                        {exchange.cons.map(con => (
                                            <div key={con} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <X className="w-3 h-3 text-loss flex-shrink-0" />
                                                <span>{con}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <a href={exchange.url} target="_blank" rel="noopener noreferrer" className="block">
                                    <NeonButton variant="primary" className="w-full justify-center">
                                        Siteye Git <ExternalLink className="w-4 h-4 ml-2" />
                                    </NeonButton>
                                </a>
                            </div>
                        </GlassCard>
                    ))}
                </section>

                {/* Comparison Table */}
                <GlassCard className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-bg-tertiary/50">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-text-primary">Borsa</th>
                                    <th className="p-4 text-sm font-semibold text-text-primary">Güven Puanı</th>
                                    <th className="p-4 text-sm font-semibold text-text-primary">Komisyon</th>
                                    <th className="p-4 text-sm font-semibold text-text-primary">Coin Sayısı</th>
                                    <th className="p-4 text-sm font-semibold text-text-primary">Mobil Uygulama</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {exchanges.map((exchange) => (
                                    <tr key={exchange.name} className="hover:bg-bg-tertiary/20">
                                        <td className="p-4 font-medium text-text-primary">{exchange.name}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-profit">
                                                <span className="font-bold">{exchange.trustScore}</span>/10
                                            </div>
                                        </td>
                                        <td className="p-4 text-text-secondary">{exchange.fees}</td>
                                        <td className="p-4 text-text-secondary">{exchange.pairs}+</td>
                                        <td className="p-4 text-text-secondary">✅ Mevcut</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* Summary: Which is Best? */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 font-display text-center">Hangi Borsa Sizin İçin Uygun?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <GlassCard className="p-6 border-l-4 border-l-neon-yellow">
                            <h3 className="text-lg font-bold text-white mb-2">Binance TR</h3>
                            <p className="text-neon-yellow font-semibold text-sm mb-3">Düşük Komisyon & Profesyoneller</p>
                            <p className="text-text-secondary text-sm">
                                Eğer <strong>en düşük komisyon oranlarını</strong> arıyorsanız ve Global Binance hesabınıza ücretsiz transfer yapmak istiyorsanız en iyi seçenek. Yüksek likidite ve geniş araç seti sunar.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-6 border-l-4 border-l-neon-green">
                            <h3 className="text-lg font-bold text-white mb-2">Paribu</h3>
                            <p className="text-neon-green font-semibold text-sm mb-3">Kolay Arayüz & Yeni Başlayanlar</p>
                            <p className="text-text-secondary text-sm">
                                Kripto paralara <strong>yeni başlıyorsanız</strong> ve en basit arayüzü arıyorsanız Paribu öne çıkar. Hızlı kayıt ve kolay al-sat işlemleri ile kullanıcı dostudur.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-6 border-l-4 border-l-neon-blue">
                            <h3 className="text-lg font-bold text-white mb-2">BtcTurk | PRO</h3>
                            <p className="text-neon-blue font-semibold text-sm mb-3">Güvenilirlik & Kurumsal Hizmet</p>
                            <p className="text-text-secondary text-sm">
                                <strong>7/24 canlı destek</strong> ve güvenilirlik sizin için ön plandaysa BtcTurk idealdir. Bankalarla güçlü entegrasyonu ve köklü geçmişi ile güven verir.
                            </p>
                        </GlassCard>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 font-display text-center">Sıkça Sorulan Sorular</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <GlassCard key={index} className="p-6">
                                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                                <p className="text-text-secondary">{faq.answer}</p>
                            </GlassCard>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
