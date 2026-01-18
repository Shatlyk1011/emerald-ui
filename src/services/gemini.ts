import { GoogleGenAI } from '@google/genai';
import { PLANNING_PROMPT, SYSTEM_PROMPT } from '../../public/prompts';





const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
const genAI = new GoogleGenAI({ apiKey })

export async function generateProjectPlan(userPrompt: string) {
  try {
    const model = 'gemini-2.0-flash-exp'

    const response = await genAI.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: PLANNING_PROMPT }] },
        { role: 'user', parts: [{ text: `User Request: ${userPrompt}` }] },
      ],
    })

    if (response) {
      return response.text
    }
  } catch (error) {
    console.error('Gemini Plan Generation Error:', error)
    throw error
  }
}

export async function generateComponentCode(plan: string) {
  try {
    const model = 'gemini-2.0-flash-exp'

    const response = await genAI.models.generateContent({
      model,
      config: {
        responseMimeType: 'application/json',
      },
      contents: [
        { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
        {
          role: 'user',
          parts: [
            {
              text: `Here is the project plan, please generate the code based on this:\n\n${plan}`,
            },
          ],
        },
      ],
    })

    const text = response.text
    if (!text) {
      throw new Error('No content received from Gemini')
    }

    return JSON.parse(text)
  } catch (error) {
    console.error('Gemini Code Generation Error:', error)
    throw error
  }
}
