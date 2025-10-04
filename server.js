const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Ollama configuration
const OLLAMA_BASE_URL = 'http://localhost:11434';
const MODEL_NAME = 'llama3.2:3b'; // Lightweight model perfect for chatbots

// Function to check if Ollama is running
async function checkOllamaStatus() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Function to generate AI response using Ollama
async function generateResponse(userMessage) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: userMessage,
        stream: false,
        options: {
          temperature: 0.7, // Balanced creativity
          top_p: 0.9,
          max_tokens: 500 // Reasonable response length
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "Sorry, I couldn't generate a response.";
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
    // Check if Ollama is running
    const isOllamaRunning = await checkOllamaStatus();
    
    if (!isOllamaRunning) {
      return res.status(503).json({
        error: 'Ollama not running',
        message: 'Please start Ollama service and ensure the model is loaded. Run: ollama serve && ollama pull llama3.2:3b'
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
  const isOllamaRunning = await checkOllamaStatus();
  res.json({ 
    status: isOllamaRunning ? 'healthy' : 'unhealthy',
    ollama: isOllamaRunning,
    model: MODEL_NAME
  });
});

// Serve Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Qube AI Chatbot Server running on http://localhost:${PORT}`);
  console.log(`🤖 Using local AI model: ${MODEL_NAME}`);
  console.log(`📡 Ollama API: ${OLLAMA_BASE_URL}`);
  console.log(`\n💡 To get started:`);
  console.log(`   1. Start Ollama: ollama serve`);
  console.log(`   2. Pull model: ollama pull llama3.2:3b`);
  console.log(`   3. Open: http://localhost:${PORT}`);
});