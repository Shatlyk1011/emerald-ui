'use client'
import Together from 'together-ai'
import { SYSTEM_PROMPT } from '@/lib/constants'





const together = new Together({
  apiKey: 'tgp_v1_JMzZOUYRzIVIrCc9YsyOddKzb2U9WkWVJdwW1olj-io',
})

export async function generateReactApp(userRequest: string) {
  const response = await together.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: userRequest,
      },
    ],
    temperature: 0.5,

    model: 'deepseek-ai/DeepSeek-V3.1',
  })

  console.log('response', response.choices[0].message?.content)
  // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  // // Use Gemini 2.5 models for "Thinking" and better coding
  // const result = await ai.models.generateContent({
  //   model: 'gemini-2.5-pro',
  //   contents: [{ role: 'user', parts: [{ text: userRequest }] }],
  //   config: {
  //     responseMimeType: 'application/json',
  //     responseJsonSchema: {
  //       fileName: 'Path e.g. /components/Header.tsx',
  //       content: 'The full React/JSX source code with Tailwind',
  //     },
  //     // Thinking config allows the AI to plan the component structure first
  //     thinkingConfig: { includeThoughts: true },
  //   },
  // })
  // console.log('result', result)
  // if (result?.data) {
  //   const webApp = JSON.parse(result.data)
  //   return webApp
  // }

  return 'No result'
}
