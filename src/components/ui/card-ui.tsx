"use client";

import {cn} from "@/lib/utils";
import {MoreHorizontal, ArrowUp, ArrowDown, ArrowRight} from "lucide-react";
import Image from "next/image";

interface GameCardProps {
	priority?: string;
	author?: {
		name?: string;
		avatar?: string;
		poste?: string;
	};
	content?: {
		text?: string;
	};
	engagement?: {
		isBookmarked?: boolean;
	};
	onMore?: () => void;
	className?: string;
}

export function GameCard({author, content, onMore, className, priority}: GameCardProps) {
	return (
		<div className={cn("w-full max-w-2xl mx-auto", "bg-white dark:bg-zinc-900", "border border-zinc-200 dark:border-zinc-800", "rounded-3xl shadow-xl", className)}>
			<div className="h-4 bg-red-50 relative rounded-full m-4 mb-0"></div>
			<div className="divide-y divide-zinc-200 dark:divide-zinc-800">
				<div className="p-6">
					{/* Author section */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-3">
							{author?.avatar && (
								<div className="relative w-10 h-10">
									<Image src={author.avatar} alt={author.name || ""} fill className="rounded-full ring-2 ring-white dark:ring-zinc-800 object-cover" />
								</div>
							)}
							<div>
								<h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{author?.name}</h3>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">{author?.poste}</p>
							</div>
						</div>
						<div className="flex">
							{priority && (
								<div className="flex items-center gap-2 p-2">
									{priority === "critical" && (
										<>
											<ArrowUp className="w-5 h-5 text-red-500" />
											<span className="text-xs capitalize text-red-500">{priority}</span>
										</>
									)}
									{priority === "high" && (
										<>
											<ArrowUp className="w-5 h-5 text-orange-500" />
											<span className="text-xs capitalize text-orange-500">{priority}</span>
										</>
									)}
									{priority === "medium" && (
										<>
											<ArrowRight className="w-5 h-5 text-yellow-500" />
											<span className="text-xs capitalize text-yellow-500">{priority}</span>
										</>
									)}
									{priority === "low" && (
										<>
											<ArrowDown className="w-5 h-5 text-green-500" />
											<span className="text-xs capitalize text-green-500">{priority}</span>
										</>
									)}
								</div>
							)}
							<button type="button" onClick={onMore} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
								<MoreHorizontal className="w-5 h-5 text-zinc-400" />
							</button>
						</div>
					</div>

					{/* Content section */}
					<p className="text-zinc-600 dark:text-zinc-300 mb-4">{content?.text}</p>

					{/* Engagement section */}
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center gap-6"></div>
					</div>
					<div className="flex flex-col items-center border border-zinc-200 rounded-xl px-8 py-4 gap-2">
						<p>Quel est le statut du ticket&nbsp;?&nbsp;🤔&nbsp;</p>
						<div className="flex items-center gap-2 p-2">
							<button type="button" className="text-sm px-4 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors">
								Bug
							</button>
							<button type="button" className="text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors">
								Technique
							</button>
							<button type="button" className="text-sm px-4 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/20 transition-colors">
								Support
							</button>
							<button type="button" className="text-sm px-4 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20 transition-colors">
								Fonctionnalité
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
