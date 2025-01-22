export type Ticket = {
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    author: {
        firstname: string;
        lastname: string;
        position: string;
    }
    lifetime: number;
    createdAt: string;
}
