import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2.5, label, icon }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, end, duration]);

  const formatted = count.toLocaleString('en-IN');

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      {icon && <div className="text-gold text-3xl mb-1">{icon}</div>}
      <div className="font-heading text-4xl md:text-5xl font-bold text-gradient-gold">
        {prefix}{formatted}{suffix}
      </div>
      {label && (
        <div className="text-gray-soft/70 text-sm uppercase tracking-[0.2em] font-light">
          {label}
        </div>
      )}
    </div>
  );
}
