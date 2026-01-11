import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUp, ArrowDown } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Sparkline } from '../charts/Sparkline';
import { useNavigate } from 'react-router-dom';

export const CryptoTable: React.FC = () => {
    const { filteredCryptos, favorites, toggleFavorite, loading, error } = useMarket();
    const { formatPrice, formatLargeNumber, currency } = useCurrency();
    const navigate = useNavigate();

    // Ensure we have data to map
    const cryptosToDisplay = filteredCryptos || [];

    if (loading && cryptosToDisplay.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error && cryptosToDisplay.length === 0) {
        return (
            <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
                Veri yüklenirken bir hata oluştu: {error}
            </div>
        );
    }

    return (
        <div className="w-full bg-surface-card/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="px-4 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider w-12">#</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Kripto Para</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Fiyat</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">24s %</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">7g %</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell">Piyasa Değeri</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider hidden xl:table-cell">Hacim (24s)</th>
                            <th className="px-4 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell w-32">Son 7 Gün</th>
                            <th className="px-4 py-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-12">Favori</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence>
                            {cryptosToDisplay.map((coin) => (
                                <motion.tr
                                    key={coin.id}
                                    layoutId={coin.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => navigate(`/coin/${coin.id}`)}
                                >
                                    <td className="px-4 py-4 text-sm text-text-muted">
                                        {coin.market_cap_rank}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                                className="w-8 h-8 rounded-full"
                                                loading="lazy"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                                                    {coin.name}
                                                </span>
                                                <span className="text-xs text-text-muted uppercase">
                                                    {coin.symbol}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap">
                                        <div className="text-sm font-medium text-text-primary">
                                            {formatPrice(coin.current_price)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden sm:table-cell">
                                        <div className={`text-sm font-medium flex items-center justify-end gap-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {coin.price_change_percentage_24h >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden md:table-cell">
                                        <div className={`text-sm font-medium ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden lg:table-cell text-sm text-text-primary">
                                        {formatLargeNumber(coin.market_cap)}
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden xl:table-cell text-sm text-text-primary">
                                        {formatLargeNumber(coin.total_volume)}
                                    </td>
                                    <td className="px-4 py-4 hidden lg:table-cell">
                                        <div className="h-10 w-32 ml-auto">
                                            <Sparkline
                                                data={coin.sparkline_in_7d?.price || []}
                                                color={coin.price_change_percentage_7d_in_currency >= 0 ? '#22c55e' : '#ef4444'}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(coin.id);
                                            }}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <Star
                                                size={18}
                                                className={`${favorites.includes(coin.id) ? 'fill-yellow-500 text-yellow-500' : 'text-text-muted'}`}
                                            />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {cryptosToDisplay.length === 0 && !loading && (
                <div className="p-12 text-center text-text-muted">
                    Aradığınız kriterlere uygun sonuç bulunamadı.
                </div>
            )}
        </div>
    );
};
