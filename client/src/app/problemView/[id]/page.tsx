'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import NavBar from '@/components/user/Navbar'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import material from '@uiw/codemirror-themes'
import { tags } from "@codemirror/highlight"
import { submitCode } from '@/api/compilation'


const ProblemPage = () => {
  const [problem, setProblem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const [code, setCode] = useState('')
  const [language, setlanguage] = useState('js')

  const problemId = pathname.split('/').pop() || ''

  const handleSubmit = async () => {
  
    try {
      const response: any = await submitCode(code, language)
  
      if (response.status === 200) {
        console.log("Success:", response.data);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error:any) {
      console.error("Error submitting code:", error.message);
    }
  };
  

  useEffect(() => {
    if (!problemId) return

    axios
      .get(`http://localhost:5002/problem/getProblem/${problemId}`)
      .then((response) => {
        setProblem(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching problem:', error)
        setLoading(false)
      })
  }, [problemId])

  if (loading) {
    return <div className="text-center text-xl text-gray-400">Loading problem...</div>
  }

  return (
    <div className="bg-gray-900 text-gray-200 h-screen flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex flex-1">
        {/* Problem Details */}
        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-4">{problem.title}</h2>
          <p className="text-lg mb-6">{problem.description}</p>
          <div>
            <h3 className="text-xl font-medium mb-2">Input Format</h3>
            <div className="p-4 bg-gray-700 rounded-md shadow-sm mb-4">
              <pre className="text-sm">{JSON.stringify(problem.inputFormat, null, 2)}</pre>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Output Format</h3>
            <div className="p-4 bg-gray-700 rounded-md shadow-sm">
              <pre className="text-sm">{problem.outputFormat.description}</pre>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 p-6 bg-gray-900 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-medium">Your Solution</h3>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              RUN
            </button>
          </div>
          <CodeMirror
            value={code}
            width = "600px"
            height="600px"
            theme={material({
              theme: "dark",
              settings: {
                background: "#1e1e1e",
                foreground: "#d4d4d4",
                caret: "#00e676",
                selection: "#264f78",
                selectionMatch: "#528bff",
              },
              styles: [
                { tag: (tags.keyword as any), color: "#c792ea" },
                { tag: (tags.string as any), color: "#ecc48d" },
                { tag: (tags.variableName as any), color: "#82aaff" },
              ],              
              
            })}
            //extensions={[javascript()]}
            onChange={(value) => {
              setCode(value)
            }}
          />
        </div>

        {/* Test Cases */}
        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
          <h3 className="text-2xl font-medium mb-4">Test Cases</h3>
          <div className="p-4 bg-gray-700 rounded-md shadow-sm">
            <pre className="text-sm">Test case data will go here.</pre>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400 py-4 text-center">
        <p>&copy; 2024 Quick Test. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default ProblemPage
