import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface FAQ {
    question: string;
    answer: string;
}

interface PeopleAlsoAskProps {
    faqs: FAQ[];
    title?: string;
}

/**
 * "People Also Asked" style FAQ accordion
 * Optimized for Google's PAA snippets and FAQPage schema
 */
export function PeopleAlsoAsk({ faqs, title = 'Sıkça Sorulan Sorular' }: PeopleAlsoAskProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <GlassCard className="p-4 md:p-6" hover={false}>
            <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-lg font-semibold text-text-primary font-display">
                    {title}
                </h3>
            </div>

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-border/50 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-tertiary/50 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-medium text-text-primary pr-4">
                                {faq.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-4 pb-4 text-text-secondary text-sm leading-relaxed border-t border-border/30 pt-3">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

// Pre-built FAQ sets for common coins
export const bitcoinFAQs: FAQ[] = [
    {
        question: 'Bitcoin nedir?',
        answer: 'Bitcoin, 2009 yılında Satoshi Nakamoto takma adlı bir kişi veya grup tarafından oluşturulan, merkezi olmayan ilk dijital para birimidir. Blok zinciri teknolojisi üzerine inşa edilmiştir.',
    },
    {
        question: 'Bitcoin nasıl satın alınır?',
        answer: 'Bitcoin, Paribu, BtcTurk veya Binance TR gibi Türk kripto para borsalarından TL ile satın alınabilir. Hesap açtıktan ve kimlik doğrulaması yaptıktan sonra banka transferi ile TL yatırıp Bitcoin alabilirsiniz.',
    },
    {
        question: 'Bitcoin güvenli mi?',
        answer: 'Bitcoin\'in blok zinciri teknolojisi oldukça güvenlidir. Ancak kripto para yatırımları yüksek volatilite nedeniyle risk içerir. Yatırım yapmadan önce araştırma yapmanız önerilir.',
    },
    {
        question: 'Bitcoin vergisi nasıl hesaplanır?',
        answer: "Türkiye'de kripto para kazançları gelir vergisine tabidir. Alış ve satış fiyatı arasındaki fark üzerinden vergi hesaplanır. Detaylı bilgi için bir mali müşavire danışmanızı öneririz.",
    },
];

export const ethereumFAQs: FAQ[] = [
    {
        question: 'Ethereum nedir?',
        answer: 'Ethereum, akıllı sözleşmeler ve merkeziyetsiz uygulamalar (dApps) çalıştırabilen bir blok zinciri platformudur. ETH, bu platformun yerel kripto para birimidir.',
    },
    {
        question: 'Ethereum ile Bitcoin arasındaki fark nedir?',
        answer: 'Bitcoin öncelikle bir değer saklama aracı iken, Ethereum programlanabilir bir platformdur. Ethereum üzerinde NFT\'ler, DeFi protokolleri ve akıllı sözleşmeler çalıştırılabilir.',
    },
    {
        question: 'Ethereum 2.0 nedir?',
        answer: 'Ethereum 2.0, ağın Proof of Work\'ten Proof of Stake\'e geçişini ifade eder. Bu geçiş enerji tüketimini %99 azaltmış ve ağı daha ölçeklenebilir hale getirmiştir.',
    },
];

// Generic FAQ generator for any coin
export function generateCoinFAQs(coinName: string, symbol: string): FAQ[] {
    return [
        {
            question: `${coinName} nedir?`,
            answer: `${coinName} (${symbol}), kripto para piyasasında işlem gören dijital bir varlıktır. Güncel fiyat ve piyasa bilgileri için sayfamızı takip edebilirsiniz.`,
        },
        {
            question: `${coinName} nasıl alınır?`,
            answer: `${coinName} satın almak için Paribu, BtcTurk veya Binance TR gibi Türk kripto para borsalarını kullanabilirsiniz. TL ile kolayca ${symbol} alabilirsiniz.`,
        },
        {
            question: `${coinName} yatırımı riskli mi?`,
            answer: 'Tüm kripto para yatırımları gibi, bu yatırım da piyasa volatilitesi nedeniyle risk taşımaktadır. Yatırım yapmadan önce kendi araştırmanızı yapmanız önerilir.',
        },
    ];
}
