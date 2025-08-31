import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

// The execution context is expected to provide a valid `process.env.API_KEY`.
// This mock ensures the code is syntactically valid and runnable if `process` is not globally defined.
const process = (window as any).process || { env: { API_KEY: 'PALCEHOLDER_API_KEY' } };


@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY || process.env.API_KEY === 'PALCEHOLDER_API_KEY') {
        console.warn(
            'API key is not configured. Please ensure `process.env.API_KEY` is available.'
        );
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateCode(userPrompt: string): Promise<string> {
    const fullPrompt = `
      You are an expert code generator. Your task is to generate a complete, self-contained, and runnable code snippet based on the user's request.
      - ONLY output the raw code.
      - Do NOT include any explanations, comments, or introductions.
      - Do NOT wrap the code in markdown fences (e.g., \`\`\`html).
      - Ensure the generated code is clean, well-formatted, and directly usable.

      User Request: "${userPrompt}"
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          temperature: 0.2, // Lower temperature for more deterministic code generation
        }
      });
      
      const text = response.text.trim();
      return text;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('The AI model failed to generate a response. Please check your connection or API key.');
    }
  }
}