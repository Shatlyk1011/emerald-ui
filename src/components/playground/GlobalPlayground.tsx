'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import FileExplorer from './FileExplorer'
import MonacoEditor from './MonacoEditor'
import PreviewFrame from './PreviewFrame'

// Initial Template Files
const INITIAL_FILES = {
  '/main.jsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`,
  '/App.jsx': '',
}
const FINAL = {

}

export default function GlobalPlayground() {
  const generatedFiles = useAppStore((state) => state.generatedFiles)
  console.log('generatedFiles', generatedFiles)

  // const [files, setFiles] = useState<Record<string, string>>({
  // ...INITIAL_FILES,
  // ...generatedFiles,
  // })
  const [files, setFiles] = useState<Record<string, string>>(FINAL)
  const [activeFile, setActiveFile] = useState('/main.jsx')

  // Handle changes from Monaco
  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return
    setFiles((prev) => ({
      ...prev,
      [activeFile]: value,
    }))
  }

  return (
    <section className='bg-background flex h-full w-full flex-col'>
      <div className='min-h-0 flex-1'>
        <ResizablePanelGroup direction='horizontal'>
          {/* Left Panel: Preview */}
          <ResizablePanel defaultSize={70} maxSize={80} minSize={20}>
            <PreviewFrame files={files} />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel: Editor */}
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className='flex h-full flex-col'>
              {/* Toolbar / Tabs */}
              <div className='bg-muted/40 flex overflow-x-auto border-b'>
                {/* Better Tab UI could go here, for now using just the content area or integrating FileExplorer */}
              </div>

              <div className='flex min-h-0 flex-1'>
                <FileExplorer
                  files={files}
                  activeFile={activeFile}
                  onSelect={setActiveFile}
                />
                <div className='min-w-0 flex-1 bg-[#1e1e1e]'>
                  <MonacoEditor
                    filename={activeFile}
                    code={files[activeFile]}
                    onChange={handleCodeChange}
                  />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  )
}
