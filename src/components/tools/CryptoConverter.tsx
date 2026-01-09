import { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useCurrency, currencyOptions } from '../../context/CurrencyContext';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRightLeft, ChevronDown } from 'lucide-react';

export function CryptoConverter() {
    const { cryptos } = useMarket();
    const { rates } = useCurrency();

    // Convert top 20 cryptos to options
    const cryptoOptions = cryptos.slice(0, 20).map(c => ({
        id: c.id,
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        type: 'crypto' as const,
        priceInTRY: c.price,
        image: c.image
    }));

    // Convert fiat currencies to options
    const fiatOptions = currencyOptions.map(c => ({
        id: c.id,
        symbol: c.symbol,
        name: c.name,
        type: 'fiat' as const,
        priceInTRY: c.id === 'TRY' ? 1 : (c.id === 'USD' ? rates.TRY : rates.TRY / rates.EUR),
        image: `https://flagsapi.com/${c.flag === '🇹🇷' ? 'TR' : c.flag === '🇺🇸' ? 'US' : 'EU'}/flat/64.png`
    }));

    const [amount, setAmount] = useState<string>('1');
    const [fromId, setFromId] = useState<string>('bitcoin'); // Default Crypto
    const [toId, setToId] = useState<string>('TRY');         // Default Fiat

    // Determine current direction based on fromId type
    const isFromCrypto = cryptoOptions.some(c => c.id === fromId);

    // Get current assets
    const fromAsset = (isFromCrypto ? cryptoOptions.find(c => c.id === fromId) : fiatOptions.find(c => c.id === fromId))
        || (isFromCrypto ? cryptoOptions[0] : fiatOptions[0]);

    const toAsset = (isFromCrypto ? fiatOptions.find(c => c.id === toId) : cryptoOptions.find(c => c.id === toId))
        || (isFromCrypto ? fiatOptions[0] : cryptoOptions[0]);

    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        const val = parseFloat(amount);
        if (isNaN(val)) {
            setResult(0);
            return;
        }

        // Calculate value
        const fromValueInTRY = val * fromAsset.priceInTRY;
        const resultValue = fromValueInTRY / toAsset.priceInTRY;

        setResult(resultValue);
    }, [amount, fromId, toId, fromAsset, toAsset]);

    const handleSwap = () => {
        // Swap IDs
        const newFrom = toId;
        const newTo = fromId;
        setFromId(newFrom);
        setToId(newTo);
    };

    // Lists to display in dropdowns depend on direction
    const fromList = isFromCrypto ? cryptoOptions : fiatOptions;
    const toList = isFromCrypto ? fiatOptions : cryptoOptions;

    return (
        <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
                {/* From */}
                <div className="flex-1 w-full bg-bg-tertiary rounded-xl p-3 border border-white/5 focus-within:border-neon-cyan/50 transition-colors">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-text-muted">Miktar</span>
                        <span className="text-xs text-text-muted">
                            1 {fromAsset.symbol} ≈ {toAsset.symbol === 'TRY' ? '₺' : ''}
                            {(fromAsset.priceInTRY / toAsset.priceInTRY).toLocaleString(undefined, { maximumFractionDigits: 5 })} {toAsset.symbol}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-transparent text-xl font-bold text-text-primary focus:outline-none"
                        />
                        <div className="relative group shrink-0">
                            <select
                                value={fromId}
                                onChange={(e) => setFromId(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                                {fromList.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2 bg-bg-primary px-3 py-1.5 rounded-lg border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                {fromAsset.type === 'crypto' && <img src={fromAsset.image} className="w-5 h-5 rounded-full" alt="" />}
                                {fromAsset.type === 'fiat' && <img src={fromAsset.image} className="w-5 h-5 rounded-full" alt="" />}
                                <span className="font-semibold text-text-primary">{fromAsset.symbol}</span>
                                <ChevronDown className="w-4 h-4 text-text-muted" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <button
                    onClick={handleSwap}
                    className="p-3 rounded-full bg-bg-tertiary hover:bg-neon-cyan/20 text-text-secondary hover:text-neon-cyan transition-colors"
                >
                    <ArrowRightLeft className="w-5 h-5" />
                </button>

                {/* To */}
                <div className="flex-1 w-full bg-bg-tertiary rounded-xl p-3 border border-white/5">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-text-muted">Karşılık</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full bg-transparent text-xl font-bold text-text-primary truncate">
                            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                        </div>
                        <div className="relative group shrink-0">
                            <select
                                value={toId}
                                onChange={(e) => setToId(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                                {toList.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2 bg-bg-primary px-3 py-1.5 rounded-lg border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                {toAsset.type === 'crypto' && <img src={toAsset.image} className="w-5 h-5 rounded-full" alt="" />}
                                {toAsset.type === 'fiat' && <img src={toAsset.image} className="w-5 h-5 rounded-full" alt="" />}
                                <span className="font-semibold text-text-primary">{toAsset.symbol}</span>
                                <ChevronDown className="w-4 h-4 text-text-muted" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
