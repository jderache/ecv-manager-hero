export async function getTickets() {
    return {
        tickets: [
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                type: "bug",
                title: "Erreur 404 sur la page de paiement",
                description: "Les utilisateurs reçoivent une erreur 404 lors de la redirection vers la page de paiement après validation du panier. Problème survenu après la dernière mise à jour.",
                priority: "critical",
                lifetime: 5000,
                author: {
                    firstname: "Sophie",
                    lastname: "Martin",
                    position: "QA Engineer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "550e8400-e29b-41d4-a716-446655440000",
                type: "feature",
                title: "Ajout d'authentification à deux facteurs",
                description: "Implémenter une authentification à deux facteurs par SMS ou application mobile pour renforcer la sécurité des comptes utilisateurs.",
                priority: "high",
                lifetime: 10000,
                author: {
                    firstname: "Lucas",
                    lastname: "Dubois",
                    position: "Security Engineer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
                type: "support",
                title: "Problème de synchronisation calendrier",
                description: "Plusieurs utilisateurs signalent des problèmes de synchronisation entre le calendrier de l'application et Google Calendar.",
                priority: "medium",
                lifetime: 20000,
                author: {
                    firstname: "Emma",
                    lastname: "Bernard",
                    position: "Support Technique",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "8c9e6679-7425-40de-944b-e07fc1f90ae8",
                type: "technical",
                title: "Optimisation des requêtes SQL",
                description: "Les requêtes sur la table des commandes prennent trop de temps. Nécessité d'optimiser les index et les requêtes pour améliorer les performances.",
                priority: "high",
                lifetime: 10000,
                author: {
                    firstname: "Thomas",
                    lastname: "Petit",
                    position: "Lead Developer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "9c9e6679-7425-40de-944b-e07fc1f90ae9",
                type: "bug",
                title: "Erreur d'affichage sur mobile",
                description: "Le menu déroulant ne s'affiche pas correctement sur les appareils iOS en mode paysage.",
                priority: "medium",
                lifetime: 20000,
                author: {
                    firstname: "Julie",
                    lastname: "Moreau",
                    position: "Frontend Developer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "ac9e6679-7425-40de-944b-e07fc1f90aea",
                type: "feature",
                title: "Export des données en PDF",
                description: "Ajouter la possibilité d'exporter les rapports mensuels au format PDF avec mise en page personnalisée.",
                priority: "low",
                lifetime: 30000,
                author: {
                    firstname: "Pierre",
                    lastname: "Durand",
                    position: "Product Owner",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "bc9e6679-7425-40de-944b-e07fc1f90aeb",
                type: "support",
                title: "Réinitialisation mot de passe",
                description: "Les emails de réinitialisation de mot de passe ne sont pas reçus par les utilisateurs ayant une adresse @hotmail.fr",
                priority: "high",
                lifetime: 10000,
                author: {
                    firstname: "Marie",
                    lastname: "Laurent",
                    position: "Support Manager",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "cc9e6679-7425-40de-944b-e07fc1f90aec",
                type: "technical",
                title: "Mise à jour sécurité Node.js",
                description: "Mise à jour urgente requise pour corriger une faille de sécurité critique dans la version actuelle de Node.js",
                priority: "critical",
                lifetime: 5000,
                author: {
                    firstname: "Alexandre",
                    lastname: "Robert",
                    position: "DevOps Engineer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "dc9e6679-7425-40de-944b-e07fc1f90aed",
                type: "bug",
                title: "Calcul incorrect des remises",
                description: "Le système calcule mal les remises lorsque plusieurs codes promotionnels sont appliqués simultanément.",
                priority: "high",
                lifetime: 10000,
                author: {
                    firstname: "Céline",
                    lastname: "Lefebvre",
                    position: "Backend Developer",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "ec9e6679-7425-40de-944b-e07fc1f90aee",
                type: "feature",
                title: "Integration API LinkedIn",
                description: "Permettre aux utilisateurs de se connecter et de partager du contenu via leur compte LinkedIn.",
                priority: "medium",
                lifetime: 20000,
                author: {
                    firstname: "Nicolas",
                    lastname: "Garcia",
                    position: "Integration Specialist",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "fc9e6679-7425-40de-944b-e07fc1f90aef",
                type: "support",
                title: "Problème d'impression des factures",
                description: "Les factures générées au format A4 présentent des problèmes de mise en page lors de l'impression.",
                priority: "low",
                lifetime: 30000,
                author: {
                    firstname: "Sarah",
                    lastname: "Michel",
                    position: "Customer Support",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
            {
                id: "gc9e6679-7425-40de-944b-e07fc1f90aeg",
                type: "technical",
                title: "Migration base de données",
                description: "Planification et exécution de la migration de la base de données vers PostgreSQL 14.",
                priority: "medium",
                lifetime: 20000,
                author: {
                    firstname: "David",
                    lastname: "Simon",
                    position: "Database Administrator",
                },
                createdAt: "2024-01-31T10:00:00Z"
            },
        ],
    };
}

