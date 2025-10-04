# 🤖 Qube Local AI Chatbot

A beautiful, privacy-first chatbot that runs 100% locally on your machine using [Ollama](https://ollama.com/) and the Llama 3.2 AI model. No API keys, no quotas, no cloud, no cost—just instant, unlimited AI conversations!

---

## 🚀 Features
- **100% Free & Local**: No API keys, no cloud, no usage limits
- **Privacy-First**: All data stays on your device
- **Offline Capable**: Works without internet
- **Fast**: No cold starts, instant responses
- **Mobile Responsive**: Beautiful UI for desktop and mobile
- **Easy Setup**: Get started in minutes
- **Customizable**: Swap models, tweak prompts, and more

---

## 🏗️ Architecture
```
Frontend (HTML/CSS/JS)
        ↓
Express.js Backend (Node.js)
        ↓
Ollama Local AI Model (Llama 3.2)
```
- The frontend sends chat messages to the backend
- The backend relays messages to the local Ollama API
- Ollama generates a response using the Llama 3.2 model
- The response is sent back to the frontend and displayed instantly

---

## ⚡ Quick Start

### 1. **Install Ollama**
- Download and install from [ollama.com/download](https://ollama.com/download)
- Or on Windows: `winget install Ollama.Ollama`

### 2. **Start Ollama & Download the Model**
```bash
ollama serve
ollama pull llama3.2:3b
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
- Start chatting with your local AI 🤖

---

## 🛠️ Troubleshooting
- **Ollama not running?**
  - Run `ollama serve` in a terminal
- **Model not found?**
  - Run `ollama pull llama3.2:3b`
- **Port 3000 in use?**
  - Stop other apps using that port or change the port in `server.js`
- **Slow responses?**
  - Use a smaller model or close other heavy apps

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
- **Model**: Llama 3.2 3B (default)
- **RAM Usage**: ~2GB
- **Storage**: ~2GB
- **Response Time**: 1-3 seconds
- **Change Model**: Edit `MODEL_NAME` in `server.js` and pull the new model with `ollama pull <model>`

---

## 🙏 Credits
- [Ollama](https://ollama.com/) for local AI serving
- [Meta](https://ai.meta.com/llama/) for Llama models
- [Qube AI](https://github.com/) for the beautiful UI

---

## 📜 License
MIT

---

**Enjoy your unlimited, private, local AI chatbot!**
