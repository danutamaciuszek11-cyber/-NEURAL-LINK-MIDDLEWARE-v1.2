import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export class NeuralLink {
    private secretKey: Buffer;

    constructor(secretKeyHex: string) {
        if (!secretKeyHex || secretKeyHex.length !== 64) {
            console.warn("?? AES_SECRET_KEY must be exactly 64 hex characters (32 bytes). Using a temporary key for dev.");
            this.secretKey = crypto.randomBytes(32);
        } else {
            this.secretKey = Buffer.from(secretKeyHex, 'hex');
        }
    }

    encrypt(text: string): { iv: string; content: string; authTag: string } {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(ALGORITHM, this.secretKey, iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag().toString('hex');
        
        return {
            iv: iv.toString('hex'),
            content: encrypted,
            authTag: authTag
        };
    }

    decrypt(hash: { iv: string; content: string; authTag: string }): string {
        const decipher = crypto.createDecipheriv(
            ALGORITHM, 
            this.secretKey, 
            Buffer.from(hash.iv, 'hex')
        );
        
        decipher.setAuthTag(Buffer.from(hash.authTag, 'hex'));
        
        let decrypted = decipher.update(hash.content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}
