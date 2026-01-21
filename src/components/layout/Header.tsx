import { motion } from 'framer-motion';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { ThemeToggle } from './ThemeToggle';
import { searchCrypto } from '../../utils/searchUtils';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    // Use local state for immediate input handling, but also sync with context search query if needed
    // However, for a navigation search bar, we usually want local state.
    const [localQuery, setLocalQuery] = useState('');
    const { cryptos, isStale } = useMarket();
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navLinks = [
        { href: '/', label: 'Piyasalar' },
        { href: '/categories', label: 'Kategoriler' },
        { href: '/borsalar', label: 'Borsalar' },
        { href: '/egitim', label: 'Eğitim' },
        { href: '/haberler', label: 'Haberler' },
        { href: '/portfolio', label: 'Portföyüm' },
    ];

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setLocalQuery(query);

        if (query.length > 1) {
            const { suggestions: matches } = searchCrypto(query, cryptos);
            setSuggestions(matches.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle search submission (Enter key or button click)
    const handleSearchSubmit = () => {
        if (!localQuery.trim()) return;

        const { exactMatch, bestMatch } = searchCrypto(localQuery, cryptos);

        // If exact match found, go directly
        if (exactMatch) {
            navigate(`/coin/${exactMatch.id}`);
            setShowSuggestions(false);
            setLocalQuery('');
            setIsMobileSearchOpen(false);
            return;
        }

        // If best match has very high similarity (fuzzy), go there
        // This logic is implicitly handled in searchCrypto's filtering, 
        // but we might want to be safer and show suggestions if unsure.
        // For now, if we have a best match, we'll suggest it in the results page
        // unless it's SUPER close.

        if (bestMatch && suggestions.length === 1) {
            // If only one good suggestion, assume it's the one
            navigate(`/coin/${bestMatch.id}`);
            setShowSuggestions(false);
            setLocalQuery('');
            setIsMobileSearchOpen(false);
            return;
        }

        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(localQuery)}`);
        setShowSuggestions(false);
        setIsMobileSearchOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                // Delay hiding to allow clicking on suggestion items
                setTimeout(() => setShowSuggestions(false), 200);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/80 border-b border-border">
            {/* Stale Data Indicator */}
            {isStale && (
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center">
                    <span className="text-amber-400 text-xs font-medium">
                        ⚠️ Veriler güncel olmayabilir (önbellek kullanılıyor)
                    </span>
                </div>
            )}
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Kripto Paralar"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="hidden sm:inline text-lg font-bold text-text-primary font-display">
                            Kripto Paralar
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Search Bar - Expanded on desktop */}
                        <div className="relative group" ref={searchInputRef}>
                            <input
                                type="text"
                                placeholder="Coin ara..."
                                value={localQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                className="w-64 bg-bg-tertiary border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-neon-cyan/50 transition-all text-text-primary placeholder:text-text-muted"
                            />
                            <button
                                onClick={handleSearchSubmit}
                                className="absolute right-3 top-2.5 text-text-muted hover:text-neon-cyan transition-colors"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-bg-secondary border border-border rounded-xl shadow-xl overflow-hidden animate-fade-in-up">
                                    {suggestions.map((coin) => (
                                        <div
                                            key={coin.id}
                                            onClick={() => {
                                                navigate(`/coin/${coin.id}`);
                                                setLocalQuery('');
                                                setShowSuggestions(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary cursor-pointer transition-colors border-b border-border/50 last:border-0"
                                        >
                                            <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                            <div className="text-sm">
                                                <div className="text-text-primary font-medium">{coin.name}</div>
                                                <div className="text-text-muted text-xs">{coin.symbol.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <ThemeToggle />

                        <Link to="/borsalar">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-bg-primary font-semibold text-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-shadow"
                            >
                                Borsaları Karşılaştır
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button & Search */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="p-2 text-text-secondary hover:text-neon-cyan transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-text-secondary hover:text-neon-cyan transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {/* Mobile Search Bar */}
                {isMobileSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Kripto ara..."
                                value={localQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                className="
                    w-full px-4 py-3 pl-10
                    bg-bg-secondary border border-border rounded-xl
                    text-text-primary placeholder:text-text-muted
                    focus:outline-none focus:border-neon-cyan/50
                "
                                autoFocus
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <button
                                onClick={handleSearchSubmit}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-neon-cyan/20 p-2 rounded-lg text-neon-cyan hover:bg-neon-cyan/30"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Mobile Suggestions */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="mt-2 bg-bg-secondary border border-border rounded-xl overflow-hidden">
                                {suggestions.map((coin) => (
                                    <div
                                        key={coin.id}
                                        onClick={() => {
                                            navigate(`/coin/${coin.id}`);
                                            setLocalQuery('');
                                            setShowSuggestions(false);
                                            setIsMobileSearchOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary cursor-pointer border-b border-border/50 last:border-0"
                                    >
                                        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                        <div className="text-sm">
                                            <div className="text-text-primary font-medium">{coin.name}</div>
                                            <div className="text-text-muted text-xs">{coin.symbol.toUpperCase()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="lg:hidden border-t border-border bg-bg-secondary"
                >
                    <div className="container py-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.nav>
            )}
        </header>
    );
}
