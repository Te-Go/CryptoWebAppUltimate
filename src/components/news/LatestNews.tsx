import { mockNews } from '../../data/mockNews';
import type { NewsItem } from '../../data/mockNews';
import { Clock } from 'lucide-react';

export function LatestNews({ className = '' }: { className?: string }) {
    return (
        <section className={`mt-8 mb-8 ${className}`}>
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-primary font-display">
                        En Son Kripto Haberleri ve Yorumları
                    </h2>
                    <button className="text-sm text-neon-cyan hover:text-neon-blue transition-colors font-medium">
                        Tüm Haberler →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockNews.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border border-primary/30 hover:border-primary/50 text-primary rounded-lg text-sm font-medium transition-all duration-300">
                        Daha Fazla Haber Göster
                    </button>
                </div>
            </div>
        </section>
    );
}

function NewsCard({ news }: { news: NewsItem }) {
    return (
        <div className="glass-card p-4 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
            <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/600x400/1a1a2e/00d9ff?text=${encodeURIComponent(news.category || 'Kripto Haber')}`;
                    }}
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

            <h3 className="text-sm font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">
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
