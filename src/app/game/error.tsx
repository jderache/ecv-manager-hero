'use client';

import { ServerCrash } from "lucide-react";

export default function Error() {
    return <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-8 relative flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold px-8">Error loading project</h1>
            <ServerCrash className="w-10 h-10" />
        </div>
    </div>
}