import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { GlassCard } from '../ui/GlassCard';

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:w-96">
            <GlassCard className="p-4 border-accent-gold/50 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">Uygulamayı Yükle</h3>
                        <p className="text-sm text-text-secondary mb-3">
                            Daha hızlı erişim ve çevrimdışı kullanım için uygulamayı ana ekranına ekle.
                        </p>
                        <NeonButton
                            variant="primary"
                            className="w-full justify-center"
                            onClick={handleInstall}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Yükle
                        </NeonButton>
                    </div>
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="text-text-muted hover:text-text-primary transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
