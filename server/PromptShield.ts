export class PromptShield {
    static analyze(prompt: string): { safe: boolean; reason?: string } {
        const maliciousPatterns = [/ignore all previous/i, /system prompt/i, /bypass/i, /jailbreak/i, /you are no longer/i];
        for (const pattern of maliciousPatterns) {
            if (pattern.test(prompt)) {
                return { safe: false, reason: 'Detected potential prompt injection/jailbreak attempt.' };
            }
        }
        return { safe: true };
    }
}
