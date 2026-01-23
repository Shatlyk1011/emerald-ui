/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { useState, useCallback } from 'react'
import Anthropic from '@anthropic-ai/sdk'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true, // Required for client-side usage
})

import {
  Send,
  Image,
  Link,
  Code,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

// Skills configuration
const SKILLS = {
  url_analyzer: {
    name: 'URL Website Analyzer',
    description: 'Fetches and analyzes website structure from a URL',
    systemPrompt: `You are a website analyzer. Analyze the provided website and return:
- Layout structure and grid system
- Color palette and design tokens
- Typography system
- Component patterns identified
- Responsive breakpoints
Return your analysis in structured JSON format.`,
    requiresUrl: true,
  },

  component_extractor: {
    name: 'Component Extractor',
    description: 'Identifies and extracts UI components from designs',
    systemPrompt: `You are a component extraction specialist. Analyze the design and:
- List all identifiable UI components
- Extract their visual properties (colors, sizes, spacing)
- Determine component hierarchy
- Specify component states (hover, active, disabled)
Return structured component specifications.`,
    requiresImage: true,
  },

  image_to_code: {
    name: 'Image to Code Converter',
    description: 'Converts design screenshots to React/HTML code',
    systemPrompt: `You are an expert at converting visual designs into code.
Generate clean, production-ready React code with:
- Semantic HTML structure
- Tailwind CSS for styling
- Proper component composition
- Accessibility attributes (ARIA labels, roles)
- Responsive design patterns`,
    requiresImage: true,
  },

  layout_analyzer: {
    name: 'Layout Analyzer',
    description: 'Analyzes and extracts layout patterns',
    systemPrompt: `You are a layout analysis expert. Analyze the design and extract:
- Grid system (columns, gutters, margins)
- Spacing scale and rhythm
- Container widths and breakpoints
- Flexbox/Grid usage patterns
Provide a detailed layout specification.`,
  },

  code_generator: {
    name: 'Code Generator',
    description: 'Generates React components from specifications',
    systemPrompt: `You are a senior React developer. Generate production-ready code:
- Follow React best practices and hooks patterns
- Use TypeScript if applicable
- Implement proper error handling
- Include comprehensive comments
- Ensure accessibility compliance
- Make components reusable and maintainable`,
  },

  design_system_builder: {
    name: 'Design System Builder',
    description: 'Creates design system tokens from analysis',
    systemPrompt: `You are a design systems expert. Create a comprehensive design system including:
- Color tokens (primary, secondary, semantic colors)
- Typography scale (font families, sizes, weights, line heights)
- Spacing scale
- Border radius values
- Shadow definitions
Export as CSS variables or JS tokens.`,
  },
}

const DesignGenerationApp = () => {
  const [userRequest, setUserRequest] = useState('')
  const [url, setUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<unknown[]>([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Add log entry
  const addLog = useCallback((message: string, type = 'info') => {
    setLogs((prev) => {
      return [
        ...prev,
        {
          message,
          type,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]
    })
  }, [])

  // Convert image to base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  // Call Claude API using the SDK
  const callClaude = async (messages, systemPrompt = null) => {
    const params = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages,
    }

    if (systemPrompt) {
      params.system = systemPrompt
    }

    const response = await anthropic.messages.create(params)
    return response.content[0].text
  }

  // Determine which skills to use
  const determineSkills = async (
    request: string,
    hasUrl: boolean,
    hasImage: boolean
  ) => {
    const skillsList = Object.entries(SKILLS)
      .map(([id, skill]) => `- ${id}: ${skill.description}`)
      .join('\n')

    const routerPrompt = `You are a request router for a design generation system.

Available skills:
${skillsList}

User request: "${request}"
Context:
- Has URL: ${hasUrl}
- Has image: ${hasImage}

Analyze the request and determine:
1. Which skills are needed to fulfill this request
2. The optimal execution order for these skills
3. Your reasoning for this decision

Respond ONLY with valid JSON (no markdown, no backticks):
{
  "skills_needed": ["skill_id1", "skill_id2"],
  "reasoning": "explanation",
  "execution_order": ["skill_id1", "skill_id2"]
}`

    const response = await callClaude([
      {
        role: 'user',
        content: routerPrompt,
      },
    ])

    // Parse response, removing any markdown code blocks
    let jsonText = response.trim()
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')

    return JSON.parse(jsonText)
  }

  // Execute a single skill
  const executeSkill = async (
    skillId,
    request,
    imageBase64,
    urlValue,
    previousResults
  ) => {
    const skill = SKILLS[skillId]

    if (!skill) {
      throw new Error(`Unknown skill: ${skillId}`)
    }

    // Build the content array
    const content = []

    // Add image if skill requires it and it's available
    if (skill.requiresImage && imageBase64) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageFile?.type || 'image/jpeg',
          data: imageBase64,
        },
      })
    }

    // Build text prompt
    let textPrompt = `User request: ${request}\n\n`

    if (skill.requiresUrl && urlValue) {
      textPrompt += `URL to analyze: ${urlValue}\n\n`
    }

    if (Object.keys(previousResults).length > 0) {
      textPrompt += `Previous skill results:\n${JSON.stringify(previousResults, null, 2)}\n\n`
    }

    textPrompt += `Execute your task according to your role.`

    content.push({
      type: 'text',
      text: textPrompt,
    })

    const response = await callClaude(
      [
        {
          role: 'user',
          content,
        },
      ],
      skill.systemPrompt
    )

    return response
  }

  // Synthesize final output
  const synthesizeOutput = async (request, routing, skillResults) => {
    const synthesisPrompt = `You are synthesizing the final output for a design generation request.

Original request: "${request}"

Skills executed: ${routing.skills_needed.join(', ')}
Reasoning: ${routing.reasoning}

Skill results:
${JSON.stringify(skillResults, null, 2)}

Based on all the gathered information, generate the final output that best fulfills the user's request. This should be production-ready code or a comprehensive design specification, depending on what was requested.`

    return await callClaude(
      [
        {
          role: 'user',
          content: synthesisPrompt,
        },
      ],
      'You are an expert at synthesizing information from multiple sources to create cohesive, production-ready outputs.'
    )
  }

  // Main generation function
  const handleGenerate = async () => {
    if (!userRequest && !url && !imageFile) {
      setError('Please provide at least a text description, URL, or image')
      return
    }

    setLoading(true)
    setLogs([])
    setResult(null)
    setError(null)

    try {
      // Convert image to base64 if present
      let imageBase64 = null
      if (imageFile) {
        addLog('Converting image to base64...', 'info')
        imageBase64 = await imageToBase64(imageFile)
      }

      // Step 1: Determine which skills are needed
      addLog('Analyzing request context...', 'info')
      const routing = await determineSkills(userRequest, !!url, !!imageBase64)

      addLog(`Selected skills: ${routing.skills_needed.join(', ')}`, 'success')
      addLog(`Reasoning: ${routing.reasoning}`, 'info')

      // Step 2: Execute skills in order
      const skillResults = {}

      for (const skillId of routing.execution_order) {
        addLog(`Executing skill: ${SKILLS[skillId].name}...`, 'info')

        const result = await executeSkill(
          skillId,
          userRequest,
          imageBase64,
          url,
          skillResults
        )

        skillResults[skillId] = result
        addLog(`✓ Completed: ${SKILLS[skillId].name}`, 'success')
      }

      // Step 3: Synthesize final output
      addLog('Synthesizing final output...', 'info')
      const finalOutput = await synthesizeOutput(
        userRequest,
        routing,
        skillResults
      )

      setResult({
        code: finalOutput,
        skillsUsed: routing.skills_needed,
        reasoning: routing.reasoning,
        intermediateResults: skillResults,
      })

      addLog('✓ Generation complete!', 'success')
    } catch (err) {
      console.error('Generation error:', err)
      setError(err.message)
      addLog(`Error: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setUserRequest('')
    setUrl('')
    setImageFile(null)
    setImagePreview(null)
    setLogs([])
    setResult(null)
    setError(null)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent text-white md:text-5xl'>
            AI Design Generator
          </h1>
          <p className='text-sm text-purple-200 md:text-base'>
            Claude API with Smart Skill Routing
          </p>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Input Panel */}
          <div className='rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
            <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-white'>
              <Code className='h-5 w-5' />
              Input
            </h2>

            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-purple-200'>
                  Text Description
                </label>
                <textarea
                  value={userRequest}
                  onChange={(e) => setUserRequest(e.target.value)}
                  placeholder='Describe the component you want to generate...'
                  className='w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  rows={4}
                />
              </div>

              <div>
                <label className='mb-2 block flex items-center gap-2 text-sm font-medium text-purple-200'>
                  <Link className='h-4 w-4' />
                  Website URL (optional)
                </label>
                <input
                  type='text'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder='https://example.com'
                  className='w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none'
                />
              </div>

              <div>
                <label className='mb-2 block flex items-center gap-2 text-sm font-medium text-purple-200'>
                  <Image className='h-4 w-4' />
                  Design Image (optional)
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white transition-all file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-white hover:file:bg-purple-600'
                />
                {imagePreview && (
                  <div className='relative mt-3 overflow-hidden rounded-lg border border-white/20'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='h-40 w-full object-cover'
                    />
                  </div>
                )}
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={handleGenerate}
                  disabled={loading || (!userRequest && !url && !imageFile)}
                  className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600'
                >
                  {loading ? (
                    <>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className='h-4 w-4' />
                      Generate
                    </>
                  )}
                </button>

                <button
                  onClick={clearAll}
                  disabled={loading}
                  className='rounded-lg bg-white/10 px-6 py-3 font-medium text-white transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Clear
                </button>
              </div>
            </div>

            {error && (
              <div className='mt-4 flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/20 p-4'>
                <AlertCircle className='mt-0.5 h-5 w-5 flex-shrink-0 text-red-400' />
                <p className='text-sm text-red-200'>{error}</p>
              </div>
            )}
          </div>

          {/* Logs Panel */}
          <div className='rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
            <h2 className='mb-4 text-xl font-semibold text-white'>
              Execution Log
            </h2>

            <div className='custom-scrollbar max-h-96 space-y-2 overflow-y-auto pr-2'>
              {logs.length === 0 ? (
                <div className='py-8 text-center'>
                  <Loader2 className='mx-auto mb-2 h-8 w-8 text-purple-300/40' />
                  <p className='text-sm text-purple-200/60'>
                    Waiting for request...
                  </p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className='flex items-start gap-2 rounded bg-white/5 p-2 text-sm'
                  >
                    <span className='flex-shrink-0 font-mono text-xs text-purple-300'>
                      {log.timestamp}
                    </span>
                    <span
                      className={`flex-1 ${
                        log.type === 'success'
                          ? 'text-green-400'
                          : log.type === 'error'
                            ? 'text-red-400'
                            : 'text-purple-200'
                      }`}
                    >
                      {log.type === 'success' && (
                        <CheckCircle className='mr-1 inline h-3 w-3' />
                      )}
                      {log.type === 'error' && (
                        <AlertCircle className='mr-1 inline h-3 w-3' />
                      )}
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Result Panel */}
        {result && (
          <div className='mb-6 rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
            <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-white'>
              <CheckCircle className='h-5 w-5 text-green-400' />
              Generated Output
            </h2>

            <div className='mb-4 rounded-lg border border-white/10 bg-white/5 p-4'>
              <p className='mb-2 text-sm text-purple-200'>
                <strong className='text-purple-300'>Skills Used:</strong>{' '}
                {result.skillsUsed
                  .map((skillId) => SKILLS[skillId].name)
                  .join(', ')}
              </p>
              <p className='text-sm text-purple-200'>
                <strong className='text-purple-300'>Reasoning:</strong>{' '}
                {result.reasoning}
              </p>
            </div>

            <div className='relative'>
              <pre className='max-h-96 overflow-x-auto rounded-lg border border-green-500/20 bg-slate-950 p-4 font-mono text-sm text-green-400'>
                {result.code}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(result.code)}
                className='absolute top-2 right-2 rounded bg-purple-500 px-3 py-1 text-xs text-white transition-colors hover:bg-purple-600'
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {/* Skills Reference */}
        <div className='rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
          <h2 className='mb-4 text-xl font-semibold text-white'>
            Available Skills
          </h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Object.entries(SKILLS).map(([id, skill]) => (
              <div
                key={id}
                className='rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10'
              >
                <h3 className='mb-2 text-sm font-semibold text-purple-300'>
                  {skill.name}
                </h3>
                <p className='text-xs leading-relaxed text-purple-200/80'>
                  {skill.description}
                </p>
                <div className='mt-2 flex gap-2'>
                  {skill.requiresUrl && (
                    <span className='rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-300'>
                      URL
                    </span>
                  )}
                  {skill.requiresImage && (
                    <span className='rounded bg-pink-500/20 px-2 py-1 text-xs text-pink-300'>
                      Image
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  )
}

export default DesignGenerationApp
