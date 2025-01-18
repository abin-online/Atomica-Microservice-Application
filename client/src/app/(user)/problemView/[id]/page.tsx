'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import material from '@uiw/codemirror-themes'
import { tags } from "@codemirror/highlight"
import { submitCode, runCode } from '@/api/compilation'
import socket from '@/lib/socket'
import { viewProblem } from '@/api/problem'
import { v4 as uuidv4 } from 'uuid'
import { createCollaboration, endCollaboration, joinCollaboration } from '@/api/collaboration'
import toast from 'react-hot-toast'
import CongratulatoryModal from '@/components/user/CongratulatoryModal'
import { updateProblemScore } from '@/api/badge'

const ProblemPage = () => {
  const [problem, setProblem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const [code, setCode] = useState('')
  const [params, setParams] = useState<any[]>([])
  const [language, setlanguage] = useState('js')
  const [testCases, setTestCases] = useState<any[]>([])
  const [testResults, setTestResults] = useState<any[]>([])
  const [submissionResults, setSubmissionResults] = useState<any[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [joinSessionId, setJoinSessionId] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [timer, setTimer] = useState<number>(0)
  const [timerActive, setTimerActive] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalTests, setTotalTests] = useState(0);
  const [passedTests, setPassedTests] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<string>("");
  const [allPassed, setAllPassed] = useState(false)
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  const [showAll, setShowAll] = useState(false);


  const problemId = pathname.split('/').pop() || ''
  const user: any = localStorage.getItem('user')
  const USER = JSON.parse(user)

  useEffect(() => {
    socket.connect()
    if (sessionId) {
      socket.emit('join-room', sessionId)
    }

    socket.on('update-code', (newCode) => setCode(newCode))

    return () => {
      socket.disconnect()
    }
  }, [sessionId])


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }

      const sessionEnd = async () => {
        try {
          const sessionID: string | null = localStorage.getItem('sessionID');
          if (sessionID) {
            await endCollaboration(sessionID);
          }
          localStorage.removeItem('sessionID');
        } catch (error) {
          console.log('collab ends with err', error)
        }
      }

      sessionEnd()
    }

  }, [timerActive])


  const handleCreateSession = () => {
    const createCollab = async () => {
      try {
        const response: any = await createCollaboration();
        setSessionId(response.data.roomId)
        toast.success('Session created successfully ')
        localStorage.setItem('sessionID', response.data.roomId);

        console.log("collab created______| > ", response.data)
        console.log("Session created with ID:", response.data.roomId)

      } catch (error) {
        console.log(error)
      }
    }
    createCollab()
    setTimerActive(true)
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const response: any = await submitCode(code, problem?.title, problem?.outputFormat?.type, language)
      console.log("submit response" , response)
      if (response.status === 200) {
        console.log("Success:", response.data)
        console.log('test case', testCases)
        console.log('test results', testResults)
        setTestResults(response.data.results || [])
        setSubmissionResults(response.data.results || [])
        const results = response.data.results || [];
        const passed = results.filter((test: any) => test.passed).length;
        const total = results.length

        setTotalTests(total);
        setPassedTests(passed);
        console.log("RESULTS ",passed,"/",total)
        const currentTime = new Date().toLocaleString(); 
        
        if (passed == total) {
          setModalVisible(true); // Show modal
          setAllPassed(true)
          setSubmissionTime(currentTime);
        }else{
          setAccepted(true);
        }
        
        const email : any = user?.email
        console.log(email, problem?.title , allPassed)


        const responseScore : any = await updateProblemScore(email, problem?.title , allPassed);
        console.log(responseScore)
        if(responseScore?.data.message == 'Problem data updated and new badge awarded!') {
           toast.success('You got a badge')
        }
      } else {
        console.error("Unexpected response:", response)
      }
    } catch (error: any) {
      console.error("Error submitting code:", error.message)
    }
  }

  const handleRun = async () => {
    try {
   
      const response: any = await runCode(code, problem?.title, problem?.outputFormat?.type, language)

      if (response.status === 200) {
        console.log("Success:", response.data)
        console.log('test case', testCases)
        console.log('test results', testResults)
        setTestResults(response.data.results || [])
       
      } else {
        console.error("Unexpected response:", response)
      }
    } catch (error: any) {
      console.error("Error submitting code:", error.message)
    }
  }

  const handleJoinSession = () => {

    const joinCollab = async () => {
      try {
        if (joinSessionId) {
          const response: any = await joinCollaboration(joinSessionId);
          console.log(response.data)

          if (response?.data?.message === 'User joined successfully') {
            setSessionId(joinSessionId)
            setTimerActive(true)
            socket.emit('join-room', joinSessionId)
            console.log("Joined session with ID:", joinSessionId)
            toast.success('Successfully joined the session');
            return
          }
          console.log(response)

          const errorMessage: any = response?.data?.message || 'Cannot join session'
          switch (errorMessage) {
            case 'Session expired':
              toast.error('This session has expired. Please try another.');
              break;
            case 'You are already in this session':
              toast.error('You are already in this session.');
              break;
            case 'Session not found':
              toast.error('No session found with this ID.');
              break;
            default:
              toast.error('An error occurred while joining the session.');
          }
        }
      } catch (error: any) {
        toast.error('Cannot Join session')
        console.log('error in joining session', error)
      }
    }

    joinCollab()

  }

  const copyToClipboard = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
    if (sessionId) {
      socket.emit('code-change', { roomId: sessionId, content: value })
    }
    console.log("useremaillll" , USER?.email)
    localStorage.setItem(`${USER?.email}-code-${problemId}`, value)

  
  }
  


  useEffect(() => {
    if (!problemId) return;
  
    const fetchProblem = async () => {
      try {
        const response: any = await viewProblem(problemId);
        
        if (response && response.data) {
          setProblem(response.data);

          const parameters : any = []
          response.data.inputFormat.forEach((value: any)=> {
            parameters.push(value.name)
          })
  
          const savedCode = localStorage.getItem(`${USER?.email}-code-${problemId}`) || '';
          setCode(`function ${response.data.functionName}(${parameters.join(',')}){

}`);
if(savedCode) {
          setCode(`${savedCode}`);
}
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProblem();
  }, [problemId]);
  


  useEffect(()=> {

    const fetchTestCases = async()=> {
      try {
        console.log("problem  =====",problem)
        const encodedTitle = encodeURIComponent(problem?.title);
        console.log(encodedTitle)
        const response = await axios.get(`http://localhost:4001/problem/testCase/testCases/${encodedTitle}`)
        if(response.data) {
          setTestCases(response.data)
        }
      } catch (error) {
        console.error('Error fetching test cases:', error)

      }
    }
    fetchTestCases()

  }, [problem])



  if (loading) {
    return <div className="text-center text-xl text-gray-400">Loading problem...</div>
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }



  return (
    <div className="bg-gray-900 text-gray-200 h-screen flex flex-col overflow-hidden">
      <div className='py-2 px-5'>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-96 bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Session Management</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              {!sessionId && (
                <button
                  onClick={handleCreateSession}
                  className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                >
                  Create Session
                </button>
              )}
              {sessionId && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-200">{sessionId}</span>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
              {!sessionId && (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    placeholder="Enter session code"
                    value={joinSessionId}
                    onChange={(e) => setJoinSessionId(e.target.value)}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-gray-200"
                  />
                  <button
                    onClick={handleJoinSession}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    Join Session
                  </button>
                </div>
              )}
              {sessionId && (
                <div className="text-lg text-gray-200 text-center mt-4">
                  {formatTime(timer)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-2">

        <button
          onClick={handleRun}
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v18l15-9L5 3z"
            />
          </svg>
          RUN
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          SUBMIT
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-sm"
        >
          Create Session
        </button>

      </div>

      <CongratulatoryModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          totalTests={totalTests}
          passedTests={passedTests}
          currentTime = {submissionTime}
        />

      {/* UI */}
      <div className="flex flex-1">
        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-4">{problem.title}</h2>
          <p className="text-lg mb-6">{problem.description}</p>
        </div>



        <div className="flex-1 p-6 bg-gray-900 flex flex-col">
          <CodeMirror
            value={code}
            width="600px"
            height="600px"
            theme={material({ theme: 'dark' })}
            extensions={[javascript()]}
            onChange={handleCodeChange}
          />
        </div>

        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
  <h3 className="text-2xl font-medium mb-4">Test Cases</h3>

  <div>
    {/* Test Case Tabs */}
    <div className="flex space-x-2 mb-4">
      {testCases.map((testCase, index) => {
        const result = testResults.find(
          (result) => result.input === testCase.input
        );
        const passed = result?.passed;

        return (
          <div
            key={testCase._id} // Unique key based on testCase._id
            onClick={() => setActiveTestCaseId(index)}
            className={`cursor-pointer py-2 px-4 rounded-lg transition-all ${
              index === activeTestCaseId
                ? "bg-gray-700 text-gray-300 hover:bg-dark-layer-2"
                : "bg-dark-fill-3 text-white"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  passed === true
                    ? "bg-green-500"
                    : passed === false
                    ? "bg-red-500"
                    : ""
                }`}
              ></div>
              <span className="ml-2">Case {index + 1}</span>
            </div>
          </div>
        );
      })}
    </div>

    {/* Active Test Case Result */}
    {testCases.map((testCase, index) => {
      if (index !== activeTestCaseId) return null; // Only show the active test case

      const result = testResults.find(
        (result) => result.input === testCase.input
      );

      return (
        <div key={testCase._id} className="py-4 space-y-4">
          {/* Input */}
          <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
            <pre className="font-mono text-sm">
              <strong className="text-gray-100">Input:</strong> 
              {testCase.input.map((param: any, idx: number) => (
                <div key={idx}>
                  <strong className="text-gray-100">{problem.inputFormat[idx].name} :</strong> 
                  <span> {param.params}</span>
                </div>
              ))}
            </pre>
          </div>

          {/* Expected Output */}
          <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
            <pre className="font-mono text-sm">
              <strong className="text-gray-100">Target:</strong> {testCase.expectedOutput}
            </pre>
          </div>

          {/* Show Error if Present */}
          {result?.error ? (
            <div
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                scrollbarWidth: "thin", // Firefox support
                scrollbarColor: "#9e9e9e #2d2d2d", // Thumb and track colors
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <strong className="text-gray-100">Error:</strong>
              <div
                className="mt-2 space-y-2 max-h-64 overflow-y-auto bg-gray-800 p-3 rounded"
                style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
              >
                {result.error
                  .split("\n")
                  .slice(2, 17) // Adjust slice indices as needed
                  .map((line: any, index: number) => (
                    line.trim() === 0 ? null : (
                      <div key={index} className="font-mono text-sm text-red-400">
                        {line}
                      </div>
                    )
                  ))}
              </div>
            </div>
          ) : (
            // Output Section (only shown if there's no error)
            result?.output && (
              <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
                <pre className="font-mono text-sm">
                  <strong className="text-gray-100">Output:</strong> {result.output}
                </pre>
              </div>
            )
          )}

          {/* Logs */}
          {result?.logs.length && (
            <div className="p-4 rounded-md shadow-lg bg-gray-700 text-gray-300 hover:bg-dark-layer-2 transition-colors duration-300">
              <strong className="text-gray-100">stdout:</strong>
              <div className="mt-2 space-y-2 bg-gray-800">
                {result.logs.slice(0, showAll ? result.logs.length : 3).map((log: any, index: number) => (
                  log.trim() === 0 ? null : (
                    <pre key={index} className="font-mono text-sm p-2 rounded bg-gray-800 text-gray-100">
                      {log}
                    </pre>
                  )
                ))}
                {result.logs.length > 3 && (
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="mt-2 text-blue-400 hover:underline"
                  >
                    {showAll ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

      </div>
    </div>
  )
}

export default ProblemPage
