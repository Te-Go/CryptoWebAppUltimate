import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';

interface AddHoldingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddHoldingModal({ isOpen, onClose }: AddHoldingModalProps) {
    const { cryptos } = useMarket();
    const { addHolding } = usePortfolio();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
    const [quantity, setQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');

    const filteredCryptos = cryptos.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedCryptoData = cryptos.find((c) => c.id === selectedCoin);

    const handleSelectCoin = (coinId: string) => {
        setSelectedCoin(coinId);
        const coin = cryptos.find((c) => c.id === coinId);
        if (coin) {
            setBuyPrice(coin.price.toString());
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCoin && quantity && buyPrice) {
            addHolding(selectedCoin, parseFloat(quantity), parseFloat(buyPrice));
            onClose();
            // Reset form
            setSelectedCoin(null);
            setQuantity('');
            setBuyPrice('');
            setSearchQuery('');
        }
    };

    const handleClose = () => {
        onClose();
        setSelectedCoin(null);
        setQuantity('');
        setBuyPrice('');
        setSearchQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md"
                    >
                        <GlassCard className="p-6" hover={false}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-text-primary font-display">
                                    Varlık Ekle
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-text-muted hover:text-text-primary transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Coin Selection */}
                                {!selectedCoin ? (
                                    <>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                            <input
                                                type="text"
                                                placeholder="Kripto ara..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan"
                                            />
                                        </div>
                                        <div className="max-h-48 overflow-y-auto space-y-1">
                                            {filteredCryptos.slice(0, 10).map((coin) => (
                                                <button
                                                    key={coin.id}
                                                    type="button"
                                                    onClick={() => handleSelectCoin(coin.id)}
                                                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary hover:bg-bg-secondary transition-colors"
                                                >
                                                    <img
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div className="text-left">
                                                        <p className="font-medium text-text-primary">
                                                            {coin.name}
                                                        </p>
                                                        <p className="text-sm text-text-muted">
                                                            {coin.symbol}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Selected Coin Display */}
                                        <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={selectedCryptoData?.image}
                                                    alt={selectedCryptoData?.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-semibold text-text-primary">
                                                        {selectedCryptoData?.name}
                                                    </p>
                                                    <p className="text-sm text-text-muted">
                                                        {selectedCryptoData?.symbol}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCoin(null)}
                                                className="text-text-muted hover:text-text-primary"
                                            >
                                                Değiştir
                                            </button>
                                        </div>

                                        {/* Quantity Input */}
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">
                                                Miktar
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                placeholder="0.00"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan"
                                            />
                                        </div>

                                        {/* Buy Price Input */}
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">
                                                Alış Fiyatı (₺)
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                placeholder="0.00"
                                                value={buyPrice}
                                                onChange={(e) => setBuyPrice(e.target.value)}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <NeonButton
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            disabled={!quantity || !buyPrice}
                                        >
                                            Portföye Ekle
                                        </NeonButton>
                                    </>
                                )}
                            </form>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
