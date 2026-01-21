import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { AddHoldingModal } from '../components/portfolio/AddHoldingModal';
import { usePortfolio } from '../context/PortfolioContext';
import { useMarket } from '../context/MarketContext';
import { useCurrency } from '../context/CurrencyContext';

import { SEOHead } from '../components/seo/SEOHead';
import { PortfolioExplanation } from '../components/portfolio/PortfolioExplanation';

export function PortfolioPage() {
    const { holdings, removeHolding } = usePortfolio();
    // ... stats calculation ...
    const { cryptos } = useMarket();
    const { formatPrice, formatLargeNumber, currency, setCurrency } = useCurrency();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate portfolio stats
    const portfolioStats = holdings.reduce(
        (acc, holding) => {
            const coin = cryptos.find((c) => c.id === holding.coinId);
            if (coin) {
                const currentValue = holding.quantity * coin.price;
                const costBasis = holding.quantity * holding.buyPrice;
                acc.totalValue += currentValue;
                acc.totalCost += costBasis;
            }
            return acc;
        },
        { totalValue: 0, totalCost: 0 }
    );

    const pnl = portfolioStats.totalValue - portfolioStats.totalCost;
    const pnlPercent = portfolioStats.totalCost > 0
        ? ((pnl / portfolioStats.totalCost) * 100)
        : 0;

    // Schema Markup for Software Application (Tool)
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Kripto Portföy Takip",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "TRY"
        },
        "description": "Ücretsiz ve gizlilik odaklı kripto para portföy takip aracı. Bitcoin, Ethereum ve altcoin yatırımlarınızı anlık takip edin."
    };

    return (
        <div className="min-h-screen bg-bg-primary pb-20 lg:pb-0">
            <SEOHead
                title="Ücretsiz Kripto Portföy Takip Aracı | Portföyüm"
                description="Yatırımlarınızı güvenle takip edin. Bitcoin, Ethereum ve altcoin portföyünüzü tek ekrandan yönetin. Üye olmadan, tamamen ücretsiz."
                keywords={['kripto portföy', 'portföy takip', 'coin takip', 'bitcoin cüzdan', 'kar zarar hesaplama']}
                canonicalUrl="/portfolio"
            />
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>

            <Header />

            <main className="container py-6 space-y-6">
                {/* Page Title & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-text-primary font-display">
                        Portföyüm
                    </h1>

                    <div className="flex items-center gap-3">
                        {/* Currency Toggle */}
                        <div className="bg-bg-tertiary p-1 rounded-lg border border-border flex items-center">
                            {(['TRY', 'USD', 'EUR'] as const).map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => setCurrency(curr)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${currency === curr
                                        ? 'bg-bg-card-hover text-neon-cyan shadow-sm'
                                        : 'text-text-muted hover:text-text-secondary'
                                        }`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>

                        <NeonButton
                            variant="primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-4 h-4" />
                            Varlık Ekle
                        </NeonButton>
                    </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-lg p-3 flex items-start gap-3">
                    <div className="min-w-fit mt-0.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-neon-blue"
                        >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                        <strong className="text-neon-blue">Gizlilik Garantisi:</strong> Portföy verileriniz sadece sizin cihazınızda (tarayıcı belleği) saklanır.
                        Sunucularımıza herhangi bir veri gönderilmez veya kaydedilmez.
                    </p>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GlassCard className="p-5" hover={false}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-neon-cyan/20">
                                <Wallet className="w-5 h-5 text-neon-cyan" />
                            </div>
                            <span className="text-text-muted text-sm">Toplam Değer</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary font-display">
                            {formatLargeNumber(portfolioStats.totalValue)}
                        </p>
                    </GlassCard>

                    <GlassCard className="p-5" hover={false}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${pnl >= 0 ? 'bg-profit/20' : 'bg-loss/20'}`}>
                                {pnl >= 0 ? (
                                    <TrendingUp className="w-5 h-5 text-profit" />
                                ) : (
                                    <TrendingDown className="w-5 h-5 text-loss" />
                                )}
                            </div>
                            <span className="text-text-muted text-sm">Kar/Zarar</span>
                        </div>
                        <p className={`text-2xl font-bold font-display ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {pnl >= 0 ? '+' : ''}{formatPrice(Math.abs(pnl))}
                        </p>
                        <p className={`text-sm ${pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                        </p>
                    </GlassCard>

                    <GlassCard className="p-5" hover={false}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-accent-gold/20">
                                <PieChart className="w-5 h-5 text-accent-gold" />
                            </div>
                            <span className="text-text-muted text-sm">Varlık Sayısı</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary font-display">
                            {holdings.length}
                        </p>
                    </GlassCard>
                </div>

                {/* Holdings List */}
                {holdings.length === 0 ? (
                    <GlassCard className="p-8 text-center" hover={false}>
                        <Wallet className="w-12 h-12 text-text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                            Portföyünüz Boş
                        </h3>
                        <p className="text-text-secondary mb-4">
                            Kripto varlıklarınızı ekleyerek portföyünüzü takip edin.
                        </p>
                        <NeonButton
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-4 h-4" />
                            İlk Varlığınızı Ekleyin
                        </NeonButton>
                    </GlassCard>
                ) : (
                    <GlassCard className="overflow-hidden" hover={false}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left text-text-muted text-sm font-medium p-4">
                                            Varlık
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            Miktar
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            Alış Fiyatı
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            Güncel Fiyat
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            Değer
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            K/Z (%)
                                        </th>
                                        <th className="text-right text-text-muted text-sm font-medium p-4">
                                            Net K/Z
                                        </th>
                                        <th className="w-12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holdings.map((holding, index) => {
                                        const coin = cryptos.find((c) => c.id === holding.coinId);
                                        if (!coin) return null;

                                        const currentValue = holding.quantity * coin.price;
                                        const costBasis = holding.quantity * holding.buyPrice;
                                        const holdingPnl = currentValue - costBasis;
                                        const holdingPnlPercent = costBasis > 0
                                            ? ((holdingPnl / costBasis) * 100)
                                            : 0;

                                        return (
                                            <motion.tr
                                                key={holding.coinId}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-border/50 hover:bg-bg-secondary/30"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={coin.image}
                                                            alt={coin.name}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-text-primary">
                                                                {coin.name}
                                                            </p>
                                                            <p className="text-sm text-text-muted">
                                                                {coin.symbol}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right text-text-primary">
                                                    {holding.quantity.toLocaleString('tr-TR', {
                                                        maximumFractionDigits: 8,
                                                    })}
                                                </td>
                                                <td className="p-4 text-right text-text-secondary">
                                                    {formatPrice(holding.buyPrice)}
                                                </td>
                                                <td className="p-4 text-right text-text-primary">
                                                    {formatPrice(coin.price)}
                                                </td>
                                                <td className="p-4 text-right font-medium text-text-primary">
                                                    {formatPrice(currentValue)}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={holdingPnl >= 0 ? 'text-profit' : 'text-loss'}>
                                                        {holdingPnl >= 0 ? '+' : ''}
                                                        {holdingPnlPercent.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`font-medium ${holdingPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                                                        {holdingPnl >= 0 ? '+' : ''}
                                                        {formatPrice(Math.abs(holdingPnl))}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => removeHolding(holding.coinId)}
                                                        className="p-2 text-text-muted hover:text-loss transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}

                                    {/* Total Row */}
                                    <tr className="bg-bg-tertiary/30 font-bold border-t-2 border-border">
                                        <td className="p-4 text-text-primary">TOPLAM</td>
                                        <td className="p-4"></td> {/* Quantity */}
                                        <td className="p-4"></td> {/* Buy Price */}
                                        <td className="p-4"></td> {/* Current Price */}
                                        <td className="p-4 text-right text-text-primary">
                                            {formatPrice(portfolioStats.totalValue)}
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={pnl >= 0 ? 'text-profit' : 'text-loss'}>
                                                {pnl >= 0 ? '+' : ''}
                                                {pnlPercent.toFixed(2)}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={pnl >= 0 ? 'text-profit' : 'text-loss'}>
                                                {pnl >= 0 ? '+' : ''}
                                                {formatPrice(Math.abs(pnl))}
                                            </span>
                                        </td>
                                        <td className="p-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                )}


                {/* SEO Content */}
                <PortfolioExplanation />
            </main>

            <BottomNav />
            <AddHoldingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div >
    );
}
