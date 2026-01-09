import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronUp, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useTimeframe } from '../../context/TimeframeContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Sparkline } from '../charts/Sparkline';
import { getChangeByTimeframe, type Crypto } from '../../data/mockCryptos';

type SortField = 'rank' | 'name' | 'price' | 'change' | 'marketCap' | 'volume24h';
type SortDirection = 'asc' | 'desc';

function ChangeCell({ value }: { value: number }) {
    const isPositive = value >= 0;
    return (
        <span
            className={`inline-flex items-center gap-1 ${isPositive ? 'text-profit' : 'text-loss'
                }`}
        >
            {isPositive ? (
                <TrendingUp className="w-3 h-3" />
            ) : (
                <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(value).toFixed(2)}%
        </span>
    );
}

function SortHeader({
    label,
    field,
    currentSort,
    currentDirection,
    onSort,
    className = '',
}: {
    label: string;
    field: SortField;
    currentSort: SortField;
    currentDirection: SortDirection;
    onSort: (field: SortField) => void;
    className?: string;
}) {
    const isActive = currentSort === field;

    return (
        <th
            className={`cursor-pointer select-none hover:text-text-primary transition-colors ${className}`}
            onClick={() => onSort(field)}
        >
            <div className="flex items-center gap-1">
                {label}
                {isActive && (
                    currentDirection === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                    ) : (
                        <ChevronDown className="w-3 h-3" />
                    )
                )}
            </div>
        </th>
    );
}

// Mobile Card Component
function CryptoCard({ crypto, isFavorite, onToggleFavorite, changeValue, formattedPrice, formattedMarketCap, formattedVolume }: {
    crypto: Crypto;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    changeValue: number;
    formattedPrice: string;
    formattedMarketCap: string;
    formattedVolume: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mobile-card"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleFavorite();
                        }}
                        className="touch-manipulation"
                    >
                        <Star
                            className={`w-4 h-4 ${isFavorite ? 'fill-accent-gold text-accent-gold' : 'text-text-muted'
                                }`}
                        />
                    </button>
                    <span className="text-text-muted text-sm w-6">#{crypto.rank}</span>
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="font-semibold text-text-primary">{crypto.name}</p>
                        <p className="text-sm text-text-muted">{crypto.symbol}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-text-primary">{formattedPrice}</p>
                    <ChangeCell value={changeValue} />
                </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                <div>
                    <p className="text-xs text-text-muted">Piyasa Değeri</p>
                    <p className="text-sm font-medium text-text-secondary">
                        {formattedMarketCap}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-text-muted">24s Hacim</p>
                    <p className="text-sm font-medium text-text-secondary">
                        {formattedVolume}
                    </p>
                </div>
                <Sparkline data={crypto.sparkline} positive={changeValue >= 0} />
            </div>
        </motion.div>
    );
}

export function CryptoTable() {
    const { filteredCryptos, favorites, toggleFavorite } = useMarket();
    const { timeframe } = useTimeframe();
    const { formatPrice, formatLargeNumber } = useCurrency();
    const [sortField, setSortField] = useState<SortField>('rank');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection(field === 'rank' ? 'asc' : 'desc');
        }
    };

    const sortedCryptos = [...filteredCryptos].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        switch (sortField) {
            case 'rank':
                return (a.rank - b.rank) * direction;
            case 'name':
                return a.name.localeCompare(b.name) * direction;
            case 'price':
                return (a.price - b.price) * direction;
            case 'change':
                return (getChangeByTimeframe(a, timeframe) - getChangeByTimeframe(b, timeframe)) * direction;
            case 'marketCap':
                return (a.marketCap - b.marketCap) * direction;
            case 'volume24h':
                return (a.volume24h - b.volume24h) * direction;
            default:
                return 0;
        }
    });

    // Get the label for the timeframe column
    const getTimeframeLabel = () => {
        switch (timeframe) {
            case '1h': return '1s';
            case '24h': return '24s';
            case '7d': return '7g';
            case '30d': return '30g';
            case '1y': return '1y';
            default: return '24s';
        }
    };


    return (
        <>
            {/* Mobile View */}
            <div className="md:hidden space-y-3">
                {sortedCryptos.map((crypto) => (
                    <Link key={crypto.id} to={`/coin/${crypto.id}`}>
                        <CryptoCard
                            crypto={crypto}
                            isFavorite={favorites.includes(crypto.id)}
                            onToggleFavorite={() => toggleFavorite(crypto.id)}
                            changeValue={getChangeByTimeframe(crypto, timeframe)}
                            formattedPrice={formatPrice(crypto.price)}
                            formattedMarketCap={formatLargeNumber(crypto.marketCap)}
                            formattedVolume={formatLargeNumber(crypto.volume24h)}
                        />
                    </Link>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-bg-card/50">
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th className="w-12"></th>
                            <SortHeader
                                label="#"
                                field="rank"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                                className="w-12"
                            />
                            <SortHeader
                                label="İsim"
                                field="name"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                            <SortHeader
                                label="Fiyat"
                                field="price"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                                className="text-right"
                            />
                            <SortHeader
                                label={`Değişim (${getTimeframeLabel()})`}
                                field="change"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                                className="text-right"
                            />
                            <SortHeader
                                label="Piyasa Değeri"
                                field="marketCap"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                                className="text-right"
                            />
                            <SortHeader
                                label="Hacim (24s)"
                                field="volume24h"
                                currentSort={sortField}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                                className="text-right"
                            />
                            <th className="text-right">Son 7 Gün</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCryptos.map((crypto, index) => {
                            const isFavorite = favorites.includes(crypto.id);

                            return (
                                <motion.tr
                                    key={crypto.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.02 }}
                                >
                                    <td>
                                        <button
                                            onClick={() => toggleFavorite(crypto.id)}
                                            className="p-1 hover:scale-110 transition-transform"
                                        >
                                            <Star
                                                className={`w-4 h-4 ${isFavorite
                                                    ? 'fill-accent-gold text-accent-gold'
                                                    : 'text-text-muted hover:text-accent-gold'
                                                    }`}
                                            />
                                        </button>
                                    </td>
                                    <td className="text-text-muted">{crypto.rank}</td>
                                    <td>
                                        <Link
                                            to={`/coin/${crypto.id}`}
                                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                                        >
                                            <img
                                                src={crypto.image}
                                                alt={crypto.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium text-text-primary">{crypto.name}</p>
                                                <p className="text-sm text-text-muted">{crypto.symbol}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="text-right font-medium text-text-primary">
                                        {formatPrice(crypto.price)}
                                    </td>
                                    <td className="text-right">
                                        <ChangeCell value={getChangeByTimeframe(crypto, timeframe)} />
                                    </td>
                                    <td className="text-right text-text-secondary">
                                        {formatLargeNumber(crypto.marketCap)}
                                    </td>
                                    <td className="text-right text-text-secondary">
                                        {formatLargeNumber(crypto.volume24h)}
                                    </td>
                                    <td className="text-right">
                                        <div className="flex justify-end">
                                            <Sparkline
                                                data={crypto.sparkline}
                                                positive={crypto.change7d >= 0}
                                            />
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
