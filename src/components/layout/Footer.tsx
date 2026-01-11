import { Link } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { FooterAd } from '../ads/AdSlot';

export function Footer({ showAd = true }: { showAd?: boolean }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-bg-secondary border-t border-border/50 pt-12 pb-24 lg:pb-12 mt-auto">
            <div className="container px-4 mx-auto space-y-8">

                {/* AdSlot Integration */}
                {showAd && (
                    <div className="flex justify-center mb-8">
                        <FooterAd />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <div className="absolute inset-0 bg-neon-cyan rounded-full opacity-20 animate-pulse" />
                                <div className="absolute inset-2 bg-gradient-to-tr from-neon-cyan to-neon-blue rounded-full" />
                            </div>
                            <span className="text-xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-blue">
                                KriptoParalar
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Türkiye'nin en kapsamlı kripto para takip ve analiz platformu.
                            Canlı veriler, detaylı grafikler ve yapay zeka destekli analizler.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-text-primary font-semibold mb-4">Hızlı Erişim</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li>
                                <Link to="/markets" className="hover:text-neon-cyan transition-colors">Piyasalar</Link>
                            </li>
                            <li>
                                <Link to="/borsalar" className="hover:text-neon-cyan transition-colors">Borsa Karşılaştırma</Link>
                            </li>
                            <li>
                                <Link to="/egitim" className="hover:text-neon-cyan transition-colors">Kripto Rehberi</Link>
                            </li>
                            <li>
                                <Link to="/haberler" className="hover:text-neon-cyan transition-colors">Haberler</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-text-primary font-semibold mb-4">Kurumsal</h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li>
                                <a href="#" className="hover:text-neon-cyan transition-colors">Hakkımızda</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-neon-cyan transition-colors">Gizlilik Politikası</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-neon-cyan transition-colors">Kullanım Koşulları</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-neon-cyan transition-colors flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    KVKK Aydınlatma Metni
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact or Social */}
                    <div>
                        <h3 className="text-text-primary font-semibold mb-4">İletişim</h3>
                        <p className="text-text-secondary text-sm mb-4">
                            Sorularınız ve önerileriniz için bize ulaşın.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors cursor-pointer">
                                𝕏
                            </div>
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors cursor-pointer">
                                in
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Warning Disclaimer */}
                <div className="bg-bg-tertiary/30 rounded-lg p-4 border border-loss/10">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-loss flex-shrink-0 mt-0.5" />
                        <div className="space-y-2 text-xs text-text-muted leading-relaxed">
                            <p className="font-semibold text-text-secondary">Yasal Uyarı ve Risk Bildirimi:</p>
                            <p>
                                KriptoParalar.com üzerinde yer alan yatırım bilgi, yorum ve tavsiyeleri
                                <strong className="text-text-secondary"> yatırım danışmanlığı kapsamında değildir</strong>.
                                Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, mevduat kabul etmeyen bankalar ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde sunulmaktadır.
                            </p>
                            <p>
                                Burada yer alan yorum ve tavsiyeler, yorum ve tavsiyede bulunanların kişisel görüşlerine dayanmaktadır.
                                Bu görüşler mali durumunuz ile risk ve getiri tercihlerinize uygun olmayabilir.
                                Bu nedenle, sadece burada yer alan bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize uygun sonuçlar doğurmayabilir.
                            </p>
                            <p>
                                Kripto varlıklar yüksek volatiliteye sahip riskli yatırım araçlarıdır.
                                Paranızı kaybetme riski olduğunu unutmayınız.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 text-xs text-text-muted">
                    <p>&copy; {currentYear} KriptoParalar.com. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <span>Veriler CoinGecko API tarafından sağlanmaktadır.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
