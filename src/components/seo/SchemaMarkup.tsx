import type { Crypto } from '../../data/mockCryptos';

interface SchemaMarkupProps {
    type: 'coin' | 'faq' | 'organization' | 'breadcrumb';
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
    const generateCoinSchema = (coin: Crypto) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: coin.name,
        description: `${coin.name} (${coin.symbol}) canlı fiyatı, piyasa değeri ve 24 saatlik işlem hacmi. Türkiye'nin en güncel kripto para takip platformu.`,
        image: coin.image,
        sku: coin.symbol,
        brand: {
            '@type': 'Brand',
            name: coin.name,
        },
        offers: {
            '@type': 'Offer',
            price: coin.price,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            url: `https://kripto-paralar.com/coin/${coin.id}`,
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            reviewCount: Math.floor(coin.volume24h / 1000000),
        },
    });

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
