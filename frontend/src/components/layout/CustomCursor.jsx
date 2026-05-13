import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setDotPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    // Detect hover on interactive elements
    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) {
        setHovering(true);
      }
    };
    const handleHoverEnd = () => setHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        className="custom-cursor"
        style={{
          left: pos.x - 10,
          top: pos.y - 10,
          transform: hovering ? 'scale(2)' : 'scale(1)',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: dotPos.x - 3,
          top: dotPos.y - 3,
          transform: hovering ? 'scale(0)' : 'scale(1)',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
