import { Database, Clock, ExternalLink } from 'lucide-react';

interface TrustBoxProps {
    dataSource?: string;
    sourceUrl?: string;
    lastUpdate?: Date | null;
    className?: string;
}

/**
 * TrustBox Component - E-E-A-T Authority Signal
 * Per Golden Master SEO Blueprint: "Every page must have a visible citation box"
 */
export function TrustBox({
    dataSource = 'CoinGecko API',
    sourceUrl = 'https://www.coingecko.com',
    lastUpdate,
    className = '',
}: TrustBoxProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={`flex flex-wrap items-center gap-3 px-4 py-2.5 bg-bg-tertiary/50 border border-border/30 rounded-lg text-xs text-text-muted ${className}`}>
            <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-neon-cyan/70" />
                <span>Veri Kaynağı:</span>
                <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:underline flex items-center gap-1"
                >
                    {dataSource}
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>

            {lastUpdate && (
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-profit/70" />
                    <span>Son Güncelleme:</span>
                    <span className="text-text-secondary font-medium">
                        {formatTime(lastUpdate)}
                    </span>
                </div>
            )}

            <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                <span className="text-text-muted/60">TG Finans Masası</span>
            </div>
        </div>
    );
}
