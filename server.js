require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Groq configuration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''; // Get free from console.groq.com

// Function to generate AI response using Groq
async function generateResponse(userMessage) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast and powerful model
        messages: [
          {
            role: 'system',
            content: 'You are Qube AI, a helpful and friendly assistant. Keep responses concise and engaging.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', errorText);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

// Chatbot Route
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required!' });
  }

  try {
    // Check if API key is configured
    if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
      return res.status(503).json({
        error: 'API key not configured',
        message: 'Please set your Groq API key in environment variables'
      });
    }

    // Generate AI response
    const botReply = await generateResponse(userMessage);
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  res.json({ 
    status: 'healthy',
    provider: 'Groq',
    model: 'llama-3.3-70b-versatile'
  });
});

// Serve Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Qube AI Chatbot Server running on http://localhost:${PORT}`);
  console.log(`⚡ Using Groq (llama-3.3-70b-versatile)`);

});