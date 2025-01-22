"use client";

import React, {useEffect, useState} from "react";
import {RainbowButton} from "@/components/ui/rainbow-button";
import {Score} from "@/components/ui/score";
import {GameCard} from "@/components/ui/card-ui";

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
	const [score, setScore] = useState(10);

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center">
			<MovingBubbles />
			<div className="text-center space-y-8 relative">
				<h1 className="text-4xl font-bold mb-8 px-8">Il n&apos;a jamais été aussi facile d&apos;apprendre la gestion de projet&nbsp;!</h1>
				<RainbowButton>Jouer&nbsp;!</RainbowButton>
				<Score value={score}></Score>
				<RainbowButton onClick={() => setScore((prev) => prev + 1)}>Incrémenter le score</RainbowButton>
				<GameCard
					author={{
						avatar: "https://i.pravatar.cc/150",
						name: "Julien DERACHE",
						poste: "Front-end dev",
					}}
					priority="low"
					content={{
						text: "Erreur 404 sur la Homepage",
					}}></GameCard>
			</div>
		</div>
	);
}
