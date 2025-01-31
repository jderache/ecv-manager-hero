import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
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

    const message = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `${systemPrompt} Réponds uniquement avec le JSON et fais attention à renvoyer un JSON valide pouvant être parsé via JSON.parse, sans texte additionnel.`
            }
        ],
        temperature: 0.9
    });

    if (!message.choices[0].message.content) {
        throw new Error("No content");
    }

    return JSON.parse(message.choices[0].message.content);
}
