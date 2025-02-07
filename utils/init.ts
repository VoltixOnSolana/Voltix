export async function initCron() {
    try {
        // Appelle l'API CRON
        const response = await fetch(`/api/cron`);
        const data = await response.json();

        // Vérifie si la réponse contient des tokens
        if (data.success && data.tokens) {
            return data.tokens;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation du cron:", error);
        return [];
    }
}