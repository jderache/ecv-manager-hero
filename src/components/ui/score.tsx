"use client";

import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface ScoreProps {
	value: number;
	className?: string;
}

export function Score({value, className}: ScoreProps) {
	const [displayValue, setDisplayValue] = useState(value);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (value !== displayValue) {
			setIsAnimating(true);
			const diff = value - displayValue;
			const step = diff > 0 ? 1 : -1;

			const interval = setInterval(() => {
				setDisplayValue((prev) => {
					if (prev === value) {
						clearInterval(interval);
						setIsAnimating(false);
						return prev;
					}
					return prev + step;
				});
			}, 50);

			return () => clearInterval(interval);
		}
	}, [value, displayValue]);

	return <div className={cn("font-bold text-4xl transition-transform", isAnimating && "animate-[bounce_0.5s_ease-in-out]", className)}>{displayValue}</div>;
}
