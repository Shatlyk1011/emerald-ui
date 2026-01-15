'use server'
import { GoogleGenAI } from '@google/genai';




export async function generateReactApp(userRequest: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  // Use Gemini 2.5 models for "Thinking" and better coding
  const result = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [{ role: 'user', parts: [{ text: userRequest }] }],
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: {
        fileName: 'Path e.g. /components/Header.tsx',
        content: 'The full React/JSX source code with Tailwind',
      },
      // Thinking config allows the AI to plan the component structure first
      thinkingConfig: { includeThoughts: true },
    },
  })
  console.log('result', result)
  if (result?.data) {
    const webApp = JSON.parse(result.data)
    return webApp
  }

  return 'No result'
}
