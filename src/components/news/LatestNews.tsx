import { GlassCard } from '../ui/GlassCard';
import { mockNews, NewsItem } from '../../data/mockNews';
import { Clock, ExternalLink } from 'lucide-react';

export function LatestNews({ className = '' }: { className?: string }) {
    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary font-display">
                    En Son Kripto Haberleri ve Yorumları
                </h2>
                <button className="text-sm text-neon-cyan hover:text-neon-blue transition-colors font-medium">
                    Tüm Haberler
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockNews.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button className="px-6 py-2 bg-bg-tertiary hover:bg-bg-tertiary/80 text-text-secondary rounded-lg text-sm font-medium transition-colors">
                    See More News
                </button>
            </div>
        </div>
    );
}

function NewsCard({ news }: { news: NewsItem }) {
    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {news.coinSymbol && (
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-bg-primary/90 backdrop-blur-sm rounded-lg text-xs font-bold border border-white/5">
                        <img
                            src={`https://ui-avatars.com/api/?name=${news.coinSymbol}&background=random&color=fff&rounded=true&bold=true`}
                            alt={news.coinSymbol}
                            className="w-4 h-4 rounded-full"
                        />
                        <span className="text-text-primary">{news.coinSymbol}</span>
                        {news.coinChange && (
                            <span className={news.coinChange >= 0 ? 'text-profit' : 'text-loss'}>
                                {news.coinChange >= 0 ? '+' : ''}{news.coinChange}%
                            </span>
                        )}
                    </div>
                )}
            </div>

            <h3 className="text-base font-bold text-text-primary mb-2 line-clamp-3 group-hover:text-neon-cyan transition-colors">
                {news.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="font-medium text-text-secondary">{news.source}</span>
                <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {news.time}
                </span>
            </div>
        </div>
    );
}
