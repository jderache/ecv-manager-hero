"use client";

import React, { useEffect, useState } from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import { FeatureSteps } from "@/components/blocks/feature-section";

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
const features = [
  {
    step: 'Step 1',
    title: 'Sort Tickets',
    content: 'Quickly analyze and classify incoming tickets into 4 categories: bugs, features, support, and technical. Each correct classification earns you 10 points!',
    image: '/images/1.png'
  },
  {
    step: 'Step 2',
    title: 'Manage Your Score',
    content: 'Keep your score above 0. Watch out for misclassifications that cost you 30 points, and expired tickets that deduct 15!',
    image: '/images/2.png'
  },
  {
    step: 'Step 3',
    title: 'Survive the Rush',
    content: 'Prepare for rush periods when tickets arrive faster. Keep your cool during these intense 10 seconds!',
    image: '/images/3.png'
  },
  {
    step: 'Step 4',
    title: 'Beat Records',
    content: 'Start with 100 points and see how long you can last. Every second counts in this race against the clock!',
    image: '/images/4.png'
  },
]

export default function GamePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <MovingBubbles />
      <div className="text-center space-y-8 relative">
        <div>
          <FeatureSteps features={features} title="Become an Elite Project Manager!" subtitle="Sort, manage and survive in this ticket management challenge" autoPlayInterval={4000} imageHeight="h-[500px]" />
        </div>
        <Link href="/game">
          <RainbowButton>Let&apos;s go&nbsp;!</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
