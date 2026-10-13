import React, { useEffect, useState, useRef } from 'react';

export const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports touch
    const checkMobile = () => {
      const mobileMatch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobileMatch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Add event listeners to detect hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  // Spring animation effect for the trail ring
  useEffect(() => {
    if (isMobile || hidden) return;

    let animFrameId: number;

    const updateTrail = () => {
      const dx = position.x - trailRef.current.x;
      const dy = position.y - trailRef.current.y;
      
      // Interpolate position (spring constant ~ 0.15)
      trailRef.current.x += dx * 0.16;
      trailRef.current.y += dy * 0.16;

      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animFrameId = requestAnimationFrame(updateTrail);
    };

    animFrameId = requestAnimationFrame(updateTrail);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [position, isMobile, hidden]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Central Cursor Point */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 0.5 : 1})`,
        }}
      />
      {/* Trailing Outer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.8 : 1})`,
          backgroundColor: hovered ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          borderColor: hovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(6, 182, 212, 0.5)',
          boxShadow: hovered ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none',
        }}
      />
      {/* Background Follow Glow */}
      <div
        className="cursor-glow"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: hovered ? '400px' : '300px',
          height: hovered ? '400px' : '300px',
        }}
      />
    </>
  );
};
