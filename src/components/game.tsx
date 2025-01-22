"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types/tickets';

const ProjectManagerGame = ({ tickets }: { tickets: Ticket[] }) => {
    const [score, setScore] = useState(100);
    const [time, setTime] = useState(300); // 5 minutes in seconds
    const [gameOver, setGameOver] = useState(false);
    const [currentTickets, setCurrentTickets] = useState<Ticket[]>([]);

    const addNewTicket = () => {
        setCurrentTickets(prevCurrentTickets => {
            const remainingTickets = tickets.filter(ticket => !prevCurrentTickets.some(t => t.id === ticket.id));

            if (remainingTickets.length > 0) {
                const newTicket = remainingTickets[Math.floor(Math.random() * remainingTickets.length)];
                return [...prevCurrentTickets, newTicket];
            }

            return prevCurrentTickets;
        });
    };
    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0 && !gameOver) {
                setTime(prev => prev - 1);
                if (Math.random() < 0.2) { // 20% chance each second
                    addNewTicket();
                }
            } else {
                setGameOver(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">Score: {score}</div>
                <div className="text-xl">
                    Temps restant: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {currentTickets.map(ticket => (
                    <Card key={ticket.id} className="bg-white shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-lg font-medium mb-2">{ticket.title}</p>
                                    {/* {ticket.urgent && (
                                        <Badge className="bg-red-500">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            Urgent
                                        </Badge>
                                    )} */}
                                </div>
                                <div className='flex gap-2'>
                                    <Button onClick={() => {
                                        setCurrentTickets(prev => prev.filter(t => t.id !== ticket.id));
                                    }}>
                                        delete
                                    </Button>

                                </div>
                                {/* <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.BUG)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Bug
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.FEATURE)}
                                        className="bg-green-500 hover:bg-green-600"
                                    >
                                        Feature
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.SUPPORT)}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        Support
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.TECHNICAL)}
                                        className="bg-yellow-500 hover:bg-yellow-600"
                                    >
                                        Technical
                                    </Button>
                                </div> */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {gameOver && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                        <p className="text-xl mb-4">Score final : {score}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            Rejouer
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProjectManagerGame;