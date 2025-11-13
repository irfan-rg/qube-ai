<div align="center">
  <img src="public/favicon.svg" alt="Qube AI Logo" width="80" height="80">
  
  # Qube AI 
  
  ### *Lightning-fast AI conversations, powered by Groq*
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://qube-chat.vercel.app/)
  [![Groq](https://img.shields.io/badge/Powered%20by-Groq-orange?style=for-the-badge)](https://groq.com)
  [![Llama](https://img.shields.io/badge/Model-Llama%203.3%2070B-green?style=for-the-badge)](https://ai.meta.com/llama/)
</div>

---

A beautiful, lightning-fast chatbot powered by [Groq](https://groq.com/) and the Llama 3.3 70B AI model. Get blazing-fast AI responses with a generous free tier—up to 14,400 requests per day!

> Qube AI is a lightning-fast chatbot with a sleek iOS-style messaging UI. Enjoy instant, beautiful AI conversations powered by Groq.

---

## Features
- **Lightning Fast**: Powered by Groq's ultra-fast inference engine
- **Generous Free Tier**: 14,400 requests/day (30 requests/minute)
- **Powerful AI**: Uses Llama 3.3 70B Versatile model
- **Mobile Responsive**: Beautiful UI optimized for desktop and mobile
- **Easy Setup**: Get started in under 2 minutes
- **Markdown Support**: Rich text formatting in responses
- **Clean UI**: Modern chat interface with typing indicators

---

## Architecture
```
Frontend (HTML/CSS/JS)
        ↓
Express.js Backend (Node.js)
        ↓
Groq Cloud API (Llama 3.3 70B)
```
- The frontend sends chat messages to the backend
- The backend relays messages to Groq's API with your API key
- Groq generates a response using Llama 3.3 70B Versatile
- The response is sent back to the frontend and displayed instantly

---

## ⚡ Quick Start

### 1. **Get Your Free Groq API Key**
- Visit [console.groq.com](https://console.groq.com)
- Sign up for a free account (no credit card required)
- Create an API key from the dashboard
- Copy your API key

### 2. **Configure the API Key**
Create a `.env` file in the project root:
```bash
GROQ_API_KEY=your_api_key_here
```

### 3. **Install Node.js Dependencies**
```bash
npm install
```

### 4. **Start the Chatbot Server**
```bash
npm start
```

### 5. **Chat!**
- Open [http://localhost:3000](http://localhost:3000) in your browser
- Start chatting with Qube AI 

---



## 📦 Project Structure
```
Qube/
├── public/
│   └── index.html      # Frontend UI
├── server.js           # Express backend
├── package.json        # Node.js dependencies
├── SETUP.md            # Step-by-step setup guide
└── README.md           # This file
```

---

## 🧠 Model Info
- **Provider**: Groq Cloud API
- **Model**: Llama 3.3 70B Versatile
- **Speed**: <1 second response time
- **Free Tier**: 14,400 requests/day (30 requests/minute)
- **Max Tokens**: 500 per response (configurable in `server.js`)
- **Context Window**: 8,192 tokens
- **Change Model**: Edit `model` in `server.js` (see [Groq models](https://console.groq.com/docs/models))

---
## 🛠️ Troubleshooting
- **"API key not configured" error?**
  - Create a `.env` file with `GROQ_API_KEY=your_key_here`
  - Make sure the `.env` file is in the project root directory
- **"Invalid API key" error?**
  - Get a fresh key from [console.groq.com](https://console.groq.com)
  - Check for extra spaces or quotes in your `.env` file
- **Rate limit exceeded?**
  - Free tier: 14,400 requests/day, 30 requests/minute
  - Wait a moment or upgrade your Groq plan
- **Port 3000 in use?**
  - Stop other apps using that port
  - Or change `PORT=3001` in your `.env` file
- **Slow responses?**
  - Groq is normally very fast (<1 second)
  - Check your internet connection
  - Try again in a moment if Groq servers are busy

---

## Credits
- [Groq](https://groq.com/) for blazing-fast AI inference
- [Meta](https://ai.meta.com/llama/) for Llama models
- [Express.js](https://expressjs.com/) for the backend framework
- Community contributors

---
