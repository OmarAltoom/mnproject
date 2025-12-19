import { useState, useEffect } from 'react';

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    color: ['yellow', 'orange', 'red'][Math.floor(Math.random() * 3)],
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
  }));
}

export function useParticles(count = 15) {
  return generateParticles(count);
}

export function useMouseParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePos;
}

export function useAnimatedStats(initial = { users: 0, analyses: 0, accuracy: 0 }) {
  const [stats, setStats] = useState(initial);

  useEffect(() => {
    const animateStats = () => {
      setStats({
        users: Math.min(4500 + Math.random() * 500, 5000),
        analyses: Math.min(28000 + Math.random() * 2000, 30000),
        accuracy: Math.min(97.8 + Math.random() * 2, 99.9)
      });
    };
    const interval = setInterval(animateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return stats;
}
