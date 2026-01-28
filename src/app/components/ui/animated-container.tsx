import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/app/lib/utils';

/**
 * Animated Containers and Transitions
 * Subtle motion that makes the app feel polished and responsive
 * All transitions are 150-300ms with ease-out curves
 */

// Fade In animation
interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide Up animation
interface SlideUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  distance?: number;
}

export const SlideUp: React.FC<SlideUpProps> = ({ 
  children, 
  delay = 0,
  distance = 10,
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: distance }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale In animation (for modals and dialogs)
interface ScaleInProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({ 
  children, 
  delay = 0,
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide from side (for sidebars and drawers)
interface SlideFromSideProps extends HTMLMotionProps<'div'> {
  direction?: 'left' | 'right';
}

export const SlideFromSide: React.FC<SlideFromSideProps> = ({ 
  children, 
  direction = 'right',
  className,
  ...props 
}) => {
  const x = direction === 'left' ? -20 : 20;
  
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Children (for lists)
interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({ 
  children, 
  staggerDelay = 0.05,
  className 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<HTMLMotionProps<'div'>> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Expandable Section
interface ExpandableProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Expandable: React.FC<ExpandableProps> = ({ 
  isOpen, 
  children,
  className 
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('overflow-hidden', className)}
    >
      {children}
    </motion.div>
  );
};

// Hover Scale (for cards and interactive elements)
interface HoverScaleProps extends HTMLMotionProps<'div'> {
  scale?: number;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ 
  children, 
  scale = 1.02,
  className,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Tap Scale (for buttons)
export const TapScale: React.FC<HTMLMotionProps<'button'>> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Page Transition wrapper
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Modal Backdrop
export const ModalBackdrop: React.FC<HTMLMotionProps<'div'>> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('fixed inset-0 bg-black/50 backdrop-blur-sm z-50', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Dropdown animation
export const DropdownContent: React.FC<HTMLMotionProps<'div'>> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -5 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
