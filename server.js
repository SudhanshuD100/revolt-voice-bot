import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();
console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "Yes" : "No");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("✅ WebSocket client connected");

  ws.on("message", async (message) => {
    console.log("🎤 User said (raw):", message.toString());

    // Step 1: Convert audio to text (simulate for now with placeholder)
    // Here, you'd normally use STT (Google Speech-to-Text API)
    // For demo: assume message is text
    const userText = message.toString();

    // Step 2: Send text to Gemini
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Rev, Revolt Motors assistant. Answer only about Revolt bikes, products, and services. User: ${userText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I have no answer.";

    console.log("🤖 Gemini says:", reply);

    // Step 3: Convert text to speech (Google TTS free API)
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      reply
    )}&tl=en&client=tw-ob`;

    ws.send(JSON.stringify({ text: reply, audioUrl: ttsUrl }));
  });
});
