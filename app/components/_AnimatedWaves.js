"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedWaves() {
  const [wave, setWave] = useState(0);
  const [wave2, setWave2] = useState(0);
  useEffect(() => {
    let frame;
    let t = 0;
    function animate() {
      setWave(Math.sin(t) * 20);
      setWave2(Math.cos(t/1.3) * 30);
      t += 0.015;
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  function getWavePath() {
    return `M0 80 Q 360 ${160+wave} 720 ${80+wave2} T 1440 ${80+wave} V160 H0Z`;
  }
  function getLinePath() {
    return `M0 120 Q 480 ${40+wave2} 960 ${120+wave} T 1440 ${120+wave2}`;
  }
  function getTopLinePath() {
    return `M0 64 Q 180 ${0+wave} 360 ${64+wave2} T 720 ${64+wave}`;
  }

  return (
    <>
      <svg className="absolute left-0 bottom-0 w-full h-40" viewBox="0 0 1440 160" fill="none" style={{zIndex:1}}>
        <defs>
          <linearGradient id="wave1" x1="0" y1="0" x2="1440" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FF1744" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <motion.path
          d={getWavePath()}
          fill="url(#wave1)"
          transition={{duration:0.2}}
        />
        <motion.path
          d={getLinePath()}
          stroke="#FF1744"
          strokeWidth="3"
          fill="none"
          opacity="0.38"
          transition={{duration:0.2}}
        />
      </svg>
      <svg className="absolute right-0 top-0 w-1/2 h-32" viewBox="0 0 720 128" fill="none" style={{zIndex:1}}>
        <motion.path
          d={getTopLinePath()}
          stroke="#FFD600"
          strokeWidth="2.5"
          fill="none"
          opacity="0.33"
          transition={{duration:0.2}}
        />
      </svg>
    </>
  );
}