import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';
import { searchCrypto } from '../utils/searchUtils';
import { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Search, ArrowRight, Home } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';

export function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { cryptos } = useMarket();
    const navigate = useNavigate();

    const [results, setResults] = useState<{
        exactMatch: any | null;
        bestMatch: any | null;
        suggestions: any[];
    }>({ exactMatch: null, bestMatch: null, suggestions: [] });

    useEffect(() => {
        if (query && cryptos.length > 0) {
            const searchResults = searchCrypto(query, cryptos);

            // If we have a very strong single match (exact or very close), logic might dictate auto-redirect,
            // but usually a search results page should show the results to avoid confusing behavior 
            // if the auto-redirect was wrong. 
            // However, the prompt asked for "as a result of a search, the according coin page should open".
            // This logic is primarily handled in the Header before navigating here.
            // If we are HERE, it means the Header wasn't confident enough or the user navigated here directly.

            setResults(searchResults);
        }
    }, [query, cryptos]);

    return (
        <div className="container py-12 min-h-[60vh]">
            <GlassCard className="max-w-2xl mx-auto p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-bg-tertiary rounded-full">
                        <Search className="w-8 h-8 text-neon-cyan" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-text-primary mb-2">
                    Arama Sonuçları: "{query}"
                </h1>

                {results.suggestions.length > 0 ? (
                    <div className="mt-8 text-left">
                        <p className="text-text-muted mb-4 text-center">
                            Aradığınızla eşleşen sonuçlar:
                        </p>
                        <div className="space-y-3">
                            {results.suggestions.map((coin) => (
                                <Link
                                    key={coin.id}
                                    to={`/coin/${coin.id}`}
                                    className="block group"
                                >
                                    <div className="flex items-center justify-between p-4 bg-bg-secondary hover:bg-bg-tertiary rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-all">
                                        <div className="flex items-center gap-4">
                                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <span className="block font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
                                                    {coin.name}
                                                </span>
                                                <span className="text-sm text-text-muted">
                                                    {coin.symbol.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-neon-cyan transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="text-text-secondary mb-8">
                            Maalesef "{query}" ile eşleşen bir sonuç bulamadık.
                            Yazım hatası yapmış olabilir misiniz?
                        </p>
                        <Link to="/">
                            <NeonButton variant="primary" className="mx-auto">
                                <Home className="w-4 h-4 mr-2" />
                                Ana Sayfaya Dön
                            </NeonButton>
                        </Link>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
