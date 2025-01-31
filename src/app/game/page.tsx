import Game from "@/components/game";
import { GameContextProvider } from "@/contexts/gameContext";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?count=12`, {
    cache: 'no-store'
  }).then(res => res.json()) as { tickets: Ticket[] };

  if (!result.tickets || result.tickets.length === 0) {
    redirect('/game', RedirectType.replace)
  }

  return (
    <GameContextProvider tickets={result.tickets}>
      <Game />
    </GameContextProvider>
  );
}
