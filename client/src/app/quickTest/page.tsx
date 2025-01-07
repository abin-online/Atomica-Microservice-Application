'use client'
import { getAllTags } from '@/api/tag';
import NavBar from '@/components/user/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const QuickTestHome = () => {
  
  const router = useRouter();
  interface Tag {
    _id: string;
    name: string;
    blocked: boolean;
    __v: number;
}

const [tags, setTags] = useState<Tag[]>([]);
const [selectedTag, setSelectedTag] = useState("");
const [difficulty, setDifficulty] = useState("");

useEffect(() => {
    const fetchData = async () => {
        // const response = await axios.get(`http://localhost:5001/tag/getAllTags`)
        const response : any = await getAllTags()
        console.log(response.data)
        setTags(response.data);
    }
    fetchData()

}, [])

const handleStartQuiz = () => {
  console.log(selectedTag," ---------------->", difficulty)
  if (!selectedTag || !difficulty) {
    toast.error("Please select a tag and difficulty level");
    return;
  }

  const queryString = new URLSearchParams({
    tag: selectedTag,
    difficulty: difficulty,
  }).toString();

  router.push(`/quiz?${queryString}`);
};


  return (
    <div className="quick-test-home bg-gray-100 text-gray-800 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      {/* Filter Options */}
      <section className="filters py-8 px-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl text-gray-700 font-bold">Welcome to Quick Test!</h1>
        <p className="mt-4 text-gray-700 text-lg">Challenge yourself with quizzes tailored to your skills.</p>
        <div className="cta-buttons mt-6 flex justify-center gap-4">
        <button onClick={handleStartQuiz} className="btn-secondary px-6 py-2 rounded-lg bg-white text-primary-500 hover:bg-gray-200 font-semibold transition-all duration-300">
        Start a Quiz
          </button>
          
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Customize Your Quiz</h2>
        <div className="filter-options flex flex-wrap gap-6">
          <label className="flex-1">
          <select
                            id="tags"
                            name="tags"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Tag</option>
                            {tags.map((tag) => (
                                !tag.blocked && (
                                    <option key={tag._id} value={tag._id}>
                                        {tag.name} {/* Display tag name */}
                                    </option>
                                )
                            ))}
                        </select>
          </label>
          <div className="difficulty-levels flex-1">
            <span className="block text-sm font-medium mb-2">Difficulty Level</span>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="beginner"
                  onChange={() => setDifficulty('Beginner')}
                  className="mr-2"
                />
                Beginner
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="intermediate"
                  onChange={() => setDifficulty('Intermediate')}
                  className="mr-2"
                />
                Intermediate
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="advanced"
                  onChange={() => setDifficulty('Advanced')}
                  className="mr-2"
                />
                Advanced
              </label>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Quizzes Section */}
      <section className="popular-quizzes py-8 px-6 mt-8 bg-gray-50 shadow-md rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Popular Quizzes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2">JavaScript Basics</h3>
            <p className="text-gray-600">Learn the fundamentals of JavaScript.</p>
            <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
              Start Quiz
            </button>
          </li>
          <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2">SQL Mastery</h3>
            <p className="text-gray-600">Test your SQL skills with intermediate-level questions.</p>
            <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
              Start Quiz
            </button>
          </li>
          <li className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-2">Data Structures</h3>
            <p className="text-gray-600">Advanced questions on arrays, trees, and more.</p>
            <button className="mt-4 btn-primary px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
              Start Quiz
            </button>
          </li>
        </ul>
      </section>

      {/* Stats Section */}
      <section className="stats py-8 px-6 mt-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
        <div className="stats-cards grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold">Questions Attempted</h3>
            <p className="text-3xl font-semibold mt-2">120</p>
          </div>
          <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold">Accuracy</h3>
            <p className="text-3xl font-semibold mt-2">85%</p>
          </div>
          <div className="stat-card bg-gray-50 p-4 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold">Current Streak</h3>
            <p className="text-3xl font-semibold mt-2">5 Days</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 mt-8 bg-primary-500 text-white text-center">
        <p>&copy; 2024 Quick Test. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default QuickTestHome;
