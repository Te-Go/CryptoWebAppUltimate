import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    keywords?: string[];
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
}: SEOHeadProps) {
    const fullTitle = `${title} | Kripto Paralar`;
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
