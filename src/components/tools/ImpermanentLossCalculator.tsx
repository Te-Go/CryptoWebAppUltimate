import { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { Percent, AlertTriangle, ArrowRight } from 'lucide-react';

export function ImpermanentLossCalculator() {
    const [priceChangeA, setPriceChangeA] = useState<number>(0);
    const [priceChangeB, setPriceChangeB] = useState<number>(0);
    const [holdValue, setHoldValue] = useState<number>(1000);
    const [results, setResults] = useState<{
        lpValue: number;
        impermanentLoss: number;
        impermanentLossPercent: number;
    } | null>(null);

    const calculateIL = () => {
        // Assume 50/50 pool initially
        const initialValue = 1000;

        // Calculate price ratios based on percentage change input
        // ratio = current_price / initial_price
        const ratioA = 1 + (priceChangeA / 100);
        const ratioB = 1 + (priceChangeB / 100);

        // Value if HODLed (50% kept in A, 50% kept in B independently)
        const valueIfHeld = (initialValue * 0.5 * ratioA) + (initialValue * 0.5 * ratioB);

        // Loop constant product formula: x * y = k
        // New value of LP position = Initial_Value * sqrt(ratioA * ratioB)
        // This is a simplified derivation for 50/50 pools
        const valueInLP = initialValue * Math.sqrt(ratioA * ratioB);

        const ilValue = valueInLP - valueIfHeld;
        const ilPercent = (ilValue / valueIfHeld) * 100;

        setHoldValue(valueIfHeld);
        setResults({
            lpValue: valueInLP,
            impermanentLoss: ilValue,
            impermanentLossPercent: ilPercent
        });
    };

    // Auto-calculate on change
    useEffect(() => {
        calculateIL();
    }, [priceChangeA, priceChangeB]);

    return (
        <GlassCard className="p-6 relative overflow-hidden h-full flex flex-col">
            {/* Background Flair */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-blue/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-text-primary mb-2 font-display flex items-center gap-2">
                    <Percent className="w-5 h-5 text-neon-blue" />
                    Geçici Kayıp
                </h3>
                <p className="text-xs text-text-muted mb-6">
                    Likidite havuzuna (LP) eklediğiniz varlıkların fiyat değişimi durumunda HODL etmeye göre kaybını hesaplayın.
                </p>

                <div className="space-y-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <label className="text-text-secondary">Varlık A Fiyat Değişimi</label>
                                <span className={`font-mono ${priceChangeA >= 0 ? 'text-profit' : 'text-loss'}`}>
                                    {priceChangeA > 0 ? '+' : ''}{priceChangeA}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="-90"
                                max="500"
                                value={priceChangeA}
                                onChange={(e) => setPriceChangeA(Number(e.target.value))}
                                className="w-full appearance-none bg-white/10 h-1 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-blue [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <label className="text-text-secondary">Varlık B Fiyat Değişimi</label>
                                <span className={`font-mono ${priceChangeB >= 0 ? 'text-profit' : 'text-loss'}`}>
                                    {priceChangeB > 0 ? '+' : ''}{priceChangeB}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="-90"
                                max="500"
                                value={priceChangeB}
                                onChange={(e) => setPriceChangeB(Number(e.target.value))}
                                className="w-full appearance-none bg-white/10 h-1 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    {results && (
                        <div className="bg-bg-tertiary/50 rounded-xl p-4 border border-white/5 space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b border-border/10">
                                <span className="text-sm text-text-secondary">HODL Değeri:</span>
                                <span className="font-mono text-text-primary font-bold">${holdValue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-border/10">
                                <span className="text-sm text-text-secondary">LP Değeri:</span>
                                <span className="font-mono text-text-primary font-bold">${results.lpValue.toFixed(2)}</span>
                            </div>

                            <div className="pt-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-text-muted flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3 text-neon-yellow" />
                                        Geçici Kayıp:
                                    </span>
                                    <span className="font-mono text-loss font-bold">{results.impermanentLossPercent.toFixed(2)}%</span>
                                </div>
                                <div className="text-xs text-right text-text-muted">
                                    (${Math.abs(results.impermanentLoss).toFixed(2)} Kayıp)
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 mt-auto">
                        <NeonButton variant="secondary" className="w-full justify-center text-xs h-8">
                            Detaylı Analiz <ArrowRight className="w-3 h-3 ml-1" />
                        </NeonButton>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
