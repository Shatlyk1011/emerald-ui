"use client";

import { useEffect, useRef } from "react";

interface PreviewFrameProps {
    files: Record<string, string>;
}

const IFRAME_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <style>
      body { background-color: white; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <div id="error-boundary" style="color: red; padding: 20px; white-space: pre-wrap;"></div>

    <script>
      // 1. Runtime Shims
      window.process = { env: { NODE_ENV: 'production' } };

      const builtins = {
        'react': window.React,
        'react-dom': window.ReactDOM,
        'react-dom/client': window.ReactDOM, // React 18 createRoot usage shim
      };

      const customModules = {};

      function customRequire(path) {
        if (builtins[path]) return builtins[path];
        
        // Resolve path (very simple resolution for now)
        // e.g. "./Header" -> "/Header.jsx" if exists
        // assume all paths in 'files' start with /
        
        let resolvedPath = path;
        
        // Handle relative imports ./Header
        if (path.startsWith('./')) {
            resolvedPath = path.substring(1); // remove . (becomes /Header)
        }
        
        // Try exact match
        if (customModules[resolvedPath]) return executeModule(resolvedPath);
        // Try .jsx
        if (customModules[resolvedPath + '.jsx']) return executeModule(resolvedPath + '.jsx');
        // Try .js
        if (customModules[resolvedPath + '.js']) return executeModule(resolvedPath + '.js');
        
        // Try with leading slash if missing
        if (!resolvedPath.startsWith('/')) {
            const rooted = '/' + resolvedPath;
             if (customModules[rooted]) return executeModule(rooted);
             if (customModules[rooted + '.jsx']) return executeModule(rooted + '.jsx');
        }

        throw new Error(\`Cannot find module '\${path}'\`);
      }

      function executeModule(id) {
        const mod = customModules[id];
        if (mod.exports) return mod.exports; // cached

        const moduleEnv = { exports: {} };
        mod.fn(customRequire, moduleEnv.exports, moduleEnv);
        mod.exports = moduleEnv.exports;
        return moduleEnv.exports;
      }

      // 2. Compilation Handler
      window.addEventListener('message', (event) => {
        const { type, files } = event.data;
        if (type !== 'COMPILE') return;

        const root = document.getElementById('root');
        const err = document.getElementById('error-boundary');
        
        // Reset
        // root.innerHTML = ''; // Don't wipe immediately to prevent flash? 
        // Actually for a playground we want to remount.
        // Be careful with React unmounting.
        try {
            if (window.currentRoot) {
               // If using createRoot in the user code, we need a way to unmount?
               // User code usually does createRoot(el).render(<App/>)
               root.innerHTML = '';
            }
        } catch(e) {}
        
        err.innerText = '';
        
        // Clear cached modules
        Object.keys(customModules).forEach(k => delete customModules[k]);

        try {
           // Transpile all files
           Object.keys(files).forEach(filename => {
              const code = files[filename];
              // Transform to CommonJS
              const transformed = Babel.transform(code, {
                 presets: ['react', 'env'],
                 filename: filename,
              }).code;
              
              customModules[filename] = {
                 fn: new Function('require', 'exports', 'module', transformed),
                 exports: null
              };
           });
           
           // Execute Entry Point
           // Look for main.jsx or App.jsx or main.js
           if (customModules['/main.jsx']) customRequire('/main.jsx');
           else if (customModules['/main.js']) customRequire('/main.js');
           else if (customModules['/App.jsx']) customRequire('/App.jsx');
           else throw new Error("No entry point found (/main.jsx or /App.jsx)");
           
        } catch (e) {
            console.error(e);
            err.innerText = e.message;
        }
      });
    </script>
  </body>
</html>
`;

export default function PreviewFrame({ files }: PreviewFrameProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        // Send files to iframe
        const handleLoad = () => {
            iframe.contentWindow?.postMessage({ type: "COMPILE", files }, "*");
        };

        // If already loaded
        if (iframe.contentDocument?.readyState === 'complete') {
            handleLoad();
        } else {
            iframe.addEventListener('load', handleLoad);
            return () => iframe.removeEventListener('load', handleLoad);
        }
    }, []); // Only on mount logic? No, we need to send updates.

    // Debounced update
    useEffect(() => {
        const timer = setTimeout(() => {
            iframeRef.current?.contentWindow?.postMessage({ type: "COMPILE", files }, "*");
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [files]);

    return (
        <div className="h-full w-full bg-white relative">
            <iframe
                ref={iframeRef}
                srcDoc={IFRAME_HTML}
                className="h-full w-full border-0"
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-popups" // need same-origin for react?
            />
        </div>
    );
}
