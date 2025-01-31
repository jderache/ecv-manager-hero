type TicketType = "bug" | "feature" | "support" | "technical";

type Ticket = {
    id: string;
    type: TicketType;
    title: string;
    description: string;
    priority: string;
    author: {
        firstname: string;
        lastname: string;
        position: string;
    }
    lifetime: number;
}
