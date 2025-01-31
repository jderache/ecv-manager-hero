import { NextResponse } from "next/server";
import { getTickets } from "./get-tickets-ai";
import { getTickets as getTicketsNoAi } from "./get-tickets-no-ai";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const count = parseInt(url.searchParams.get('count') || '15');

        let tickets: {
            tickets: Ticket[]
        } = {
            tickets: []
        }

        if (process.env.USE_AI === 'true') {
            tickets = await getTickets(count);
        } else {
            tickets = await getTicketsNoAi();
        }

        return NextResponse.json(tickets, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
