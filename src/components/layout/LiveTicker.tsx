import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';

export function LiveTicker() {
    const { cryptos, stats } = useMarket();
    const { formatPrice, formatLargeNumber } = useCurrency();
    const topCryptos = cryptos.slice(0, 10);

    return (
        <div className="bg-bg-secondary border-b border-border overflow-hidden">
            <div className="ticker-scroll flex items-center gap-8 py-2 whitespace-nowrap">
                {/* Double the items for seamless loop */}
                {[...topCryptos, ...topCryptos].map((crypto, index) => (
                    <div
                        key={`${crypto.id}-${index}`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="w-5 h-5 rounded-full"
                        />
                        <span className="font-medium text-text-primary">{crypto.symbol}</span>
                        <span className="text-text-secondary">{formatPrice(crypto.price)}</span>
                        <span
                            className={`flex items-center gap-0.5 ${crypto.change24h >= 0 ? 'text-profit' : 'text-loss'
                                }`}
                        >
                            {crypto.change24h >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                            ) : (
                                <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(crypto.change24h).toFixed(2)}%
                        </span>
                    </div>
                ))}

                {/* Market Stats */}
                <div className="flex items-center gap-2 px-4 border-l border-border">
                    <span className="text-text-muted text-xs">Piyasa Değeri:</span>
                    <span className="text-text-primary font-medium text-sm">
                        {formatLargeNumber(stats.totalMarketCap)}
                    </span>
                    <span
                        className={`text-xs ${stats.marketCapChange24h >= 0 ? 'text-profit' : 'text-loss'
                            }`}
                    >
                        {stats.marketCapChange24h >= 0 ? '+' : ''}
                        {stats.marketCapChange24h.toFixed(2)}%
                    </span>
                </div>

                <div className="flex items-center gap-2 px-4 border-l border-border">
                    <span className="text-text-muted text-xs">BTC Hakimiyeti:</span>
                    <span className="text-neon-cyan font-medium text-sm">
                        {stats.btcDominance.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
