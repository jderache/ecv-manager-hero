"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <div className="text-center space-y-8 relative flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold px-8">Loading project</h1>
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        </div>
    );
}
