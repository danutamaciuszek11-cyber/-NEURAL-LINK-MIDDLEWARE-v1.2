# Neural Link Middleware v1.2

Secure backend middleware for ETERNIVERSE OS. Connects AI Agents (AEGIS CORE / Bellas) with client applications while providing robust security layers.

## Features
- **PromptShield**: AI-powered protection against Prompt Injection and Jailbreaks (via Gemini).
- **Encryption**: AES-256-GCM encryption for all sensitive payloads.
- **Firebase Logging**: Secure, encrypted logging of transactions.
- **AEGIS Bridge**: Forwards safe requests to Bellas API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Copy `.env.example` to `.env` and fill in your keys.

3. Run Development Server:
   ```bash
   npm run dev
   ```

4. Build for Production:
   ```bash
   npm run build
   npm start
   ```
