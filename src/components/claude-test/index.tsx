'use client'
import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import {
  Send,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true,
})

// System prompt for code generation
const CODE_GENERATOR_PROMPT = `You are a senior React developer. Generate production-ready code using ONLY React and Tailwind CSS:
- Follow React best practices and hooks patterns
- Use ONLY Tailwind CSS for styling (no other CSS frameworks)
- Implement proper error handling
- Include comprehensive comments
- Ensure accessibility compliance
- Make components reusable and maintainable

IMPORTANT: Return your response as a valid JSON object with file paths as keys and code as values.
Example structure:
{
  "/main.jsx": "// Main entry point code here",
  "/App.jsx": "// App component code here",
  "/components/Header.jsx": "// Header component code here",
  "/components/Footer.jsx": "// Footer component code here"
}

Do NOT include markdown code blocks or any other formatting. Return ONLY the JSON object.`

const CodeGeneratorApp = () => {
  return <span>hello</span>
}
// const CodeGeneratorApp = () => {
//   const [userRequest, setUserRequest] = useState('')
//   const [imageFile, setImageFile] = useState(null)
//   const [imagePreview, setImagePreview] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)
//   const [error, setError] = useState<string | null>(null)

//   // Call Claude API
//   const generateCode = async () => {
//     if (!userRequest && !imageFile) {
//       setError('Please provide a text description or image')
//       return
//     }

//     setLoading(true)
//     setResult(null)
//     setError(null)

//     try {
//       // Build content array
//       const content = []

//       // Add text prompt
//       const textPrompt = userRequest || 'Convert this design to React code with Tailwind CSS'
//       content.push({
//         type: 'text',
//         text: textPrompt,
//       })

//       // Call Claude API
//       const response = await anthropic.messages.create({
//         model: 'claude-sonnet-4-5',
//         max_tokens: 1500,
//         messages: [
//           {
//             role: 'user',
//             content: userRequest
//           },
//         ],
//         system: CODE_GENERATOR_PROMPT,
//       })

//       const responseText = response.content[0].text

//       // Parse the JSON response
//       let jsonText = responseText.trim()
//       // Remove markdown code blocks if present
//       jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')

//       const parsedResult = JSON.parse(jsonText)
//       setResult(parsedResult)
//     } catch (err) {
//       console.error('Generation error:', err)
//       setError(err.message || 'Failed to generate code')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const clearAll = () => {
//     setUserRequest('')
//     setImageFile(null)
//     setImagePreview(null)
//     setResult(null)
//     setError(null)
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8'>
//       <div className='mx-auto max-w-7xl'>
//         {/* Header */}
//         <div className='mb-8 text-center'>
//           <h1 className='mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl'>
//             AI Code Generator
//           </h1>
//           <p className='text-sm text-purple-200 md:text-base'>
//             React + Tailwind CSS Code Generation
//           </p>
//         </div>

//         <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
//           {/* Input Panel */}
//           <div className='rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
//             <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-white'>
//               Input
//             </h2>

//             <div className='space-y-4'>
//               <div>
//                 <label className='mb-2 block text-sm font-medium text-purple-200'>
//                   Description
//                 </label>
//                 <textarea
//                   value={userRequest}
//                   onChange={(e) => setUserRequest(e.target.value)}
//                   placeholder='Describe the component you want to generate...'
//                   className='w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:ring-2 focus:ring-purple-500'
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 <label className='mb-2 flex items-center gap-2 text-sm font-medium text-purple-200'>
//                   <ImageIcon className='h-4 w-4' />
//                   Design Image (optional)
//                 </label>
//                 {imagePreview && (
//                   <div className='relative mt-3 overflow-hidden rounded-lg border border-white/20'>
//                     <img
//                       src={imagePreview}
//                       alt='Design preview'
//                       className='h-40 w-full object-cover'
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className='flex gap-3'>
//                 <button
//                   onClick={generateCode}
//                   disabled={loading || (!userRequest && !imageFile)}
//                   className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600'
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className='h-4 w-4 animate-spin' />
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <Send className='h-4 w-4' />
//                         Generate Code
//                     </>
//                   )}
//                 </button>

//                 <button
//                   onClick={clearAll}
//                   disabled={loading}
//                   className='rounded-lg bg-white/10 px-6 py-3 font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50'
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div className='mt-4 flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/20 p-4'>
//                 <AlertCircle className='mt-0.5 h-5 w-5 flex-shrink-0 text-red-400' />
//                 <p className='text-sm text-red-200'>{error}</p>
//               </div>
//             )}
//           </div>

//           {/* Result Panel */}
//           <div className='rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
//             <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-white'>
//               {result ? (
//                 <>
//                   <CheckCircle className='h-5 w-5 text-green-400' />
//                   Generated Files
//                 </>
//               ) : (
//                 'Output'
//               )}
//             </h2>

//             {!result && !loading && (
//               <div className='flex h-64 items-center justify-center'>
//                 <p className='text-sm text-purple-200/60'>
//                   Generated code will appear here...
//                 </p>
//               </div>
//             )}

//             {loading && (
//               <div className='flex h-64 items-center justify-center'>
//                 <Loader2 className='h-8 w-8 animate-spin text-purple-300' />
//               </div>
//             )}

//             {result && (
//               <div className='space-y-4'>
//                 {Object.entries(result).map(([filePath, code]) => (
//                   <div key={filePath} className='rounded-lg border border-white/10 bg-white/5'>
//                     <div className='flex items-center justify-between border-b border-white/10 px-4 py-2'>
//                       <span className='font-mono text-sm text-purple-300'>{filePath}</span>
//                       <button
//                         onClick={() => navigator.clipboard.writeText(code)}
//                         className='rounded bg-purple-500 px-3 py-1 text-xs text-white transition-colors hover:bg-purple-600'
//                       >
//                         Copy
//                       </button>
//                     </div>
//                     <pre className='max-h-64 overflow-auto p-4 font-mono text-xs text-green-400'>
//                       {code}
//                     </pre>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(168, 85, 247, 0.4);
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(168, 85, 247, 0.6);
//         }
//       `}</style>
//     </div>
//   )
// }

export default CodeGeneratorApp
