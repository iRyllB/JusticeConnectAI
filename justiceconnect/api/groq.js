// api/groq.js
// Vercel serverless function to proxy /api/groq to Groq's API
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
    if (!GROQ_API_KEY) return res.status(500).json({ error: 'Missing GROQ_API_KEY environment variable' });

    const { model, prompt, max_output_tokens } = req.body;

    const response = await fetch('https://api.groq.ai/v1/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: model || 'gemma2-9b-it', prompt, max_output_tokens: max_output_tokens || 200 }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => null);
      return res.status(response.status).json({ error: `Groq returned ${response.status}`, details: text });
    }

    const data = await response.json();
    return res.status(200).json({ output_text: data.output_text || 'No output_text', raw: data });
  } catch (err) {
    console.error('[vercel/api/groq] error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}