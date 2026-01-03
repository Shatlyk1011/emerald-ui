"use client";

import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import MonacoEditor from "./MonacoEditor";
import FileExplorer from "./FileExplorer";
import PreviewFrame from "./PreviewFrame";
import { useAppStore } from "@/store/useAppStore";
import { DEMO_SITE } from "@/lib/constants";

// Initial Template Files
const INITIAL_FILES = {
  "/main.jsx": `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`,
  "/App.jsx": ""
};


export default function GlobalPlayground() {
  const generatedFiles = useAppStore((state) => state.generatedFiles);
  // const [files, setFiles] = useState<Record<string, string>>({ ...INITIAL_FILES, ...generatedFiles });
  const [files, setFiles] = useState<Record<string, string>>(DEMO_SITE);
  const [activeFile, setActiveFile] = useState("/main.jsx");


  // Handle changes from Monaco
  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return;
    setFiles((prev) => ({
      ...prev,
      [activeFile]: value,
    }));
  };

  return (
    <section className="h-full w-full flex flex-col bg-background">
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel: Preview */}
          <ResizablePanel defaultSize={70} maxSize={80} minSize={20}>
            <PreviewFrame files={files} />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel: Editor */}
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="h-full flex flex-col">
              {/* Toolbar / Tabs */}
              <div className="bg-muted/40 border-b flex overflow-x-auto">
                {/* Better Tab UI could go here, for now using just the content area or integrating FileExplorer */}
              </div>

              <div className="flex-1 flex min-h-0">
                <FileExplorer
                  files={files}
                  activeFile={activeFile}
                  onSelect={setActiveFile}
                />
                <div className="flex-1 min-w-0 bg-[#1e1e1e]">
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
  );
}
