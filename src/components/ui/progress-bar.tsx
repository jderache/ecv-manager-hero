import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
    startTime: number;
    lifetime: number;
    className?: string;
}

export function ProgressBar({ startTime, lifetime, className }: ProgressBarProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;
            const remaining = Math.max(0, 100 - (elapsed / lifetime) * 100);
            setProgress(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [startTime, lifetime]);

    return (
        <div className={cn("w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden", className)}>
            <div
                className={cn(
                    "h-full transition-all duration-200",
                    progress > 66 && "bg-green-500",
                    progress <= 66 && progress > 33 && "bg-yellow-500",
                    progress <= 33 && "bg-red-500"
                )}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
} 