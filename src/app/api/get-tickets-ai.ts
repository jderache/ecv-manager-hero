import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getTickets(count: number): Promise<{
    tickets: Ticket[]
}> {
    const systemPrompt = `Génère ${count} tickets au format JSON avec ces champs:
		- id: string (UUID)
		- type: "bug" | "feature" | "support" | "technical"
		- title: string (titre concis)
		- description: string (description détaillée)
		- priority: "low" | "medium" | "high" | "critical"
		- lifetime: number (nombre de millisecondes, critical: 5000, high: 10000, medium: 20000, low: 30000)
		- author: {
		    firstname: string
		    lastname: string
		    position: string
		}

        donne moi un json de ce format: 

        {
            "tickets": [
                {
                    "id": "1",
                    "type": "bug",
                    "title": "Bug 1",
                    "description": "Description du bug 1",
                    "priority": "low",
                    "lifetime": 30000,
                    "author": {
                        "firstname": "John",
                        "lastname": "Doe",
                        "position": "Developer"
                    }
                }
            ]
        }

		Les tickets doivent être réalistes, variés et les titres et descriptions doivent être en anglais.`;

    const message = await anthropic.messages.create({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 2000,
        messages: [
            {
                role: "user",
                content: `${systemPrompt} Réponds uniquement avec le JSON et fais attention à renvoyer un JSON valide pouvant être parsé via JSON.parse, sans texte additionnel.`
            }
        ],
        temperature: 0.9
    });

    console.log(message.content[0] as { text: string });

    return JSON.parse((message.content[0] as { text: string }).text);
}
