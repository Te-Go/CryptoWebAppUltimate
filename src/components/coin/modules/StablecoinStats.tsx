import type { Crypto } from '../../../data/mockCryptos';
import { GlassCard } from '../../ui/GlassCard';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function StablecoinStats({ coin }: { coin: Crypto }) {
    // Stablecoin-specific metrics
    const pegTarget = 1.00; // USD peg target
    const currentPeg = coin.price / 36.5; // Approximate USD value (mock TRY rate)
    const pegDeviation = Math.abs(currentPeg - pegTarget);
    const pegHealth = pegDeviation < 0.01 ? 'healthy' : pegDeviation < 0.05 ? 'warning' : 'danger';

    const backingPercent = coin.name.includes('USDT') ? 100 :
        coin.name.includes('USDC') ? 100 : 95;

    return (
        <GlassCard className="p-6 border-neon-green/30">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                Stablecoin Güvenliği
            </h3>

            {/* Peg Health Indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">Dolar Paritesi</span>
                    <div className="flex items-center gap-2">
                        {pegHealth === 'healthy' && (
                            <span className="flex items-center gap-1 text-profit text-sm font-bold">
                                <CheckCircle className="w-4 h-4" />
                                {currentPeg.toFixed(4)} USD
                            </span>
                        )}
                        {pegHealth === 'warning' && (
                            <span className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                                <AlertTriangle className="w-4 h-4" />
                                {currentPeg.toFixed(4)} USD
                            </span>
                        )}
                        {pegHealth === 'danger' && (
                            <span className="flex items-center gap-1 text-loss text-sm font-bold">
                                <AlertTriangle className="w-4 h-4" />
                                De-peg Riski!
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-full bg-bg-secondary h-3 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${pegHealth === 'healthy' ? 'bg-profit' :
                                pegHealth === 'warning' ? 'bg-amber-400' : 'bg-loss'
                            }`}
                        style={{ width: `${Math.min(100, 100 - pegDeviation * 100)}%` }}
                    />
                </div>
            </div>

            {/* Backing Reserves */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-text-muted mb-1">Teminat Oranı</p>
                    <p className="text-xl font-bold text-neon-green">%{backingPercent}</p>
                    <p className="text-xs text-text-muted mt-1">Tam Teminatlı</p>
                </div>
                <div className="p-3 bg-bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-text-muted mb-1">Destekleyen Varlık</p>
                    <p className="text-sm font-bold text-text-primary">USD Rezervi</p>
                    <p className="text-xs text-text-muted mt-1">+ Hazine Bonosu</p>
                </div>
            </div>

            {/* Warning for non-USDT/USDC */}
            {backingPercent < 100 && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-xs text-amber-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Bu stablecoin algoritmik veya kısmi teminatlı olabilir.
                    </p>
                </div>
            )}
        </GlassCard>
    );
}
