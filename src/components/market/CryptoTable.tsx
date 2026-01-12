import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Sparkline } from '../charts/Sparkline';
import { useNavigate } from 'react-router-dom';

const INITIAL_DISPLAY_COUNT = 30;
const LOAD_MORE_INCREMENT = 50;

export const CryptoTable: React.FC = () => {
    const { filteredCryptos, favorites, toggleFavorite, isLoading } = useMarket();
    const { formatPrice, formatLargeNumber } = useCurrency();
    const navigate = useNavigate();

    // Pagination state
    const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

    // Ensure we have data to map
    const cryptosToDisplay = filteredCryptos || [];
    const displayedCryptos = cryptosToDisplay.slice(0, visibleCount);
    const remainingCount = cryptosToDisplay.length - visibleCount;
    const hasMore = remainingCount > 0;

    // Load more handler
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + LOAD_MORE_INCREMENT);
    };

    if (isLoading && cryptosToDisplay.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden">
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
                            {displayedCryptos.map((coin) => (
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
                                        {coin.rank}
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
                                            {formatPrice(coin.price)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden sm:table-cell">
                                        <div className={`text-sm font-medium flex items-center justify-end gap-1 ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {coin.change24h >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                            {Math.abs(coin.change24h).toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden md:table-cell">
                                        <div className={`text-sm font-medium ${coin.change7d >= 0 ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {coin.change7d?.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden lg:table-cell text-sm text-text-primary">
                                        {formatLargeNumber(coin.marketCap)}
                                    </td>
                                    <td className="px-4 py-4 text-right whitespace-nowrap hidden xl:table-cell text-sm text-text-primary">
                                        {formatLargeNumber(coin.volume24h)}
                                    </td>
                                    <td className="px-4 py-4 hidden lg:table-cell">
                                        <div className="h-10 w-32 ml-auto">
                                            <Sparkline
                                                data={coin.sparkline || []}
                                                color={coin.change7d >= 0 ? '#22c55e' : '#ef4444'}
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

            {/* Load More Button */}
            {hasMore && (
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLoadMore}
                        className="w-full py-3 px-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/30 hover:border-primary/50 rounded-lg text-primary font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>Daha Fazla Göster</span>
                        <span className="text-sm text-text-muted">({remainingCount} kalan)</span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </div>
            )}

            {cryptosToDisplay.length === 0 && !isLoading && (
                <div className="p-12 text-center text-text-muted">
                    Aradığınız kriterlere uygun sonuç bulunamadı.
                </div>
            )}
        </div>
    );
};
