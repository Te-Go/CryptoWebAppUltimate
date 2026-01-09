import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-bg-secondary border border-border hover:border-neon-cyan/50 transition-colors group"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 0
                }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon className="w-5 h-5 text-neon-cyan" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'light' ? 0 : -180,
                    scale: theme === 'light' ? 1 : 0
                }}
                className="flex items-center justify-center"
            >
                <Sun className="w-5 h-5 text-neon-cyan" />
            </motion.div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-lg group-hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-shadow duration-300" />
        </button>
    );
}
