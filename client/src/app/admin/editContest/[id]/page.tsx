'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/SideBar'
import { getContestById, updateContest } from '@/api/contest'
import { getUnblockedProblems } from '@/api/problem'
import { getAllQuestions } from '@/api/quickTest'
import toast from 'react-hot-toast'

const EditContest = () => {
  const [contestName, setContestName] = useState('')
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])
  const [selectedMCQs, setSelectedMCQs] = useState<string[]>([])
  const [points, setPoints] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [expiryDate, setExpiryDate] = useState<string>('')
  const [problems, setProblems] = useState<any[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Extract contest ID from the URL
  const contestId = pathname.split('/').pop() || ''

  // Fetch contest details and populate the form
  useEffect(() => {
    const fetchContest = async () => {
      try {
        setLoading(true)
        const response: any = await getContestById(contestId)
        const contest = response.data
        console.log("contest   ", contest)
        setContestName(contest.contestName)
        setSelectedProblems(contest.selectedProblems)
        setSelectedMCQs(contest.selectedMCQs)
        setPoints(contest.points)
        setDuration(contest.duration)
        setExpiryDate(contest.expiryDate)
      } catch (error) {
        toast.error('Error fetching contest details')
        console.error('Error fetching contest:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContest()
  }, [contestId])

  // Fetch unblocked problems
  useEffect(() => {
    const fetchUnblockedProblems = async () => {
      try {
        setLoading(true)
        const response: any = await getUnblockedProblems()
        setProblems(response.data)
      } catch (error) {
        toast.error('Error fetching problems')
        console.error('Error fetching problems:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUnblockedProblems()
  }, [])

  // Fetch MCQs
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await getAllQuestions()
        console.log("response    ", response)
        setQuestions(response || [])
      } catch (error) {
        toast.error('Error fetching MCQs')
        console.error('Error fetching questions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const payload = {
        contestName,
        selectedProblems,
        selectedMCQs,
        points,
        duration,
        expiryDate,
      }
      const response: any = await updateContest(contestId, payload)

      if (response.status === 201) {
        toast.success('Contest updated successfully!')
        router.push('/admin/contest')
      }
    } catch (error) {
      toast.error('Failed to update contest')
      console.error('Error updating contest:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Header />
      <Sidebar />
      <div className="my-20 flex w-full px-8">
        <div className="flex flex-col w-full p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-400">Edit Contest</h1>

          {/* Contest Name */}
          <div className="mb-6">
            <label htmlFor="contestName" className="block text-lg mb-2 font-medium">
              Contest Name:
            </label>
            <input
              id="contestName"
              type="text"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter contest name"
            />
          </div>

          {/* Problems */}
          <div className="mb-6">
            <label htmlFor="problems" className="block text-lg mb-2 font-medium">
              Select Problems:
            </label>
            <select
              id="problems"
              value={selectedProblems}
              onChange={(e) =>
                setSelectedProblems(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              multiple
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            >
              {problems.map((problem) => (
                <option key={problem._id} value={problem.title}>
                  {problem.title}
                </option>
              ))}
            </select>
          </div>

          {/* MCQs */}
          <div className="mb-6">
            <label htmlFor="mcqs" className="block text-lg mb-2 font-medium">
              Select MCQs:
            </label>
            <select
              id="mcqs"
              value={selectedMCQs}
              onChange={(e) =>
                setSelectedMCQs(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              multiple
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            >
              {questions.map((question) => (
                <option key={question._id} value={question.question}>
                  {question.question}
                </option>
              ))}
            </select>
          </div>

          {/* Points */}
          <div className="mb-6">
            <label htmlFor="points" className="block text-lg mb-2 font-medium">
              Points:
            </label>
            <input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter points for the contest"
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label htmlFor="duration" className="block text-lg mb-2 font-medium">
              Duration (in minutes):
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="Enter duration in minutes"
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-6">
            <label htmlFor="expiryDate" className="block text-lg mb-2 font-medium">
              Contest Expiry Date:
            </label>
            <input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleUpdate}
              className="w-full py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-200"
            >
              Update Contest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditContest
