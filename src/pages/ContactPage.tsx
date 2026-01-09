import { Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { SEOHead } from '../components/seo/SEOHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="İletişim - Bize Ulaşın"
                description="Kripto Paralar ekibiyle iletişime geçin. Soru, görüş ve önerileriniz için iletişim formunu kullanabilir veya e-posta gönderebilirsiniz."
                canonicalUrl="/iletisim"
            />
            <SchemaMarkup
                type="organization"
                organizationData={{
                    name: 'TG Dijital',
                    url: 'https://kripto-paralar.com',
                    logo: 'https://kripto-paralar.com/logo.png',
                    sameAs: []
                }}
            />

            <Header />

            <main className="container py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                        İletişime Geçin
                    </h1>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Sorularınız, iş birlikleri veya geri bildirimleriniz için bize ulaşın.
                        En kısa sürede size dönüş yapacağız.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 h-full flex flex-col justify-center gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-6 border-b border-white/5 pb-2">
                                    İletişim Bilgileri
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-neon-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted mb-1">E-posta Adresi</p>
                                            <a href="mailto:info@kripto-paralar.com" className="text-text-primary hover:text-neon-cyan transition-colors font-medium">
                                                info@kripto-paralar.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-neon-purple" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted mb-1">Adres</p>
                                            <p className="text-text-primary font-medium">
                                                TG Dijital<br />
                                                Antalya, Türkiye
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-white/5 pb-2">
                                    Sosyal Medya
                                </h3>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-lg bg-bg-tertiary hover:bg-white/5 flex items-center justify-center transition-colors text-text-secondary hover:text-[#1DA1F2]">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-lg bg-bg-tertiary hover:bg-white/5 flex items-center justify-center transition-colors text-text-secondary hover:text-[#0A66C2]">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-lg bg-bg-tertiary hover:bg-white/5 flex items-center justify-center transition-colors text-text-secondary hover:text-white">
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Contact Form */}
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-6">
                            Mesaj Gönderin
                        </h3>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-text-secondary mb-2">Adınız</label>
                                    <input
                                        type="text"
                                        className="w-full bg-bg-tertiary border border-white/5 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan/50 transition-colors"
                                        placeholder="Adınız"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-text-secondary mb-2">Soyadınız</label>
                                    <input
                                        type="text"
                                        className="w-full bg-bg-tertiary border border-white/5 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan/50 transition-colors"
                                        placeholder="Soyadınız"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    className="w-full bg-bg-tertiary border border-white/5 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan/50 transition-colors"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">Konu</label>
                                <select className="w-full bg-bg-tertiary border border-white/5 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan/50 transition-colors">
                                    <option>Genel Soru</option>
                                    <option>İş Birliği / Reklam</option>
                                    <option>Teknik Destek</option>
                                    <option>Hata Bildirimi</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-text-secondary mb-2">Mesajınız</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-bg-tertiary border border-white/5 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                                    placeholder="Mesajınızı buraya yazın..."
                                ></textarea>
                            </div>

                            <NeonButton variant="primary" className="w-full justify-center mt-2">
                                Gönder
                            </NeonButton>
                        </form>
                    </GlassCard>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
