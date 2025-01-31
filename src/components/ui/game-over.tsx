"use client";

import { useGameContext } from "@/contexts/gameContext";
import { RainbowButton } from "./rainbow-button";
import { formatTime } from "@/lib/utils";
import { Bar, BarChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
    errors: {
        label: "Errors",
        color: "#f43f5e",
    },
    resolved: {
        label: "Resolved",
        color: "#16a34a",
    },
} satisfies ChartConfig


export function GameOver() {
    const { playTime, start, results } = useGameContext();

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-card w-full max-w-lg rounded-xl border p-8 shadow-lg">
                    <h2 className="text-4xl font-bold text-center mb-8">Game Over!</h2>

                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">Play time</p>
                            <p className="text-3xl font-bold">{formatTime(playTime)}</p>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">Tickets management statistics</p>
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                <BarChart accessibilityLayer data={results}>
                                    <XAxis
                                        dataKey="type"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => {
                                            switch (value) {
                                                case "bug":
                                                    return "Bug";
                                                case "feature":
                                                    return "Feature";
                                                case "support":
                                                    return "Support";
                                                case "technical":
                                                    return "Technical";
                                                default:
                                                    return "inconnu";
                                            }
                                        }}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="errors" fill="var(--color-errors)" radius={4} />
                                    <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="pt-4">
                            <RainbowButton onClick={start} className="w-full">
                                Rejouer
                            </RainbowButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
