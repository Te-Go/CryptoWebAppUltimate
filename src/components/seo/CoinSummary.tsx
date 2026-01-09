import type { Crypto } from '../../data/mockCryptos';
import { useCurrency } from '../../context/CurrencyContext';

interface CoinSummaryProps {
    coin: Crypto;
}

/**
 * AI/GEO-optimized text summary for coin pages
 * Provides structured, readable text that AI systems and Google can extract
 */
export function CoinSummary({ coin }: CoinSummaryProps) {
    const { formatPrice, formatLargeNumber } = useCurrency();
    const isPositive = coin.change24h >= 0;
    const changeDirection = isPositive ? 'yükseldi' : 'düştü';

    // Current date in Turkish
    const today = new Date().toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="bg-bg-tertiary/50 rounded-lg p-4 mb-4 border border-border/30">
            <h2 className="sr-only">{coin.name} Özet Bilgiler</h2>

            {/* Main summary paragraph - optimized for AI extraction */}
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
                <strong>{coin.name} ({coin.symbol})</strong> {today} itibarıyla{' '}
                <strong>{formatPrice(coin.price)}</strong> seviyesinde işlem görmektedir.
                Son 24 saatte fiyat %{Math.abs(coin.change24h).toFixed(2)} {changeDirection}.
                Piyasa değeri <strong>{formatLargeNumber(coin.marketCap)}</strong> olan {coin.name},
                kripto para piyasasında <strong>#{coin.rank}</strong> sırada yer almaktadır.
            </p>

            {/* Quick facts list */}
            <ul className="text-xs text-text-muted space-y-1">
                <li>📊 24 Saatlik İşlem Hacmi: {formatLargeNumber(coin.volume24h)}</li>
                <li>💰 Dolaşımdaki Arz: {coin.circulatingSupply.toLocaleString('tr-TR')} {coin.symbol}</li>
                <li>📈 7 Günlük Değişim: %{coin.change7d?.toFixed(2) || '0.00'}</li>
                <li>📅 Son Güncelleme: {today}</li>
            </ul>
        </div>
    );
}
