"use client"

import { Fragment, useEffect } from "react"
import { useGameContext } from "@/contexts/gameContext";
import { cn, formatTime } from "@/lib/utils";
import { GameCard } from "./ui/card-ui";
import { Score } from "./ui/score";
import { GameOver } from "./ui/game-over";

export default function Game() {
    const { tickets, start, isPlaying, score, playTime, isRush } = useGameContext();

    useEffect(() => {
        start();
    }, []);

    return (
        <Fragment>
            {!isPlaying && score === 0 && <GameOver />}
            {isPlaying && (
                <div className="container mx-auto px-4">
                    <div className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center mb-16 top-8 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg">
                        <div className="flex items-center gap-8 justify-between w-full">
                            <div className="text-center">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Score</p>
                                <Score value={score} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Time</p>
                                <div className="font-bold text-4xl">{formatTime(playTime)}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cn(
                        "flex flex-col gap-4 p-4 rounded-xl transition-colors duration-300",
                        isRush && "bg-red-500/10 dark:bg-red-500/20"
                    )}>
                        {tickets.map((ticket) => (
                            <GameCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            )}
        </Fragment>
    )
}