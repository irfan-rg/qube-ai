const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { LanguageServiceClient } = require('@google-cloud/language');

// Load environment variables
require('dotenv').config();

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Initialize Google Cloud Natural Language API client
const languageClient = new LanguageServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your service account key JSON file
});

// Chatbot Route
app.post('/api/chat', async (req, res) => {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return res.status(503).send({
      error: 'API not configured',
      message: 'Please configure the Google Cloud API credentials to use this chatbot.'
    });
  }

  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).send({ error: 'Message is required!' });
  }

  try {
    // Prepare the request
    const document = {
      content: userMessage,
      type: 'PLAIN_TEXT',
    };

    // Analyze sentiment using Google Cloud Natural Language API
    const [result] = await languageClient.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;

    // You can also analyze entities
    const [entityResult] = await languageClient.analyzeEntities({ document });
    const entities = entityResult.entities;

    // Prepare a response based on the analysis
    const botReply = {
      sentiment: {
        score: sentiment.score,
        magnitude: sentiment.magnitude
      },
      entities: entities.map(entity => ({
        name: entity.name,
        type: entity.type,
        salience: entity.salience
      })),
      message: `I analyzed your message. The sentiment score is ${sentiment.score.toFixed(2)}`
    };

    res.send({ reply: botReply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

// Serve Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Using Google Cloud Natural Language API`);
});