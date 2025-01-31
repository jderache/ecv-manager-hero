import {useGameContext} from "@/contexts/gameContext";
import {RainbowButton} from "./rainbow-button";
import {formatTime} from "@/lib/utils";

export function GameOver() {
	const {playTime, start} = useGameContext();

	return (
		<div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
			<div className="flex items-center justify-center min-h-screen">
				<div className="relative bg-card w-full max-w-lg rounded-xl border p-8 shadow-lg">
					<h2 className="text-4xl font-bold text-center mb-8">Game Over!</h2>

					<div className="space-y-6">
						<div className="text-center space-y-2">
							<p className="text-sm text-muted-foreground">Temps de jeu</p>
							<p className="text-3xl font-bold">{formatTime(playTime)}</p>
						</div>

						<div className="pt-4">
							<RainbowButton onClick={start} className="w-full">
								Rejouer
							</RainbowButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
