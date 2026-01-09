import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { GlassCard } from '../ui/GlassCard';

export function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show after a small delay for better UX
            const timer = setTimeout(() => setShowConsent(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowConsent(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-transparent flex justify-center">
            <GlassCard className="w-full max-w-4xl border-t border-neon-cyan/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] bg-bg-primary/95 backdrop-blur-xl animate-slide-up">
                <div className="flex flex-col md:flex-row items-center gap-6 p-2">
                    {/* Icon */}
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-bg-tertiary items-center justify-center shrink-0 text-neon-cyan">
                        <Cookie className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h3 className="text-lg font-semibold text-text-primary flex items-center justify-center md:justify-start gap-2">
                            <Cookie className="w-5 h-5 md:hidden text-neon-cyan" />
                            Çerez Tercihleri ve Gizlilik
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Size daha iyi bir deneyim sunmak, site trafiğini analiz etmek ve kişiselleştirilmiş içerik sağlamak için çerezleri (cookies) kullanıyoruz.
                            Detaylı bilgi için <Link to="/kvkk" className="text-neon-cyan hover:underline">KVKK Aydınlatma Metni</Link> ve <Link to="/gizlilik-politikasi" className="text-neon-cyan hover:underline">Gizlilik Politikamızı</Link> inceleyebilirsiniz.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[200px]">
                        <NeonButton
                            variant="secondary"
                            className="justify-center text-sm py-2"
                            onClick={handleReject}
                        >
                            Reddet
                        </NeonButton>
                        <NeonButton
                            variant="primary"
                            className="justify-center text-sm py-2"
                            onClick={handleAccept}
                        >
                            Kabul Et
                        </NeonButton>
                    </div>

                    {/* Close Button (Optional if you want to force choice) */}
                    <button
                        onClick={() => setShowConsent(false)}
                        className="absolute top-2 right-2 p-2 text-text-muted hover:text-text-primary md:hidden"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
