import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { NeuralLink } from './NeuralLink.js';
import { PromptShield } from './PromptShield.js';
import { db } from './FirebaseAdmin.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;
const BELLAS_API_URL = process.env.BELLAS_API_URL || 'http://localhost:8080';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Security and Parsers
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Init Modules
const neuralLink = new NeuralLink(process.env.AES_SECRET_KEY || '');

// ============ AEGIS-CORE INTEGRATION CLIENT ============
class BellasClient {
  private baseURL: string;
  
  constructor(baseURL: string = BELLAS_API_URL) {
    this.baseURL = baseURL;
  }

  async generateCinemaBlurb(payload: { prompt: string; agent_id: string }) {
    try {
      const response = await axios.post(${this.baseURL}/api/agents/generate, payload, { timeout: 30000 });
      return response.data;
    } catch (error: any) {
      console.error('?? Bellas API error:', error.message);
      throw error;
    }
  }

  async getSystemStatus() {
    try {
      const response = await axios.get(${this.baseURL}/api/health, { timeout: 5000 });
      return response.data;
    } catch (error: any) {
      return { status: 'UNREACHABLE', error: error.message };
    }
  }
}

const bellasClient = new BellasClient();

// ============ NEURAL-LINK API ENDPOINTS ============

app.get('/api/health', async (req: Request, res: Response) => {
  const bellasHealth = await bellasClient.getSystemStatus();
  res.json({
    status: 'OPERATIONAL',
    version: '1.2.0',
    protocol: 'NEURAL-LINK-MIDDLEWARE',
    encryptionMode: 'AES-256-GCM',
    promptShieldLevel: 9.1,
    firebase: db ? 'CONNECTED' : 'DISCONNECTED',
    aegis_core: {
      url: BELLAS_API_URL,
      status: bellasHealth.status || 'UNKNOWN'
    },
    timestamp: new Date().toISOString()
  });
});

app.post('/api/neural/process', async (req: Request, res: Response) => {
  try {
    const { prompt, agent = 'CINEMA' } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    // 1. Process through PromptShield (Deep AI Analysis)
    const shieldResult = await PromptShield.deepAnalyzeWithGemini(prompt, GEMINI_API_KEY);
    if (!shieldResult.safe) {
      return res.status(403).json({ error: 'BLOCKED BY SHIELD', details: shieldResult.reason });
    }

    // 2. Encrypt the prompt for secure transit/logging
    const encryptedPrompt = neuralLink.encrypt(prompt);

    // 3. Optional: Log to Firebase
    if (db) {
      await db.collection('neural_logs').add({
        agent,
        timestamp: new Date().toISOString(),
        encryptedPayload: encryptedPrompt
      });
    }

    // 4. Forward to Bellas API
    let bellasResponse = null;
    try {
      bellasResponse = await bellasClient.generateCinemaBlurb({ prompt, agent_id: agent });
    } catch (e) {
      console.warn('?? Bellas agent unavailable, returning encrypted token.');
    }

    res.json({
      status: 'SUCCESS',
      aegis_response: bellasResponse || { status: 'agent_not_invoked' },
      secure_token: encryptedPrompt.iv, // Proof of encryption
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Neural-Link processing failed', message: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(
?? NEURAL-LINK-MIDDLEWARE v1.2 ONLINE
?? Listening on http://0.0.0.0:
??? Prompt-Shield: ACTIVE
?? Encryption: AES-256-GCM
??? AEGIS-CORE BRIDGE: 
  );
});
