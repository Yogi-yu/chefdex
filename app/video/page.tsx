'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked — controls remain available
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top logo strip */}
      <div className="flex items-center justify-center pt-32 pb-8">
        <a href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.jpg"
            alt="ChefDex"
            width={32}
            height={32}
            className="rounded-sm object-contain"
          />
          <span className="font-semibold text-xl tracking-tight text-charcoal-900">
            ChefDex
          </span>
        </a>
      </div>

      {/* Headline */}
      <motion.div
        className="text-center px-6 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-400 mb-3">
          Introduction
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-charcoal-900">
          On-chain Global Ranking System for Chefs
        </h1>
      </motion.div>

      {/* Video container */}
      <motion.div
        className="flex-1 flex items-start justify-center px-4 pb-16"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="relative w-full max-w-4xl">
          {/* Subtle edge gradient overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
            }}
          />

          <video
            ref={videoRef}
            src="/video/intro.mp4"
            controls
            muted
            playsInline
            preload="metadata"
            className="w-full rounded-2xl shadow-2xl shadow-black/10 bg-black"
            style={{ display: 'block' }}
          />
        </div>
      </motion.div>

      {/* Caption */}
      <motion.div
        className="text-center pb-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
      >
        <p className="text-sm text-charcoal-400 tracking-wide">
          ChefDex Introduction&nbsp;&mdash;&nbsp;On-chain Global Ranking System for Chefs
        </p>
      </motion.div>
    </div>
  );
}
