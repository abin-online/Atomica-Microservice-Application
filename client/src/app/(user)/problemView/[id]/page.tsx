// 'use client'
// import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'
// import axios from 'axios'
// import CodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
// import material from '@uiw/codemirror-themes'
// import { tags } from "@codemirror/highlight"
// import { submitCode, runCode } from '@/api/compilation'
// import socket from '@/lib/socket'
// import { viewProblem } from '@/api/problem'
// import { v4 as uuidv4 } from 'uuid';

// const ProblemPage = () => {
//   const [problem, setProblem] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const pathname = usePathname()
//   const [code, setCode] = useState('') // Initialize code state
//   const [language, setlanguage] = useState('js')
//   const [testCases, setTestCases] = useState<any[]>([])
//   const [testResults, setTestResults] = useState<any[]>([])
//   const [sessionId, setSessionId] = useState<string | null>(null);

//   const problemId = pathname.split('/').pop() || ''
//   const user : any = localStorage.getItem('user')

//   useEffect(() => {

//       socket.connect();

//       socket.emit('join-room', 'test-123');
//       socket.on('update-code', (newCode) => setCode(newCode))


//       return () => {
//         socket.disconnect()
//       }


//   }, [])

//   const handleCreateSession = () => {

//     const newSessionId = uuidv4()
//     console.log(newSessionId)
//     setSessionId(newSessionId);

//     console.log("Session created with ID:", newSessionId);
//   };

//   const handleRun = async () => {
//     try {
//       const response: any = await runCode(code, problem?.title, language)

//       if (response.status === 200) {
//         console.log("Success:", response.data)
//         console.log('test case', testCases)
//         console.log('test results', testResults)
//         setTestResults(response.data.results || [])
//       } else {
//         console.error("Unexpected response:", response)
//       }
//     } catch (error: any) {
//       console.error("Error submitting code:", error.message)
//     }
//   }

//   const handleSubmit = async () => {
//     try {
//       const response: any = await submitCode(code, problem?.title, language)

//       if (response.status === 200) {
//         console.log("Success:", response.data)
//         console.log('test case', testCases)
//         console.log('test results', testResults)
//         setTestResults(response.data.results || [])
//       } else {
//         console.error("Unexpected response:", response)
//       }
//     } catch (error: any) {
//       console.error("Error submitting code:", error.message)
//     }
//   }

//   useEffect(() => {
//     if (!problemId) return

//     // Fetch problem details
//     const fectchProblem = async () => {
//       try {
//         await viewProblem(problemId)
//           .then((response: any) => {
//             setProblem(response.data)
//             setLoading(false)
//             console.log(problem)
//           })
//           .catch((error) => {
//             console.error('Error fetching problem:', error)
//             setLoading(false)
//           })
//       } catch (error) {

//       }
//     }
//     fectchProblem()

//     // Fetch test cases
//     axios
//       .get(`http://localhost:4001/problem/testCase/testCases`)
//       .then((response) => {
//         setTestCases(response.data || [])
//       })
//       .catch((error) => {
//         console.error('Error fetching test cases:', error)
//       })

//     const savedCode = localStorage.getItem(`${user?.email}-code-${problemId}`)
//     if (savedCode) {
//       setCode(savedCode)
//     }
//   }, [problemId])


//   const handleCodeChange = (value: string) => {
//     setCode(value)
//     socket.emit('code-change', { roomId:  'test-123', content: value })

//     console.log(user?.email)
//     localStorage.setItem(`${user?.email}-code-${problemId}`, value)
//   }

//   if (loading) {
//     return <div className="text-center text-xl text-gray-400">Loading problem...</div>
//   }

//   return (
//     <div className="bg-gray-900 text-gray-200 h-screen flex flex-col overflow-hidden">


//       <div className="flex flex-1">
//         {/* Problem Details */}
//         <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
//           <h2 className="text-3xl font-semibold mb-4">{problem.title}</h2>
//           <p className="text-lg mb-6">{problem.description}</p>
//           <div>
//             <h3 className="text-xl font-medium mb-2">Input Format</h3>
//             <div className="p-4 bg-gray-700 rounded-md shadow-sm mb-4">
//               <pre className="text-sm">{JSON.stringify(problem.inputFormat, null, 2)}</pre>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-medium mb-2">Output Format</h3>
//             <div className="p-4 bg-gray-700 rounded-md shadow-sm">
//               <pre className="text-sm">{problem.outputFormat.description}</pre>
//             </div>
//           </div>
//         </div>

