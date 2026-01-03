"use client";

import { File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
    files: Record<string, string>;
    activeFile: string;
    onSelect: (filename: string) => void;
}

export default function FileExplorer({ files, activeFile, onSelect }: FileExplorerProps) {
    const fileList = Object.keys(files).sort((a, b) => {
        // Basic sort: components first or alphabetical?
        // Let's standard sort
        return a.localeCompare(b);
    });

    return (
        <div className="flex flex-col border-r bg-muted/10 h-full w-48 text-sm">
            <div className="p-3 font-semibold text-muted-foreground uppercase text-xs tracking-wider border-b">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                {fileList.map((filename) => {
                    const isActive = activeFile === filename;
                    return (
                        <button
                            key={filename}
                            onClick={() => onSelect(filename)}
                            className={cn(
                                "flex items-center gap-2 w-full px-4 py-1.5 text-left hover:bg-accent/50 hover:text-accent-foreground transition-colors",
                                isActive && "bg-accent text-accent-foreground font-medium border-l-2 border-primary pl-[14px]"
                            )}
                        >
                            <File className="w-4 h-4 opacity-70" />
                            <span className="truncate">{filename.replace(/^\//, "")}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
