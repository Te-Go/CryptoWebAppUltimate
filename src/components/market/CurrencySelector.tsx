import { motion } from 'framer-motion';
import { useCurrency, currencyOptions, type Currency } from '../../context/CurrencyContext';

export function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="flex items-center gap-0.5 p-1 bg-bg-secondary/50 rounded-xl backdrop-blur-sm border border-white/5">
            {currencyOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setCurrency(option.id as Currency)}
                    className="relative px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg"
                    style={{
                        color: currency === option.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    }}
                    title={option.name}
                >
                    {currency === option.id && (
                        <motion.div
                            layoutId="currency-active"
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.1))',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 0 15px rgba(212, 175, 55, 0.2), inset 0 0 15px rgba(212, 175, 55, 0.05)',
                            }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                        <span className="text-xs">{option.flag}</span>
                        <span>{option.symbol}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
