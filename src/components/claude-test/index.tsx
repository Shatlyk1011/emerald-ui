/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
'use client'
import { useState, useCallback } from 'react';
import { Send, Image, Link, Code, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Skills configuration
const SKILLS = {
  url_analyzer: {
    name: "URL Website Analyzer",
    description: "Fetches and analyzes website structure from a URL",
    systemPrompt: `You are a website analyzer. Analyze the provided website and return:
- Layout structure and grid system
- Color palette and design tokens
- Typography system
- Component patterns identified
- Responsive breakpoints
Return your analysis in structured JSON format.`,
    requiresUrl: true
  },
  
  component_extractor: {
    name: "Component Extractor",
    description: "Identifies and extracts UI components from designs",
    systemPrompt: `You are a component extraction specialist. Analyze the design and:
- List all identifiable UI components
- Extract their visual properties (colors, sizes, spacing)
- Determine component hierarchy
- Specify component states (hover, active, disabled)
Return structured component specifications.`,
    requiresImage: true
  },
  
  image_to_code: {
    name: "Image to Code Converter",
    description: "Converts design screenshots to React/HTML code",
    systemPrompt: `You are an expert at converting visual designs into code.
Generate clean, production-ready React code with:
- Semantic HTML structure
- Tailwind CSS for styling
- Proper component composition
- Accessibility attributes (ARIA labels, roles)
- Responsive design patterns`,
    requiresImage: true
  },
  
  layout_analyzer: {
    name: "Layout Analyzer",
    description: "Analyzes and extracts layout patterns",
    systemPrompt: `You are a layout analysis expert. Analyze the design and extract:
- Grid system (columns, gutters, margins)
- Spacing scale and rhythm
- Container widths and breakpoints
- Flexbox/Grid usage patterns
Provide a detailed layout specification.`
  },
  
  code_generator: {
    name: "Code Generator",
    description: "Generates React components from specifications",
    systemPrompt: `You are a senior React developer. Generate production-ready code:
- Follow React best practices and hooks patterns
- Use TypeScript if applicable
- Implement proper error handling
- Include comprehensive comments
- Ensure accessibility compliance
- Make components reusable and maintainable`
  },
  
  design_system_builder: {
    name: "Design System Builder",
    description: "Creates design system tokens from analysis",
    systemPrompt: `You are a design systems expert. Create a comprehensive design system including:
- Color tokens (primary, secondary, semantic colors)
- Typography scale (font families, sizes, weights, line heights)
- Spacing scale
- Border radius values
- Shadow definitions
Export as CSS variables or JS tokens.`
  }
};

const DesignGenerationApp = () => {
  const [userRequest, setUserRequest] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<unknown[]>([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Add log entry
  const addLog = useCallback((message:string, type = 'info') => {
    setLogs(prev => {
      return [...prev, {
        message,
        type,
        timestamp: new Date().toLocaleTimeString()
      }];
    });
  }, []);

  // Convert image to base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Call Claude API
  const callClaude = async (messages, systemPrompt = null) => {
    const requestBody = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages
    };

    if (systemPrompt) {
      requestBody.system = systemPrompt;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: In production, use a backend proxy to avoid exposing API key
        'x-api-key': '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',
        // 'anthropic-version': '2023-06-01'
        "anthropic-dangerous-direct-browser-access": 'true'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  };

  // Determine which skills to use
  const determineSkills = async (request: string, hasUrl: boolean, hasImage: boolean) => {
    const skillsList = Object.entries(SKILLS)
      .map(([id, skill]) => `- ${id}: ${skill.description}`)
      .join('\n');

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
}`;

    const response = await callClaude([{
      role: 'user',
      content: routerPrompt
    }]);

    // Parse response, removing any markdown code blocks
    let jsonText = response.trim();
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    return JSON.parse(jsonText);
  };

  // Execute a single skill
  const executeSkill = async (skillId, request, imageBase64, urlValue, previousResults) => {
    const skill = SKILLS[skillId];
    
    if (!skill) {
      throw new Error(`Unknown skill: ${skillId}`);
    }

    // Build the content array
    const content = [];
    
    // Add image if skill requires it and it's available
    if (skill.requiresImage && imageBase64) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageFile?.type || 'image/jpeg',
          data: imageBase64
        }
      });
    }
    
    // Build text prompt
    let textPrompt = `User request: ${request}\n\n`;
    
    if (skill.requiresUrl && urlValue) {
      textPrompt += `URL to analyze: ${urlValue}\n\n`;
    }
    
    if (Object.keys(previousResults).length > 0) {
      textPrompt += `Previous skill results:\n${JSON.stringify(previousResults, null, 2)}\n\n`;
    }
    
    textPrompt += `Execute your task according to your role.`;
    
    content.push({
      type: 'text',
      text: textPrompt
    });

    const response = await callClaude([{
      role: 'user',
      content
    }], skill.systemPrompt);

    return response;
  };

  // Synthesize final output
  const synthesizeOutput = async (request, routing, skillResults) => {
    const synthesisPrompt = `You are synthesizing the final output for a design generation request.

Original request: "${request}"

Skills executed: ${routing.skills_needed.join(', ')}
Reasoning: ${routing.reasoning}

Skill results:
${JSON.stringify(skillResults, null, 2)}

Based on all the gathered information, generate the final output that best fulfills the user's request. This should be production-ready code or a comprehensive design specification, depending on what was requested.`;

    return await callClaude([{
      role: 'user',
      content: synthesisPrompt
    }], 'You are an expert at synthesizing information from multiple sources to create cohesive, production-ready outputs.');
  };

  // Main generation function
  const handleGenerate = async () => {
    if (!userRequest && !url && !imageFile) {
      setError('Please provide at least a text description, URL, or image');
      return;
    }

    setLoading(true);
    setLogs([]);
    setResult(null);
    setError(null);

    try {
      // Convert image to base64 if present
      let imageBase64 = null;
      if (imageFile) {
        addLog('Converting image to base64...', 'info');
        imageBase64 = await imageToBase64(imageFile);
      }

      // Step 1: Determine which skills are needed
      addLog('Analyzing request context...', 'info');
      const routing = await determineSkills(userRequest, !!url, !!imageBase64);
      
      addLog(`Selected skills: ${routing.skills_needed.join(', ')}`, 'success');
      addLog(`Reasoning: ${routing.reasoning}`, 'info');

      // Step 2: Execute skills in order
      const skillResults = {};
      
      for (const skillId of routing.execution_order) {
        addLog(`Executing skill: ${SKILLS[skillId].name}...`, 'info');
        
        const result = await executeSkill(
          skillId,
          userRequest,
          imageBase64,
          url,
          skillResults
        );
        
        skillResults[skillId] = result;
        addLog(`✓ Completed: ${SKILLS[skillId].name}`, 'success');
      }

      // Step 3: Synthesize final output
      addLog('Synthesizing final output...', 'info');
      const finalOutput = await synthesizeOutput(userRequest, routing, skillResults);
      
      setResult({
        code: finalOutput,
        skillsUsed: routing.skills_needed,
        reasoning: routing.reasoning,
        intermediateResults: skillResults
      });
      
      addLog('✓ Generation complete!', 'success');
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message);
      addLog(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUserRequest('');
    setUrl('');
    setImageFile(null);
    setImagePreview(null);
    setLogs([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            AI Design Generator
          </h1>
          <p className="text-purple-200 text-sm md:text-base">
            Claude API with Smart Skill Routing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Input
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Text Description
                </label>
                <textarea
                  value={userRequest}
                  onChange={(e) => setUserRequest(e.target.value)}
                  placeholder="Describe the component you want to generate..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Website URL (optional)
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Design Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer transition-all"
                />
                {imagePreview && (
                  <div className="mt-3 relative rounded-lg overflow-hidden border border-white/20">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={loading || (!userRequest && !url && !imageFile)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </button>
                
                <button
                  onClick={clearAll}
                  disabled={loading}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Logs Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">Execution Log</h2>
            
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 text-purple-300/40 mx-auto mb-2" />
                  <p className="text-purple-200/60 text-sm">Waiting for request...</p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm p-2 rounded bg-white/5">
                    <span className="text-purple-300 font-mono text-xs flex-shrink-0">
                      {log.timestamp}
                    </span>
                    <span className={`flex-1 ${
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      'text-purple-200'
                    }`}>
                      {log.type === 'success' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {log.type === 'error' && <AlertCircle className="w-3 h-3 inline mr-1" />}
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
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Generated Output
            </h2>
            
            <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-purple-200 mb-2">
                <strong className="text-purple-300">Skills Used:</strong>{' '}
                {result.skillsUsed.map(skillId => SKILLS[skillId].name).join(', ')}
              </p>
              <p className="text-sm text-purple-200">
                <strong className="text-purple-300">Reasoning:</strong> {result.reasoning}
              </p>
            </div>
            
            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-green-400 font-mono text-sm max-h-96 border border-green-500/20">
                {result.code}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(result.code)}
                className="absolute top-2 right-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {/* Skills Reference */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Available Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(SKILLS).map(([id, skill]) => (
              <div key={id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="font-semibold text-purple-300 mb-2 text-sm">{skill.name}</h3>
                <p className="text-xs text-purple-200/80 leading-relaxed">{skill.description}</p>
                <div className="mt-2 flex gap-2">
                  {skill.requiresUrl && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">URL</span>
                  )}
                  {skill.requiresImage && (
                    <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded">Image</span>
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
  );
};

export default DesignGenerationApp;