import { Home, BarChart2, Wallet, Star, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
    const location = useLocation();

    const navItems = [
        { href: '/', icon: Home, label: 'Ana Sayfa' },
        { href: '/markets', icon: BarChart2, label: 'Piyasalar' },
        { href: '/portfolio', icon: Wallet, label: 'Portföy' },
        { href: '/favorites', icon: Star, label: 'Favoriler' },
        { href: '/search', icon: Search, label: 'Arama' },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-lg border-t border-border">
            <div className="flex items-center justify-around h-16 px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                transition-all duration-200
                ${isActive
                                    ? 'text-neon-cyan'
                                    : 'text-text-muted hover:text-text-secondary'
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]' : ''}`} />
                            <span className="text-xs font-medium">{item.label}</span>
                            {isActive && (
                                <div className="absolute -bottom-0 w-12 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
