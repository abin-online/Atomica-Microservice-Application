'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import NavBar from '@/components/user/Navbar'

const ProblemPage = () => {
  const [problem, setProblem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const problemId = pathname.split('/').pop() || ''

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
    return <div className="text-center text-xl">Loading problem...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      <div className="max-w-8xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        {/* Grid Layout: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Problem Description, Input, Output */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title */}
            <h2 className="text-3xl font-semibold text-gray-800">{problem.title}</h2>

            {/* Description */}
            <p className="text-lg text-gray-700">{problem.description}</p>

            {/* Input Format */}
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Input Format</h3>
              <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                <pre className="text-sm text-gray-600">{JSON.stringify(problem.inputFormat, null, 2)}</pre>
              </div>
            </div>

            {/* Output Format */}
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Output Format</h3>
              <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                <pre className="text-sm text-gray-600">{problem.outputFormat.description}</pre>
              </div>
            </div>
          </div>

          {/* Middle Column: Placeholder for Monaco Editor */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Your Solution</h3>
            {/* Placeholder for Monaco editor */}
            <div className="w-full h-96 bg-gray-200 rounded-md shadow-sm border border-gray-300 p-4">
              <p className="text-gray-500">Write your code here...</p>
            </div>
          </div>

          {/* Right Column: Test Cases */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">Test Cases</h3>
            {/* Placeholder for test cases */}
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <pre className="text-sm text-gray-600">Test case data will go here.</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-8">
        <p>&copy; 2024 Quick Test. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default ProblemPage
