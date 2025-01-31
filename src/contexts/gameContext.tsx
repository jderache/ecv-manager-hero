"use client";

import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";

export type TicketType = "bug" | "feature" | "support" | "technical";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface Ticket {
    id: string;
    type: TicketType;
    priority: string;
    lifetime: number;
    title: string;
    description: string;
    author: {
        firstname: string;
        lastname: string;
        position: string;
    };
}

type GameContextType = {
    score: number;
    tickets: (Ticket & { createdAt?: number })[];
    isPlaying: boolean;
    playTime: number;
    start: () => void;
    end: () => void;
    resolveTicket: (ticket: Ticket, answer: TicketType) => void;
    isRush: boolean;
    setIsRush: (isRush: boolean) => void;
    results: {
        type: TicketType;
        errors: number;
        resolved: number;
    }[];
};

export const ticketTypes: TicketType[] = ["bug", "feature", "support", "technical"];
export const ticketPriorities: TicketPriority[] = ["low", "medium", "high", "critical"];

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children, tickets }: PropsWithChildren<{ tickets: Ticket[] }>) => {
    const [score, setScore] = useState(100);
    const [currentTickets, setCurrentTickets] = useState<(Ticket & { createdAt?: number })[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [playTime, setPlayTime] = useState(0);
    const [isRush, setIsRush] = useState(false);
    const [rushTimeout, setRushTimeout] = useState<NodeJS.Timeout | undefined>();
    const [results, setResults] = useState<{
        type: TicketType;
        errors: number;
        resolved: number;
    }[]>([
        { type: "bug", errors: 0, resolved: 0 },
        { type: "feature", errors: 0, resolved: 0 },
        { type: "support", errors: 0, resolved: 0 },
        { type: "technical", errors: 0, resolved: 0 },
    ]);

    const generateTicket = () => {
        if (!isPlaying) return;
        
        setCurrentTickets(prevCurrentTickets => {
            const remainingTickets = tickets.filter(ticket => !prevCurrentTickets.some(t => t.id === ticket.id));

            if (remainingTickets.length > 0) {
                const newTicket = remainingTickets[Math.floor(Math.random() * remainingTickets.length)];
                return [...prevCurrentTickets, { ...newTicket, createdAt: Date.now() }];
            }

            return prevCurrentTickets;
        });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isPlaying) {
            interval = setInterval(generateTicket, isRush ? 1000 : 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, isRush]);

    useEffect(() => {
        let timeInterval: NodeJS.Timeout | undefined;

        if (isPlaying && startTime) {
            timeInterval = setInterval(() => {
                const currentTime = Date.now();
                setPlayTime(Math.floor((currentTime - startTime) / 1000));
                
                if (!isRush && Math.random() < 0.02) {
                    setIsRush(true);
                    generateTicket();
                    const timeout = setTimeout(() => {
                        setIsRush(false);
                    }, 10000);
                    setRushTimeout(timeout);
                }
            }, 1000);
        }

        return () => {
            if (timeInterval) clearInterval(timeInterval);
            if (rushTimeout) clearTimeout(rushTimeout);
        };
    }, [isPlaying, startTime, isRush]);

    useEffect(() => {
        if (!isPlaying) return;
        
        const ticketInterval = setInterval(() => {
            const now = Date.now();
            setCurrentTickets(prev => {
                const newTickets = prev.filter(ticket => {
                    if (!ticket.createdAt) return false;
                    return now - ticket.createdAt < ticket.lifetime;
                });

                const expiredCount = prev.length - newTickets.length;
                if (expiredCount > 0) {
                    updateScore(expiredCount * -15);
                }

                return newTickets;
            });
        }, 1000);
    
        return () => clearInterval(ticketInterval);
    }, [isPlaying]);

    const updateScore = (change: number) => {
        setScore(prevScore => {
            const newScore = Math.max(0, prevScore + change);
            if (newScore <= 0) {
                end();
                return 0;
            }
            return newScore;
        });
    };

    const start = () => {
        setScore(100);
        setCurrentTickets([]);
        setResults([
            { type: "bug", errors: 0, resolved: 0 },
            { type: "feature", errors: 0, resolved: 0 },
            { type: "support", errors: 0, resolved: 0 },
            { type: "technical", errors: 0, resolved: 0 },
        ]);
        setIsPlaying(true);
        setStartTime(Date.now());
        setPlayTime(0);
        setIsRush(false);
    };

    const end = () => {
        setIsPlaying(false);
        setStartTime(null);
        if (rushTimeout) {
            clearTimeout(rushTimeout);
            setRushTimeout(undefined);
        }
        setIsRush(false);
        setCurrentTickets([]);
    };

    const updateResults = (ticketType: TicketType, isResolved: boolean) => {
        setResults(prevResults => 
            prevResults.map(result => 
                result.type === ticketType
                    ? {
                        ...result,
                        errors: isResolved ? result.errors : result.errors + 1,
                        resolved: isResolved ? result.resolved + 1 : result.resolved,
                    }
                    : result
            )
        );
    };

    const resolveTicket = (ticket: Ticket, answer: TicketType) => {
        const isCorrect = ticket.type === answer;
        updateScore(isCorrect ? 10 : -30);
        updateResults(ticket.type, isCorrect);
        setCurrentTickets(prev => prev.filter(t => t.id !== ticket.id));
    };

    const handleSetIsRush = (value: boolean) => {
        setIsRush(value);
        if (!value && rushTimeout) {
            clearTimeout(rushTimeout);
            setRushTimeout(undefined);
        }
    };

    return (
        <GameContext.Provider value={{
            score,
            tickets: currentTickets,
            isPlaying,
            playTime,
            start,
            end,
            resolveTicket,
            isRush,
            setIsRush: handleSetIsRush,
            results,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameContextProvider");
    }
    return context;
};