"use client";

import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";

type GameContextType = {
    score: number;
    tickets: Ticket[];
    isPlaying: boolean;
    playTime: number;
    start: () => void;
    end: () => void;
    resolveTicket: (ticket: Ticket, answer: TicketType) => void;
    isRush: boolean;
    setIsRush: (isRush: boolean) => void;
};

export type Ticket = {
    id: string;
    type: TicketType;
    priority: TicketPriority;
    title: string;
    description: string;
    createdAt: number;
    lifetime: number;
    author: {
        firstname: string;
        lastname: string;
        position: string;
    };
};

export type TicketType = "bug" | "feature" | "support" | "technical";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export const ticketTypes = ["bug", "feature", "support", "technical"];

export const ticketPriorities = ["low", "medium", "high", "critical"] as const;

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameContextProvider = ({ children, tickets }: PropsWithChildren & { tickets: Ticket[] }) => {
    const [score, setScore] = useState(100);
    const [currentTickets, setCurrentTickets] = useState<Ticket[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [playTime, setPlayTime] = useState(0);
    const [isRush, setIsRush] = useState(false);
    const [rushTimeout, setRushTimeout] = useState<NodeJS.Timeout | null>(null);

    const generateTicket = () => {
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
        let interval: NodeJS.Timeout;

        if (isPlaying) interval = setInterval(generateTicket, isRush ? 1000 : 3000);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, isRush]);

    useEffect(() => {
        let timeInterval: NodeJS.Timeout;

        if (isPlaying && startTime) {
            timeInterval = setInterval(() => {
                const currentTime = Date.now();
                setPlayTime(Math.floor((currentTime - startTime) / 1000));
                if (!isRush) {
                    if (Math.random() < 0.02) {
                        setIsRush(true);
                        generateTicket();
                        const timeout = setTimeout(() => {
                            setIsRush(false);
                        }, 10000);
                        setRushTimeout(timeout);
                    }
                }
            }, 1000);
        }

        return () => {
            if (timeInterval) clearInterval(timeInterval);
            if (rushTimeout) clearTimeout(rushTimeout);
        };
    }, [isPlaying, startTime, isRush]);

    useEffect(() => {
        const ticketInterval = setInterval(() => {
            const now = Date.now();
            setCurrentTickets(prev => {
                const expiredTickets = prev.filter(ticket => {
                    const isExpired = now - ticket.createdAt >= ticket.lifetime;
                    if (isExpired) {
                        updateScore(-15);
                    }
                    return !isExpired;
                });
                return expiredTickets;
            });
        }, 1000);

        return () => clearInterval(ticketInterval);
    }, []);

    const start = () => {
        setScore(100);
        setCurrentTickets([]);
        setIsPlaying(true);
        setStartTime(Date.now());
        setPlayTime(0);
        generateTicket();
    };

    const end = () => {
        setIsPlaying(false);
        setStartTime(null);
        if (rushTimeout) {
            clearTimeout(rushTimeout);
            setRushTimeout(null);
        }
        setIsRush(false);
    };

    const resolveTicket = (ticket: Ticket, answer: TicketType) => {
        if (ticket.type === answer) {
            updateScore(10);
        } else {
            updateScore(-30);
        }

        removeTicket(ticket);
    };

    const removeTicket = (ticket: Ticket) => {
        setCurrentTickets(prev => prev.filter(t => t.id !== ticket.id));
    };

    const handleSetIsRush = (value: boolean) => {
        setIsRush(value);
        if (!value && rushTimeout) {
            clearTimeout(rushTimeout);
            setRushTimeout(null);
        }
    };

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
            setIsRush: handleSetIsRush
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};