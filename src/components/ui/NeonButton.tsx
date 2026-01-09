import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';

interface NeonButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ children, variant = 'primary', size = 'md', className = '', ...props }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold rounded-lg
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-neon-cyan/50
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

        const variants = {
            primary: `
        bg-gradient-to-r from-neon-cyan to-neon-blue
        text-bg-primary
        shadow-[0_4px_15px_rgba(0,229,255,0.3)]
        hover:shadow-[0_6px_25px_rgba(0,229,255,0.5)]
        hover:brightness-110
      `,
            secondary: `
        bg-accent-gold
        text-bg-primary
        shadow-[0_4px_15px_rgba(252,213,53,0.3)]
        hover:shadow-[0_6px_25px_rgba(252,213,53,0.5)]
        hover:brightness-110
      `,
            outline: `
        bg-transparent
        border border-neon-cyan
        text-neon-cyan
        hover:bg-neon-cyan/10
        hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]
      `,
            ghost: `
        bg-transparent
        text-text-secondary
        hover:text-text-primary
        hover:bg-bg-tertiary
      `,
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <motion.button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

NeonButton.displayName = 'NeonButton';
