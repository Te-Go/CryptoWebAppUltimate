import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    keywords?: string[];
    dynamicData?: {
        price?: string;
        change?: number;
        symbol?: string;
    };
}

/**
 * SEO Head component - updates document meta tags
 * React 19 compatible without external dependencies
 */
export function SEOHead({
    title,
    description,
    canonicalUrl,
    ogImage = '/og-default.png',
    ogType = 'website',
    keywords = [],
    dynamicData,
}: SEOHeadProps) {
    let fullTitle = `${title} | Kripto Paralar`;

    // Dynamic Title Logic (Programmatic SEO)
    if (dynamicData?.price && dynamicData?.symbol) {
        const arrow = (dynamicData.change || 0) >= 0 ? '▲' : '▼';
        const changeStr = dynamicData.change ? `(${arrow}%${Math.abs(dynamicData.change).toFixed(1)})` : '';
        // Format: "Bitcoin (BTC) $95,400 (5%) | Kripto Paralar"
        // Or if it's homepage: "BTC $95,400 (5%) - Canlı Kripto Borsası..."

        // If title is generic "Canlı Kripto...", we might want to prepend the data
        if (title.includes('Canlı Kripto')) {
            fullTitle = `${dynamicData.symbol} ${dynamicData.price} ${changeStr} | ${title}`;
        } else {
            // For specific pages, maybe replace or append?
            fullTitle = `${title} ${dynamicData.price} ${changeStr} | Kripto Paralar`;
        }
    }

    const siteUrl = 'https://kripto-paralar.com';
    const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;

    useEffect(() => {
        // Update title
        document.title = fullTitle;

        // Helper to update or create meta tag
        const updateMeta = (name: string, content: string, property = false) => {
            const attr = property ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, name);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        // Update description
        updateMeta('description', description);

        // Keywords
        if (keywords.length > 0) {
            updateMeta('keywords', keywords.join(', '));
        }

        // Open Graph
        updateMeta('og:title', fullTitle, true);
        updateMeta('og:description', description, true);
        updateMeta('og:image', ogImage, true);
        updateMeta('og:type', ogType, true);
        updateMeta('og:site_name', 'Kripto Paralar', true);
        updateMeta('og:locale', 'tr_TR', true);
        if (canonical) {
            updateMeta('og:url', canonical, true);
        }

        // Twitter
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', fullTitle);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', ogImage);

        // Canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (canonical) {
            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.rel = 'canonical';
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.href = canonical;
        }

        // Language
        document.documentElement.lang = 'tr';

    }, [fullTitle, description, canonical, ogImage, keywords]);

    return null;
}
