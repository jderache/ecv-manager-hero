import Game from "@/components/game";
import {Ticket} from "@/types/tickets";

export default async function Page() {
	const result = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}?count=20`).then((res) => res.json())) as {tickets: Ticket[]};

	return <Game tickets={result.tickets} />;
}
