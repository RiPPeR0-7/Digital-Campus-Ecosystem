import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAiResponse = async (prompt: string, context: string): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Please set the API_KEY environment variable to use the AI Assistant.";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful assistant for a Digital Campus university website. 
      Use the following context to answer the user's question if relevant: ${context}
      
      User Question: ${prompt}`,
    });
    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI service.";
  }
};
