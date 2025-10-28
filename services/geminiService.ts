

import { GoogleGenAI, Content } from "@google/genai";
import { ChatMessage } from "../types";

// FIX: Safely initialize the Gemini AI client only if the API key is available
// to prevent runtime errors.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
} else {
  ai = new GoogleGenAI({apiKey: API_KEY});
}

export async function getChatResponse(history: ChatMessage[]): Promise<string> {
    // FIX: Check if the AI client was initialized before using it.
    if (!ai) {
        return "AI support is currently unavailable. Please configure your API key.";
    }
    
    try {
        const model = 'gemini-2.5-flash';
        
        const systemInstruction = "You are 'ShawarmaBot', a friendly and professional customer support AI for 'Hello Shawarma', a B2B ordering platform for shawarma vendors. Your goal is to provide helpful, concise, and accurate answers to vendor questions. Vendors might ask about their orders, products, payments, or delivery. Be polite and empathetic. Keep your answers brief unless more detail is requested. You cannot perform actions like placing orders, but you can guide users on how to do so.";

        const contents: Content[] = history.map(msg => ({
            role: msg.sender === 'vendor' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.95,
            }
        });
        
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I'm having some trouble right now. Please check your API key or try again later.";
    }
}
