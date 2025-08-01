# Revolt Voice Assistant (Gemini Live API)

A real-time conversational voice chatbot replicating the functionality of Revolt Motors' voice assistant, built using **Google Gemini API** with **Node.js** and **WebSockets**.

---

## ✅ Features
- 🎤 **Voice Interaction** – Speak to the bot and get spoken responses.
- 🔄 **Auto Listen Mode** – After each bot response, it auto-starts listening for the next question.
- ⏹ **Interrupt Support** – Click the mic button to stop bot speech and start new input instantly.
- 🖋 **Text Chat Support** – You can also type queries.
- 🌐 **Clean Modern UI** – Responsive and minimal design.

---

## 🚀 Tech Stack
- **Backend**: Node.js, Express, WebSocket
- **Frontend**: HTML, CSS, JavaScript
- **API**: Google Gemini (Audio Dialog)

---

## 🔧 Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/SudhanshuD100/revolt-voice-bot.git
cd revolt-voice-bot
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Add your Gemini API Key:
Create a `.env` file in the root folder:
```
GEMINI_API_KEY=your_google_api_key_here
```

> **Get your API Key** from [Google AI Studio](https://aistudio.google.com/).

### 4. Start the server:
```bash
npm start
```

### 5. Open in browser:
```
http://localhost:3000
```

---

## ✅ Demo Video
🎥 [Watch Demo Here](https://drive.google.com/file/d/1zSKMOyT7kjSQUrd6ZgxYoq-KdHwpv4DP/view?usp=drive_link)

---

## 📂 Folder Structure
```
revolt-voice-bot/
│
├── server.js          # Node.js backend
├── .env               # API Key (Do NOT upload to GitHub)
├── package.json
├── public/
│   ├── index.html     # Frontend UI
│   ├── style.css      # Styling
│   └── script.js      # Client-side logic
└── README.md
```

---

## ✅ How It Works
1. User speaks → Mic captures voice → Converts to text → Sends to server.
2. Server calls **Gemini Live API** with the text.
3. Gemini responds → Server sends back text → Browser uses SpeechSynthesis to speak.
4. Auto Listen & Interruption features ensure smooth conversation flow.

---

## ✅ License
MIT License © 2025 Sudhanshu Dubey
