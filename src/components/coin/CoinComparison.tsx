import { mockCryptos, type Crypto } from '../../data/mockCryptos';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CoinComparison({ coin }: { coin: Crypto }) {
    // Find a competitor based on category (excluding self)
    const competitor = mockCryptos.find(c =>
        c.id !== coin.id &&
        c.category.some(cat => coin.category.includes(cat)) &&
        Math.abs(c.rank - coin.rank) < 20 // Find someone close in rank
    ) || mockCryptos.find(c => c.id !== coin.id); // Fallback

    if (!competitor) return null;

    return (
        <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6 font-display flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-neon-blue" />
                Karşılaştırma: {coin.symbol} vs {competitor.symbol}
            </h2>

            <div className="grid grid-cols-3 gap-4 items-center">
                {/* Left Coin */}
                <div className="text-center">
                    <img src={coin.image} alt={coin.name} className="w-12 h-12 mx-auto mb-2 rounded-full" />
                    <p className="font-bold text-white">{coin.symbol}</p>
                    <p className="text-sm text-text-muted">Rank #{coin.rank}</p>
                </div>

                {/* Comparison Stats */}
                <div className="space-y-4">
                    {/* Market Cap */}
                    <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">Piyasa Değeri</p>
                        <div className="flex justify-center items-center gap-2 text-sm font-bold">
                            <span className={coin.marketCap > competitor.marketCap ? "text-profit" : "text-text-secondary"}>
                                ₺{(coin.marketCap / 1e9).toFixed(1)}B
                            </span>
                            <span className="text-text-muted">vs</span>
                            <span className={competitor.marketCap > coin.marketCap ? "text-profit" : "text-text-secondary"}>
                                ₺{(competitor.marketCap / 1e9).toFixed(1)}B
                            </span>
                        </div>
                    </div>
                    {/* 24h Change */}
                    <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">24s Değişim</p>
                        <div className="flex justify-center items-center gap-2 text-sm font-bold">
                            <span className={coin.change24h >= 0 ? "text-profit" : "text-loss"}>
                                {coin.change24h}%
                            </span>
                            <span className="text-text-muted">vs</span>
                            <span className={competitor.change24h >= 0 ? "text-profit" : "text-loss"}>
                                {competitor.change24h}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Coin */}
                <div className="text-center">
                    <Link to={`/coin/${competitor.id}`} className="group">
                        <img src={competitor.image} alt={competitor.name} className="w-12 h-12 mx-auto mb-2 rounded-full group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-white group-hover:text-neon-cyan transition-colors">{competitor.symbol}</p>
                        <p className="text-sm text-text-muted">Rank #{competitor.rank}</p>
                    </Link>
                </div>
            </div>

            <div className="mt-6 text-center">
                <Link to="/markets" className="text-sm text-neon-blue hover:text-white transition-colors">
                    Tüm Kripto Paraları Karşılaştır &rarr;
                </Link>
            </div>
        </GlassCard>
    );
}
