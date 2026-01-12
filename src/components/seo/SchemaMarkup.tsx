import type { Crypto } from '../../data/mockCryptos';

interface SchemaMarkupProps {
    type: 'coin' | 'faq' | 'organization' | 'breadcrumb' | 'webapp' | 'liveblog';
    data?: Crypto;
    faqs?: { question: string; answer: string }[];
    breadcrumbs?: { name: string; url: string }[];
    organizationData?: {
        name: string;
        url: string;
        logo: string;
        sameAs: string[];
    };
}

export function SchemaMarkup({ type, data, faqs, breadcrumbs, organizationData }: SchemaMarkupProps) {
    const generateCoinSchema = (coin: Crypto) => {
        // Determine specific schema type based on category
        let schemaType = 'FinancialProduct'; // Default for generic financial asset
        let additionalType = 'Currency'; // Default additional type

        if (coin.category.includes('layer-1') || coin.category.includes('layer-0')) {
            schemaType = 'SoftwareApplication'; // Blockchain network
            additionalType = 'Cryptocurrency';
        } else if (coin.category.includes('defi')) {
            schemaType = 'FinancialProduct'; // DeFi product
            additionalType = 'DecentralizedFinance';
        }

        return {
            '@context': 'https://schema.org',
            '@type': schemaType,
            additionalType: `https://schema.org/${additionalType}`,
            name: coin.name,
            description: `${coin.name} (${coin.symbol}) canlı fiyatı, piyasa değeri ve 24 saatlik işlem hacmi. Türkiye'nin en güncel kripto para takip platformu.`,
            image: coin.image,
            sku: coin.symbol,
            brand: {
                '@type': 'Brand',
                name: coin.name,
            },
            sameAs: [
                coin.socials?.website,
                coin.socials?.twitter
            ].filter(Boolean),
            offers: {
                '@type': 'Offer',
                price: coin.price,
                priceCurrency: 'TRY',
                availability: 'https://schema.org/InStock',
                url: `https://kripto-paralar.com/coin/${coin.id}`,
                priceValidUntil: new Date(Date.now() + 86400000).toISOString(), // Valid for 24h
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: Math.floor(coin.volume24h / 1000000) || 10,
            },
        };
    };

    const generateFAQSchema = (faqList: { question: string; answer: string }[]) => ({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqList.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    });

    const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://kripto-paralar.com${item.url}`,
        })),
    });

    const generateOrganizationSchema = () => {
        const orgData = organizationData || {
            name: 'Kripto Paralar',
            url: 'https://kripto-paralar.com',
            logo: 'https://kripto-paralar.com/logo.png',
            sameAs: [
                'https://twitter.com/kriptoparalar',
                'https://instagram.com/kriptoparalar',
            ]
        };

        return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: orgData.name,
            url: orgData.url,
            logo: orgData.logo,
            description: 'Türkiye\'nin en kapsamlı kripto para takip ve analiz platformu.',
            sameAs: orgData.sameAs,
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: 'Turkish',
            },
        };
    };

    const generateWebApplicationSchema = () => ({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Kripto Paralar Terminali',
        url: 'https://kripto-paralar.com',
        description: 'Canlı kripto para fiyatları, analiz araçları ve anlık piyasa verileri.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
        featureList: 'Live Data Feed, Interactive Chart, Instant Calculation',
        screenshot: 'https://kripto-paralar.com/screenshot-app.jpg',
    });

    const generateLiveBlogSchema = () => {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

        return {
            '@context': 'https://schema.org',
            '@type': 'LiveBlogPosting',
            headline: 'Canlı Kripto Para Piyasası ve Anlık Analizler',
            description: 'Bitcoin, Ethereum ve Altcoin fiyatlarında son durum. Canlı piyasa takibi.',
            coverageStartTime: startOfDay,
            coverageEndTime: endOfDay,
            dateModified: new Date().toISOString(),
            author: {
                '@type': 'Organization',
                name: 'Kripto Paralar',
            },
            publisher: {
                '@type': 'Organization',
                name: 'Kripto Paralar',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://kripto-paralar.com/logo.png',
                },
            },
            liveBlogUpdate: [
                {
                    '@type': 'BlogPosting',
                    headline: 'Piyasa Verileri Güncellendi',
                    datePublished: new Date().toISOString(),
                    author: {
                        '@type': 'Organization',
                        name: 'Kripto Paralar Bot',
                    },
                },
            ],
        };
    };

    let schema;
    switch (type) {
        case 'coin':
            if (!data) return null;
            schema = generateCoinSchema(data);
            break;
        case 'faq':
            if (!faqs || faqs.length === 0) return null;
            schema = generateFAQSchema(faqs);
            break;
        case 'breadcrumb':
            if (!breadcrumbs || breadcrumbs.length === 0) return null;
            schema = generateBreadcrumbSchema(breadcrumbs);
            break;
        case 'organization':
            schema = generateOrganizationSchema();
            break;
        case 'webapp':
            schema = generateWebApplicationSchema();
            break;
        case 'liveblog':
            schema = generateLiveBlogSchema();
            break;
        default:
            return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
