import express from 'express';
import cors from 'cors';
import { NeuralLink } from './NeuralLink';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt, context } = req.body;
        const result = await NeuralLink.processRequest(prompt, context || 'DEFAULT');
        res.json({ success: true, response: result });
    } catch (error: any) {
        res.status(403).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(\NEURAL-LINK MIDDLEWARE ONLINE ON PORT \);
});
