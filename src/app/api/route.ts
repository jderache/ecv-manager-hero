import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const count = parseInt(url.searchParams.get('count') || '12');

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

        Les tickets doivent être réalistes, variés et les titres et descriptions doivent être en français.`;

        const message = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
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


        const tickets = JSON.parse((message.content[0] as { text: string }).text);

        // const tickets = {
        //     tickets: [
        //         {
        //             "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        //             "type": "bug",
        //             "title": "Application crashes on login",
        //             "description": "Users report that the application systematically crashes when trying to log in with correct credentials on Chrome browser v120.0.6099",
        //             "priority": "critical"
        //         },
        //         {
        //             "id": "550e8400-e29b-41d4-a716-446655440000",
        //             "type": "feature",
        //             "title": "Add dark mode support",
        //             "description": "Implement dark mode theme option in user settings to improve application usability in low-light conditions",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        //             "type": "support",
        //             "title": "Password reset not working",
        //             "description": "Customer unable to reset password through forgot password link. Email recovery system appears to be down",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        //             "type": "technical",
        //             "title": "Database optimization needed",
        //             "description": "Query response times exceeding 3 seconds on product catalog. Requires index optimization and query refactoring",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "8c3c5c70-4123-4912-8b6e-db461c1b304f",
        //             "type": "bug",
        //             "title": "Checkout total calculation error",
        //             "description": "Shopping cart displays incorrect total when applying discount codes. Amounts differ from final payment screen",
        //             "priority": "critical"
        //         },
        //         {
        //             "id": "a4b1c3d2-e5f6-47g8-h9i0-j1k2l3m4n5o6",
        //             "type": "feature",
        //             "title": "Export data to CSV",
        //             "description": "Add functionality to export report data to CSV format for offline analysis",
        //             "priority": "low"
        //         },
        //         {
        //             "id": "b5c6d7e8-f9g0-1h2i-3j4k-l5m6n7o8p9q0",
        //             "type": "support",
        //             "title": "Account lockout issue",
        //             "description": "Multiple users reporting account lockouts after recent security update. Need to investigate lockout parameters",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "c7d8e9f0-g1h2-i3j4-k5l6-m7n8o9p0q1r2",
        //             "type": "technical",
        //             "title": "SSL certificate renewal",
        //             "description": "Current SSL certificate expires in 2 weeks. Need to process renewal and update configuration",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "d9e0f1g2-h3i4-j5k6-l7m8-n9o0p1q2r3s4",
        //             "type": "bug",
        //             "title": "Mobile menu not responsive",
        //             "description": "Navigation menu breaks on mobile devices when viewed in landscape mode on iOS devices",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6",
        //             "type": "feature",
        //             "title": "Implement 2FA",
        //             "description": "Add two-factor authentication option for user accounts to enhance security",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
        //             "type": "support",
        //             "title": "Billing information update",
        //             "description": "Customer unable to update credit card information in account settings",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "g5h6i7j8-k9l0-m1n2-o3p4-q5r6s7t8u9v0",
        //             "type": "technical",
        //             "title": "Memory leak in production",
        //             "description": "Server memory usage gradually increasing over time, requiring regular restarts",
        //             "priority": "critical"
        //         },
        //         {
        //             "id": "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2",
        //             "type": "bug",
        //             "title": "Search results pagination error",
        //             "description": "Search pagination shows incorrect total pages and some results are duplicated",
        //             "priority": "low"
        //         },
        //         {
        //             "id": "i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4",
        //             "type": "feature",
        //             "title": "Add payment gateway",
        //             "description": "Integrate new payment gateway to support local payment methods in Asian markets",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
        //             "type": "support",
        //             "title": "Data import failure",
        //             "description": "Customer unable to import bulk product data through admin interface",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "k3l4m5n6-o7p8-q9r0-s1t2-u3v4w5x6y7z8",
        //             "type": "technical",
        //             "title": "API rate limiting",
        //             "description": "Implement rate limiting on public API endpoints to prevent abuse",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "l5m6n7o8-p9q0-r1s2-t3u4-v5w6x7y8z9a0",
        //             "type": "bug",
        //             "title": "Email notifications delayed",
        //             "description": "Order confirmation emails being delayed by up to 30 minutes during peak hours",
        //             "priority": "high"
        //         },
        //         {
        //             "id": "m7n8o9p0-q1r2-s3t4-u5v6-w7x8y9z0a1b2",
        //             "type": "feature",
        //             "title": "Customer feedback system",
        //             "description": "Implement in-app feedback collection system with rating options",
        //             "priority": "low"
        //         },
        //         {
        //             "id": "n9o0p1q2-r3s4-t5u6-v7w8-x9y0z1a2b3c4",
        //             "type": "support",
        //             "title": "Login issues after password change",
        //             "description": "Users unable to log in with new password immediately after change, requiring cache clear",
        //             "priority": "medium"
        //         },
        //         {
        //             "id": "o1p2q3r4-s5t6-u7v8-w9x0-y1z2a3b4c5d6",
        //             "type": "technical",
        //             "title": "Backup system upgrade",
        //             "description": "Upgrade backup system to handle increased data volume and improve recovery time",
        //             "priority": "high"
        //         }
        //     ]
        // }

        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
