"use client";

import React, { useEffect, useState } from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

const MovingBubbles = () => {
  const [bubbles, setBubbles] = useState<
    Array<{
      width: number;
      height: number;
      left: number;
      top: number;
      delay: number;
      index: number;
    }>
  >([]);

  useEffect(() => {
    setBubbles(
      [...Array(15)].map((_, i) => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        index: i,
      })),
    );

    const moveInterval = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => ({
          ...bubble,
          left: (bubble.left + 0.1) % 100,
          top: (bubble.top + 0.05 * Math.sin(bubble.left / 10)) % 100,
        })),
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.index}
          className="absolute rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 transition-all duration-[2000ms] ease-linear"
          style={{
            width: `${bubble.width}px`,
            height: `${bubble.height}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function GamePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <MovingBubbles />
      <div className="text-center space-y-8 relative">
        <h1 className="text-4xl font-bold mb-8 px-8">
          Become a project management expert...
          <br />
          by playing !
        </h1>
        <Link href="/game">
          <RainbowButton>Let&apos;s go&nbsp;!</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
