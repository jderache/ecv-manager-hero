"use client";

import React, {useEffect, useState} from "react";
import {RainbowButton} from "@/components/ui/rainbow-button";
import Link from "next/link";
import {FeatureSteps} from "@/components/blocks/feature-section";

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
    title: 'Triez les tickets',
    content: 'Analysez et classifiez rapidement les tickets entrants en 4 catégories : bugs, features, support et technique. Chaque bonne classification rapporte 10 points !', 
			image: '/images/1.png' // Une image montrant différents types de tickets
		},
  { 
    step: 'Step 2',
    title: 'Gérez votre score',
    content: 'Maintenez votre score au-dessus de 0. Attention aux erreurs de classification qui vous coûtent 30 points, et aux tickets expirés qui en retirent 15 !',
    image: '/images/2.png' // Une image montrant un compteur de score
  },
  { 
    step: 'Step 3',
    title: 'Survivez au Rush',
    content: 'Préparez-vous aux périodes de rush où les tickets arrivent plus rapidement. Gardez votre sang-froid pendant ces 10 secondes intenses !',
    image: '/images/3.png' // Une image montrant beaucoup de tickets qui arrivent
  },
  { 
    step: 'Step 4',
    title: 'Battez des records',
    content: 'Démarrez avec 100 points et voyez combien de temps vous pouvez tenir. Chaque seconde compte dans cette course contre la montre !',
    image: '/images/4.png' // Une image montrant un chronomètre
  },
]

export default function GamePage() {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center">
			<MovingBubbles />
			<div className="text-center space-y-8 relative">
				<div>
					<FeatureSteps features={features} title="Devenez un Project Manager d'élite !" subtitle="Triez, gérez et survivez dans ce challenge de gestion de tickets" autoPlayInterval={4000} imageHeight="h-[500px]" />
				</div>
				<Link href="/game">
					<RainbowButton>Let&apos;s go&nbsp;!</RainbowButton>
				</Link>
			</div>
		</div>
	);
}
