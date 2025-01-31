import Game from "@/components/game";
import { GameContextProvider } from "@/contexts/gameContext";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?count=30`, {
    cache: 'no-store'
  }).then(res => {
    if (res.status !== 200) {
      throw new Error("Failed to fetch tickets");
    }

    return res.json()
  }) as { tickets: Ticket[] };

  // check 

  if (!result.tickets || result.tickets.length === 0) {
    redirect('/game', RedirectType.replace)
  }

  return (
    <GameContextProvider tickets={result.tickets}>
      <Game />
    </GameContextProvider>
  );
}
