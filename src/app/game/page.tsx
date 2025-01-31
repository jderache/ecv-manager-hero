import Game from "@/components/game";
import { GameContextProvider, Ticket } from "@/contexts/gameContext";

export default async function Page() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?count=5`).then(res => res.json()) as { tickets: Ticket[] };

  if (!result.tickets) throw new Error("No tickets found");

  return (
    <GameContextProvider tickets={result.tickets}>
      <Game />
    </GameContextProvider>
  );
}
