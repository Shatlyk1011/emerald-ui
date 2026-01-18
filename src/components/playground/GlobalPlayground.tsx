'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FileExplorer from './FileExplorer'
import MonacoEditor from './MonacoEditor'
import PreviewFrame from './PreviewFrame'
import { DEMO_SITE } from '@/lib/constants'

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
export default function GlobalPlayground() {
  const generatedFiles = useAppStore((state) => state.generatedFiles)
  console.log('generatedFiles', generatedFiles)

  const [files, setFiles] = useState<Record<string, string>>({
    ...INITIAL_FILES,
    ...DEMO_SITE,
  })
  // const [files, setFiles] = useState<Record<string, string>>(FINAL)
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
              <Tabs defaultValue="editor" className="flex h-full flex-col">
                <div className='bg-muted/40 flex items-center justify-between border-b px-4'>
                  <TabsList className="h-10 bg-transparent p-0">
                    <TabsTrigger
                      value="editor"
                      className="data-[state=active]:bg-background relative h-10 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground shadow-none"
                    >
                      Editor
                    </TabsTrigger>
                    <TabsTrigger
                      value="chat"
                      className="data-[state=active]:bg-background relative h-10 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground shadow-none"
                    >
                      Chat
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="editor" className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col">
                  <ResizablePanelGroup className='flex min-h-0 flex-1' direction='horizontal'>
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                      <FileExplorer
                        files={files}
                        activeFile={activeFile}
                        onSelect={setActiveFile}
                      />
                    </ResizablePanel>
                    <ResizableHandle />

                    <ResizablePanel defaultSize={85} minSize={30} maxSize={80} className='min-w-0 flex-1 bg-[#1e1e1e] w-full'>
                      <MonacoEditor
                        filename={activeFile}
                        code={files[activeFile]}
                        onChange={handleCodeChange}
                      />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </TabsContent>

                <TabsContent value="chat" className="flex-1 min-h-0 mt-0 p-4 data-[state=active]:flex flex-col">
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex-1 border rounded-lg p-4 bg-muted/20">
                      <div className="text-muted-foreground text-sm text-center mt-10">
                        Chat history will appear here...
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 border rounded-md px-3 py-2 bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Type a message to generate UI..."
                      />
                      <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Send
                      </button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  )
}
