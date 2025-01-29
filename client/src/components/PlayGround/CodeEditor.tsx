'use client'
import React from "react";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";


interface CodeEditorProps {
    code: string;
    onCodeChange: (value: string) => void;
    width?: string;
    height?: string;
}

const CodeEditor : React.FC<CodeEditorProps>  = ({ code, onCodeChange, width = "600px", height = "730px" }) => {
  return (
    <div className="p-6 bg-gray-900 flex flex-col">
      <CodeMirror
        value={code}
        width={width}
        height={height}
        theme={vscodeDark}
        extensions={[javascript()]}
        onPasteCapture={() =>
          toast.error(
            <div style={{ textAlign: "center" }}>
              Try solving it yourself! <br />
              Looks like you're trying to paste!
            </div>
          )
        }
        onChange={onCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
