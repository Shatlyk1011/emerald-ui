'use client'

import Editor from '@monaco-editor/react'

interface MonacoEditorProps {
  code: string
  onChange: (value: string | undefined) => void
  language?: string
  filename: string
}

export default function MonacoEditor({
  code,
  onChange,
  filename,
}: MonacoEditorProps) {
  // Simple theme strategy: hardcode vs-dark as it's standard for dev tools
  // Or could follow system theme if desired, but vs-dark looks good.
  const theme = 'vs-dark'

  return (
    <div className='h-full w-full overflow-hidden rounded-md border bg-[#1e1e1e]'>
      <Editor
        height='100%'
        width='100%'
        language='javascript' // Force javascript for JSX support
        path={filename} // Important for IntelliSense isolation
        value={code}
        theme={theme}
        onChange={onChange}
        defaultLanguage='javascript'
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          fontFamily: 'var(--font-mono)',
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}