//         {/* Code Editor */}
//         <div className="flex-1 p-6 bg-gray-900 flex flex-col">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-2xl font-medium">Your Solution</h3>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
//             >
//               SUBMIT
//             </button>
//             <button
//               onClick={handleRun}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
//             >
//               RUN
//             </button>
//           </div>
//           <CodeMirror
//             value={code}
//             width="600px"
//             height="600px"
//             theme={material({
//               theme: "dark",
//               settings: {
//                 background: "#1e1e1e",
//                 foreground: "#d4d4d4",
//                 caret: "#00e676",
//                 selection: "#264f78",
//                 selectionMatch: "#528bff",
//               },
//               styles: [
//                 { tag: tags.keyword as any, color: "#c792ea" },
//                 { tag: tags.string, color: "#ecc48d" },
//                 { tag: tags.variableName, color: "#82aaff" },
//               ],
//             })}
//             extensions={[javascript()]}
//             onChange={handleCodeChange} // Use the new handler
//           />
//         </div>

//         {/* Test Cases */}
// <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
//   <h3 className="text-2xl font-medium mb-4">Test Cases</h3>
//   {testCases.map((testCase, index) => {
//     const result = testResults.find(
//       (result) => result.input === testCase.input
//     )
//     const passed = result?.passed
//     return (
//       <div
//         key={index}
//         className={`p-4 mb-4 rounded-md shadow-sm ${passed === true
//             ? "bg-green-700"
//             : passed === false
//               ? "bg-red-700"
//               : "bg-gray-700"
//           }`}
//       >
//         <pre className="text-sm mb-2">
//           Input: {testCase.input}
//         </pre>
//         <pre className="text-sm mb-2">
//           Expected Output: {testCase.expectedOutput}
//         </pre>
//         <pre className="text-sm">
//           Output: {result?.output || ""}
//         </pre>
//       </div>
//     )
//   })}
// </div>
//       </div>

//       <footer className="bg-gray-800 text-gray-400 py-4 text-center">
//         <p>&copy; 2024 Quick Test. All rights reserved.</p>
//       </footer>
//     </div>
//   )
// }

// export default ProblemPage

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
  const [code, setCode] = useState(`function findSum(arr) {
}`)
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
      const response: any = await submitCode(code, problem?.title, language)

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
   
      const response: any = await runCode(code, problem?.title, language)

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

    const KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKjoinCollab = async () => {
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
          console.log("eeeeeeeeeeeeeeeeeeeeeeee", response)

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
    if (!problemId) return

    const fetchProblem = async () => {
      try {
        const response: any = await viewProblem(problemId)
        setProblem(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching problem:', error)
        setLoading(false)
      }
    }
    fetchProblem()

    const savedCode = localStorage.getItem(`${USER?.email}-code-${problemId}`)
    if (savedCode) {
      setCode(savedCode)
    }
  }, [problemId])


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
          {/* {testCases.map((testCase, index) => (
            <div key={index} className="p-4 mb-4 bg-gray-700 rounded-md">
              <pre>Input: {testCase.input}</pre>
              <pre>Expected Output: {testCase.expectedOutput}</pre>
            </div>
          ))} */}

          {/* {testCases.map((testCase, index) => {
            const result = testResults.find(
              (result) => result.input === testCase.input
            )
            const passed = result?.passed
            return (
              <div
                key={index}
                className={`p-4 mb-4 rounded-md shadow-sm ${passed === true
                  ? "bg-green-700"
                  : passed === false
                    ? "bg-red-700"
                    : "bg-gray-700"
                  }`}
              >
                <pre >
                  Input: {testCase.input}
                </pre>
                <pre >
                  Expected Output: {testCase.expectedOutput}
                </pre>
                <pre >
                  Output: {result?.output || ""}
                </pre>
              </div>
            )
          })} */}

<div>
  {accepted && (
    <div className="p-4 mb-4 bg-yellow-700 text-white rounded-md">
      <p className="text-lg font-medium">
        {passedTests}/{totalTests} test cases passed. Keep trying!
      </p>
    </div>
  )}
  
  {/* Display individual test case results */}
  {testCases.map((testCase, index) => {
    const result = testResults.find(
      (result) => result.input === testCase.input
    );
    const passed = result?.passed;
    return (
      <div
        key={index}
        className={`p-4 mb-4 rounded-md shadow-sm ${passed === true
          ? "bg-green-700"
          : passed === false
          ? "bg-red-700"
          : "bg-gray-700"
          }`}
      >
        <pre>
          Input: {testCase.input}
        </pre>
        <pre>
          Expected Output: {testCase.expectedOutput}
        </pre>
        <pre>
          Output: {result?.output || ""}
        </pre>
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
