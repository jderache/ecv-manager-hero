"use client";

import { Ticket, TicketType, useGameContext } from "@/contexts/gameContext";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowRight, Check, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface GameCardProps {
	ticket: Ticket;
}

export function GameCard({ ticket }: GameCardProps) {
	const { resolveTicket } = useGameContext();
	const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

	const handleResolve = (answer: TicketType) => {
		const isCorrect = ticket.type === answer;
		setFeedback(isCorrect ? "correct" : "incorrect");

		setTimeout(() => {
			resolveTicket(ticket, answer);
		}, 500);
	};

	return (
		<div className={cn(
			"w-full max-w-2xl mx-auto relative",
			"bg-white dark:bg-zinc-900",
			"border border-zinc-200 dark:border-zinc-800",
			"rounded-3xl shadow-xl",
			"transition-colors duration-300",
			feedback === "correct" && "bg-green-50 dark:bg-green-950/20",
			feedback === "incorrect" && "bg-red-50 dark:bg-red-950/20"
		)}>
			<div className="divide-y divide-zinc-200 dark:divide-zinc-800">
				<div className="p-6">
					{/* Author section */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-3">
							<div className="relative w-10 h-10">
								<Image src={`https://i.pravatar.cc/150?u=${ticket.id}`} alt={ticket.author.firstname} fill className="rounded-full ring-2 bg-gray-200 ring-white dark:ring-zinc-800 object-cover" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{ticket.author.firstname} {ticket.author.lastname}</h3>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">{ticket.author.position}</p>
							</div>
						</div>
						<div className="flex">
							{ticket.priority && (
								<div className="flex items-center gap-2 p-2">
									{ticket.priority === "critical" && (
										<>
											<ArrowUp className="w-5 h-5 text-red-500" />
											<span className="text-xs capitalize text-red-500">{ticket.priority}</span>
										</>
									)}
									{ticket.priority === "high" && (
										<>
											<ArrowUp className="w-5 h-5 text-orange-500" />
											<span className="text-xs capitalize text-orange-500">{ticket.priority}</span>
										</>
									)}
									{ticket.priority === "medium" && (
										<>
											<ArrowRight className="w-5 h-5 text-yellow-500" />
											<span className="text-xs capitalize text-yellow-500">{ticket.priority}</span>
										</>
									)}
									{ticket.priority === "low" && (
										<>
											<ArrowDown className="w-5 h-5 text-green-500" />
											<span className="text-xs capitalize text-green-500">{ticket.priority}</span>
										</>
									)}
								</div>
							)}
						</div>
					</div>

					<p className="text-2xl font-bold">{ticket.title}</p>

					{/* Content section */}
					<p className="text-zinc-600 dark:text-zinc-300 mb-4">{ticket.description}</p>

					<div className="flex flex-col items-center border border-zinc-200 rounded-xl px-8 py-4 gap-2">
						<p>Quel est le statut du ticket&nbsp;?&nbsp;🤔&nbsp;</p>
						<div className="flex items-center gap-2 p-2">
							<button
								onClick={() => handleResolve("bug")}
								type="button"
								className="text-sm px-4 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors"
							>
								Bug
							</button>
							<button onClick={() => handleResolve("technical")} type="button" className="text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors">
								Technique
							</button>
							<button onClick={() => handleResolve("support")} type="button" className="text-sm px-4 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/20 transition-colors">
								Support
							</button>
							<button onClick={() => handleResolve("feature")} type="button" className="text-sm px-4 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20 transition-colors">
								Fonctionnalité
							</button>
						</div>
					</div>
				</div>
			</div>

			{feedback && (
				<div className={cn(
					"absolute top-4 right-4 rounded-full p-2",
					feedback === "correct" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
				)}>
					{feedback === "correct" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
				</div>
			)}
		</div>
	);
}
