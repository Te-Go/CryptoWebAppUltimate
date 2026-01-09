import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useMarket();

    const navLinks = [
        { href: '/', label: 'Piyasalar' },
        { href: '/categories', label: 'Kategoriler' },
        { href: '#', label: 'Borsalar' },
        { href: '#', label: 'Haberler' },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-bg-primary/80 border-b border-border">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Kripto Paralar"
                            className="h-10 w-auto object-contain"
                        />
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
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Coin ara..."
                                value={searchQuery} // Bind to existing searchQuery
                                onChange={(e) => setSearchQuery(e.target.value)} // Bind to existing setSearchQuery
                                className="w-64 bg-bg-tertiary border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-neon-cyan/50 transition-all"
                            />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-text-muted group-focus-within:text-neon-cyan transition-colors" />
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
                            onClick={() => setIsSearchOpen(!isSearchOpen)} // Use existing state for mobile search
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
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4"
                    >
                        <input
                            type="text"
                            placeholder="Kripto ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="
                w-full px-4 py-3 pl-10
                bg-bg-secondary border border-border rounded-xl
                text-text-primary placeholder:text-text-muted
                focus:outline-none focus:border-neon-cyan/50
              "
                            autoFocus
                        />
                        <Search className="absolute left-7 top-1/2 mt-1.5 w-4 h-4 text-text-muted" />
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
