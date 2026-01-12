import { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';
import { GlassCard } from '../ui/GlassCard';
import { History, Calendar, Calculator, Share2, AlertCircle, ChevronDown } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';

export function TimeMachineCalculator() {
    const { cryptos } = useMarket();
    const { rates } = useCurrency();

    // Sort top coins first
    const sortedCryptos = [...cryptos].sort((a, b) => a.rank - b.rank);

    const [selectedCoinId, setSelectedCoinId] = useState<string>('bitcoin');
    const [investmentAmount, setInvestmentAmount] = useState<string>('1000');
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    const [result, setResult] = useState<{
        pastAmount: number;
        pastPrice: number;
        currentAmount: number;
        profit: number;
        roi: number;
    } | null>(null);

    const selectedCoin = sortedCryptos.find(c => c.id === selectedCoinId) || sortedCryptos[0];

    // Mock Historical Data Generator (MVP)
    // In production, this would fetch from an API like CoinGecko /coins/{id}/history
    const getHistoricalPrice = (coinId: string, year: number) => {
        // Multipliers to simulate market history roughly
        const historyMultipliers: Record<number, number> = {
            2025: 0.95, // Recent dip
            2024: 0.8,  // Start of year
            2023: 0.4,  // Bear market bottom
            2022: 0.6,  // Bear market start
            2021: 1.2,  // Bull run top
            2020: 0.2,  // Pre-bull
            2019: 0.15,
            2018: 0.3,  // Previous Bear
            2017: 0.05, // Previous Bull start
            2016: 0.02,
            2015: 0.01,
            2014: 0.005, // Ancient times
            2013: 0.002
        };

        // Add some noise per key to make it feel distinct
        const noise = (coinId.charCodeAt(0) % 10) / 100; // Deterministic pseudo-random
        const baseMultiplier = historyMultipliers[year] || 0.1;

        // Special cases for major coins to make them somewhat realistic for demo
        if (coinId === 'bitcoin') {
            if (year === 2023) return 660000; // ~660k TRY
            if (year === 2020) return 63000;   // ~63k TRY
        }

        const currentPriceInTRY = selectedCoin.price * rates.TRY;
        return currentPriceInTRY * (baseMultiplier + noise);
    };

    const calculateReturn = () => {
        const amount = parseFloat(investmentAmount.replace(',', '.'));
        if (isNaN(amount) || amount <= 0) return;

        const pastPrice = getHistoricalPrice(selectedCoinId, selectedYear);
        const coinCount = amount / pastPrice;

        // Ensure current price is in TRY
        const currentPriceInTRY = selectedCoin.price * rates.TRY;
        const currentVal = coinCount * currentPriceInTRY;

        const profitVal = currentVal - amount;
        const roiVal = (profitVal / amount) * 100;

        setResult({
            pastAmount: amount,
            pastPrice,
            currentAmount: currentVal,
            profit: profitVal,
            roi: roiVal
        });
    };

    useEffect(() => {
        setResult(null); // Reset on change
    }, [selectedCoinId, selectedYear, investmentAmount]);

    // Years option
    const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];

    return (
        <GlassCard className="p-6 relative overflow-hidden">
            {/* Background Flair */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-lg font-bold text-text-primary mb-6 font-display flex items-center gap-2">
                    <History className="w-5 h-5 text-neon-purple" />
                    Zaman Makinesi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-text-muted mb-1.5">Coin Seçin</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-bg-tertiary border border-border/10 rounded-xl px-4 py-3 text-text-primary appearance-none focus:border-neon-purple/50 outline-none"
                                    value={selectedCoinId}
                                    onChange={(e) => setSelectedCoinId(e.target.value)}
                                >
                                    {sortedCryptos.map(c => (
                                        <option key={c.id} value={c.id} className="text-black bg-white">{c.name} ({c.symbol.toUpperCase()})</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-text-muted mb-1.5">Yatırım Yılı</label>
                            <div className="grid grid-cols-3 gap-2">
                                {years.map(y => (
                                    <button
                                        key={y}
                                        onClick={() => setSelectedYear(y)}
                                        className={`py-2 rounded-lg text-sm font-semibold transition-all ${selectedYear === y ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-bg-tertiary text-text-secondary hover:bg-white/5'}`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-text-muted mb-1.5">Yatırım Tutarı (₺)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                    className="w-full bg-bg-tertiary border border-border/10 rounded-xl pl-10 pr-4 py-3 text-text-primary focus:border-neon-purple/50 outline-none font-mono"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">₺</span>
                            </div>
                        </div>

                        <NeonButton
                            variant="primary"
                            className="w-full justify-center mt-2 group"
                            onClick={calculateReturn}
                        >
                            <Calculator className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                            Hesapla & Gör
                        </NeonButton>
                    </div>

                    {/* Results Area */}
                    <div className="flex flex-col">
                        {!result ? (
                            <div className="flex-1 min-h-[200px] flex flex-col items-center justify-center text-center p-6 bg-bg-tertiary/50 rounded-2xl border border-white/5 border-dashed">
                                <Calendar className="w-12 h-12 text-neon-purple/30 mb-3" />
                                <p className="text-text-muted text-sm">
                                    Geçmişte bu yatırımı yapsaydınız bugün ne kadarınız olurdu?
                                </p>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col bg-bg-tertiary rounded-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
                                <div className={`p-6 text-center ${result.profit >= 0 ? 'bg-profit/10' : 'bg-loss/10'}`}>
                                    <p className="text-sm text-text-muted mb-1">Bugünkü Değer</p>
                                    <div className={`text-3xl font-bold mb-1 ${result.profit >= 0 ? 'text-profit' : 'text-loss'}`}>
                                        ₺{result.currentAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className={`text-sm font-semibold inline-flex items-center px-2 py-1 rounded-full ${result.profit >= 0 ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'}`}>
                                        {result.profit >= 0 ? '+' : ''}%{result.roi.toFixed(0)} ROI
                                    </div>
                                </div>

                                <div className="p-6 space-y-4 flex-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Yatırılan Tutar:</span>
                                        <span className="font-mono text-text-primary">₺{result.pastAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Geçmiş Fiyat ({selectedYear}):</span>
                                        <span className="font-mono text-text-muted">₺{result.pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Adet:</span>
                                        <span className="font-mono text-text-muted">{(result.pastAmount / result.pastPrice).toFixed(4)} {selectedCoin.symbol.toUpperCase()}</span>
                                    </div>

                                    <div className="pt-4 mt-auto">
                                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-neon-purple/20">
                                            <Share2 className="w-4 h-4" />
                                            Sonucu Paylaş
                                        </button>
                                        <p className="text-[10px] text-center text-text-muted mt-3 flex items-center justify-center gap-1 opacity-60">
                                            <AlertCircle className="w-3 h-3" />
                                            Simülasyon amaçlıdır. Tarihsel veriler değişebilir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
