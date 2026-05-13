// Reusable Framer Motion animation variants

export const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay,
    },
  },
});

export const slideIn = (direction, delay = 0) => ({
  hidden: {
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      delay,
    },
  },
});

export const textReveal = {
  hidden: { y: '100%', opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const imageReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: {
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      type: 'tween',
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const hoverScale = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export const tapScale = {
  scale: 0.95,
};

export const glowHover = {
  boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
  borderColor: 'rgba(212, 175, 55, 0.5)',
  transition: { duration: 0.3 },
};
