import { motion } from 'framer-motion';

export default function GoldButton({
  children,
  variant = 'filled',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ...props
}) {
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variants = {
    filled: `
      bg-gradient-to-r from-gold-dark via-gold to-gold-light
      text-primary font-semibold
      shadow-[0_4px_20px_rgba(212,175,55,0.3)]
      hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)]
    `,
    outline: `
      border-2 border-gold text-gold
      hover:bg-gold/10
      hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]
    `,
    ghost: `
      text-gold hover:bg-gold/5
    `,
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      type={href ? undefined : type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-body tracking-wide
        transition-all duration-300
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      {...props}
    >
      {children}
    </Component>
  );
}
