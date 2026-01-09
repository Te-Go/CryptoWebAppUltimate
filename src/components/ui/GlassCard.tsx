import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: 'cyan' | 'gold' | 'profit' | 'loss' | 'none';
}

export function GlassCard({
    children,
    className = '',
    hover = true,
    glow = 'none',
    ...props
}: GlassCardProps) {
    const glowStyles = {
        cyan: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]',
        gold: 'hover:shadow-[0_0_30px_rgba(252,213,53,0.2)]',
        profit: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]',
        loss: 'hover:shadow-[0_0_30px_rgba(255,51,102,0.2)]',
        none: '',
    };

    return (
        <motion.div
            className={`
        glass-card
        ${hover ? 'cursor-pointer' : ''}
        ${glowStyles[glow]}
        ${className}
      `}
            whileHover={hover ? { scale: 1.01, y: -2 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
