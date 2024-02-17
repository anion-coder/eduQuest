import express from 'express';
import http from 'http';
import { fileURLToPath } from "url";
import path, { dirname } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname('C:\\appbot');
const app = express();
const port = process.env.PORT || 3010;

// Import necessary classes for Google Generative AI:
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBKl20e8u4av5h3DwEW5WOM-o_sId-_1T8"; 

async function runChat(promptTemplate, question) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.6,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [ {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // Construct the full prompt using the template and question
  const prompt = promptTemplate.replace("{question}", question);

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(result) 

  return response.text();
}

// API endpoints
app.get("/api/health", async (req, res) => {
    try {
        res.json({ success: true, message: "Server is healthy" });
      } catch (error) {
        console.error("Error handling health check:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

app.get("/ask", async (req, res) => {
  try {
    const promptTemplate = req.query.promptTemplate || "Answer the following question: {question}"; // Use a default template if not provided
    const question = req.query.question || "what is this article about?";
    const answer = await runChat(promptTemplate, question);
    console.log(answer)
    res.json({ result: answer });
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server startup
http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});