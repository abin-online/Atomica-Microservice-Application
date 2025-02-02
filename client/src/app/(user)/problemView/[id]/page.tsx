'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { submitCode, runCode } from '@/api/compilation'
import socket from '@/lib/socket'
import { viewProblem } from '@/api/problem'
import { createCollaboration, endCollaboration, joinCollaboration } from '@/api/collaboration'
import toast from 'react-hot-toast'
import CongratulatoryModal from '@/components/user/CongratulatoryModal'
import { updateProblemScore } from '@/api/badge'
import CodeEditor from '@/components/PlayGround/CodeEditor'
import TestCase from '@/components/PlayGround/TestCases'
import TestCaseTabs from '@/components/PlayGround/TestCaseTabs'
import SessionModal from '@/components/PlayGround/SessionModal'
import ActionButtons from '@/components/PlayGround/ActionButton'

import SubmissionResult from '@/components/PlayGround/Submission'
import Solutions from '@/components/PlayGround/Solutions'

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
  const [submitResult, setSubmitResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalTests, setTotalTests] = useState(0);
  const [passedTests, setPassedTests] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<string>("");
  const [allPassed, setAllPassed] = useState(false)
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description');



  const problemId = pathname.split('/').pop() || ''
  const user: any = localStorage.getItem('user')
  const USER = JSON.parse(user)
  const userName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).name
    : "User";


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


  const handleSubmit = async () => {
    try {
      const response: any = await submitCode(code, problem?.title, problem?.outputFormat?.type, language, problem?.functionName)
      console.log("submit response", response)
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
        console.log("RESULTS ", passed, "/", total)
        const currentTime = new Date().toLocaleString();

        if (passed == total) {
          setModalVisible(true); // Show modal
          setSubmitResult(true)
          setAllPassed(true)
          setSubmissionTime(currentTime);
        } else {
          setAccepted(true);
        }

        const email: any = user?.email
        console.log(email, problem?.title, allPassed)


        const responseScore: any = await updateProblemScore(email, problem?.title, allPassed);
        console.log("problem update=======_______|", responseScore)
        if (responseScore?.data.message == 'Problem data updated and new badge awarded!') {
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

      const response: any = await runCode(code, problem?.title, problem?.outputFormat?.type, language, problem?.functionName)

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
    console.log("useremaillll", USER?.email)
    localStorage.setItem(`${USER?.email}-code-${problemId}`, value)


  }



  useEffect(() => {
    if (!problemId) return;

    const fetchProblem = async () => {
      try {
        const response: any = await viewProblem(problemId);

        if (response && response.data) {
          setProblem(response.data);

          const parameters: any = []
          response.data.inputFormat.forEach((value: any) => {
            parameters.push(value.name)
          })

          const savedCode = localStorage.getItem(`${USER?.email}-code-${problemId}`) || '';
          setCode(`function ${response.data.functionName}(${parameters.join(',')}){

}`);
          if (savedCode) {
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



  useEffect(() => {

    const fetchTestCases = async () => {
      try {
        console.log("problem  =====", problem)
        const encodedTitle = encodeURIComponent(problem?.title);
        console.log(encodedTitle)
        const response = await axios.get(`http://localhost:4001/problem/testCase/testCases/${encodedTitle}`)
        console.log("set test cases", response.data)

        if (response.data) {
          setTestCases(response.data)
          console.log("set test cases", response.data)
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



  return (
    <div className="bg-gray-900 text-gray-200 h-screen flex flex-col overflow-hidden">
      <div className='py-2 px-5'>

        <SessionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          sessionId={sessionId}
          setSessionId={setSessionId}
          joinSessionId={joinSessionId}
          setJoinSessionId={setJoinSessionId}
          handleCreateSession={handleCreateSession}
          handleJoinSession={handleJoinSession}
          copyToClipboard={copyToClipboard}
          copied={copied}
          timer={timer}
        />
      </div>

      <ActionButtons
        handleRun={handleRun}
        handleSubmit={handleSubmit}
        setModalOpen={setModalOpen}
      />

      <CongratulatoryModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        totalTests={totalTests}
        passedTests={passedTests}
        currentTime={submissionTime}
      />


      <div className="flex flex-1">


        <div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
          {/* Title */}

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-600 mb-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 text-lg ${activeTab === 'description' ? 'border-b-2 border-white text-white' : 'text-gray-400'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`pb-2 text-lg ${activeTab === 'solution' ? 'border-b-2 border-white text-white' : 'text-gray-400'
                }`}
            >
              Solution
            </button>
          </div>

          {/* Content */}
          {activeTab === 'description' ? (
            <>
              <h2 className="text-3xl font-semibold mb-4 text-white">{problem.title}</h2>
              <p className="text-lg text-gray-300">{problem.description}</p>
            </>
          ) : (
            <>
              {/* <h2 className="text-lg text-gray-300">Solutions</h2> */}
              <Solutions problem={problem.title} />
            </>
          )}
        </div>


        <CodeEditor code={code} onCodeChange={handleCodeChange} />

        {!submitResult ?
          (<div className="w-1/3 p-6 bg-gray-800 overflow-y-auto">
            <h3 className="text-2xl font-medium mb-4">Test Cases</h3>


            <div>

              <TestCaseTabs
                testCases={testCases}
                testResults={testResults}
                activeTestCaseId={activeTestCaseId}
                setActiveTestCaseId={setActiveTestCaseId}
              />


              {testCases.map((testCase, index) => {
                if (index !== activeTestCaseId) return null;

                const result = testResults.find(
                  (result) => result.input[0].params === testCase.input[0].params
                );

                return (
                  <TestCase
                    key={testCase._id}
                    testCase={testCase}
                    result={result || { logs: [] }}
                    showAll={showAll}
                    setShowAll={setShowAll}
                    problem={problem}
                  />
                );
              })}
            </div>

          </div>) :
          (
            <>
              <SubmissionResult
                problem={problem.title}
                passedTests={passedTests}
                totalTests={totalTests}
                userName={userName}
                submissionTime={submissionTime}
                code={code}
                setSubmitResult={setSubmitResult}
              />



            </>)
        }


      </div>
    </div>
  )
}

export default ProblemPage