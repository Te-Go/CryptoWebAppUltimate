import { useEffect, useRef } from 'react';

type AdSlotSize = 'leaderboard' | 'rectangle' | 'skyscraper' | 'responsive';

interface AdSlotProps {
    slotId: string;
    size?: AdSlotSize;
    className?: string;
}

const sizeMap: Record<AdSlotSize, { width: string; height: string }> = {
    leaderboard: { width: '728px', height: '90px' },
    rectangle: { width: '300px', height: '250px' },
    skyscraper: { width: '160px', height: '600px' },
    responsive: { width: '100%', height: 'auto' },
};

/**
 * AdSense ad slot component
 * Replace data-ad-client and data-ad-slot with your actual AdSense values
 */
export function AdSlot({ slotId, size = 'responsive', className = '' }: AdSlotProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const dimensions = sizeMap[size];

    useEffect(() => {
        // Push ad when component mounts (only in production)
        try {
            if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle) {
                ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({});
            }
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div
            ref={adRef}
            className={`ad-slot relative flex items-center justify-center bg-bg-tertiary/30 border border-border/20 rounded-lg overflow-hidden ${className}`}
            style={{
                minHeight: size === 'responsive' ? '100px' : dimensions.height,
                maxWidth: dimensions.width,
            }}
        >
            {/* AdSense Code - Replace with your actual values */}
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    width: dimensions.width,
                    height: size === 'responsive' ? 'auto' : dimensions.height,
                }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
                data-ad-slot={slotId}
                data-ad-format={size === 'responsive' ? 'auto' : undefined}
                data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
            />

            {/* Placeholder for development */}
            {import.meta.env.DEV && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-tertiary/80 text-text-muted text-xs">
                    <div className="text-center">
                        <p className="font-medium">📢 Reklam Alanı</p>
                        <p className="text-[10px] mt-1">{size} - {slotId}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

interface WrapperAdProps {
    slotId?: string;
    className?: string;
}

/**
 * Pre-configured ad slots for different page positions
 */
export function HeaderAd({ slotId, className = '' }: WrapperAdProps) {
    return (
        <div className={`w-full flex justify-center py-2 ${className}`}>
            <AdSlot slotId={slotId || "header-leaderboard"} size="leaderboard" className="hidden md:flex" />
            <AdSlot slotId={slotId ? `${slotId}-mobile` : "header-mobile"} size="rectangle" className="md:hidden" />
        </div>
    );
}

export function SidebarAd({ slotId, className = '' }: WrapperAdProps) {
    return <AdSlot slotId={slotId || "sidebar-rectangle"} size="rectangle" className={className} />;
}

export function InContentAd({ slotId, className = '' }: WrapperAdProps) {
    return (
        <div className={`my-6 ${className}`}>
            <AdSlot slotId={slotId || "in-content"} size="responsive" className="w-full" />
        </div>
    );
}

export function FooterAd({ slotId, className = '' }: WrapperAdProps) {
    return (
        <div className={`w-full flex justify-center py-4 ${className}`}>
            <AdSlot slotId={slotId || "footer-leaderboard"} size="leaderboard" className="hidden md:flex" />
            <AdSlot slotId={slotId ? `${slotId}-mobile` : "footer-mobile"} size="rectangle" className="md:hidden" />
        </div>
    );
}

export function LargeRectAd({ slotId, className = '' }: WrapperAdProps) {
    return (
        <div className={`w-full flex justify-center py-4 ${className}`}>
            <AdSlot slotId={slotId || "large-rect"} size="rectangle" />
        </div>
    );
}
