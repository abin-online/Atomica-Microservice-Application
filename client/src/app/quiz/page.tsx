'use client';

import NavBar from '@/components/user/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Question {
    _id: string;
    question: string;
    options: {
        option1: string;
        option2: string;
        option3: string;
        option4: string;
    };
    correctAnswer: string;
    difficulty: string;
    tags: string;
    blocked: boolean;
}

export default function QuizPage() {
    const [quiz, setQuiz] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track current question
    const [error, setError] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]); // Track selected options for each question
    const [results, setResults] = useState<number[]>([]); // Store results (1 for correct, 0 for incorrect)
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        const url = new URL(window.location.href);
        const tag = url.searchParams.get('tag');
        const difficulty = url.searchParams.get('difficulty');
        const apiUrl = `http://localhost:5001/mcq/getAllMcq?tag=${tag}&difficulty=${difficulty}`;

        try {
            const response = await axios.get(apiUrl);

            setTimeout(() => {
                setQuiz(response.data);
            }, 500)

            setSelectedOptions(new Array(response.data.length).fill(null)); // Reset selections
            setResults([]); // Reset results
            setCurrentIndex(0); // Reset index
            setIsQuizCompleted(false); // Reset quiz status
        } catch (err) {
            console.error(err);
            setError('Failed to fetch quiz data. Please try again later.');
        }
    };

    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    const currentQuestion = quiz[currentIndex];

    const handleOptionChange = (option: string) => {
        const updatedSelections = [...selectedOptions];
        updatedSelections[currentIndex] = option;
        setSelectedOptions(updatedSelections);
    };

    const handleNextQuestion = () => {
        if (selectedOptions[currentIndex]) {
            if (currentIndex === quiz.length - 1) {
                // Quiz is completed
                const updatedResults = quiz.map((q, idx) =>
                    selectedOptions[idx] === q.correctAnswer ? 1 : 0
                );
                setResults(updatedResults);
                setIsQuizCompleted(true);
                toast.success('Quiz completed!');
            } else {
                setCurrentIndex(currentIndex + 1); // Move to next question
            }
        } else {
            toast.error('Please select an option.');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // Move to previous question
        }
    };

    if (quiz.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-75"></div>
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-opacity-75"></div>
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500 border-opacity-75"></div>
                </div>
                <p className="mt-6 text-lg font-semibold text-gray-600">Fetching the quiz... Please wait!</p>
            </div>
        );
    }

    if (isQuizCompleted) {
        const totalCorrect = results.reduce((sum, r) => sum + r, 0);
        return (
            <div className="quiz-page bg-gray-100 min-h-screen text-gray-800">
                <NavBar />
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">Quiz Results</h1>
                    <p className="text-lg mb-4">You scored {totalCorrect} out of 5</p>
                    <div className="progress-bar bg-gray-200 rounded-full h-4 mb-6">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{ width: `${(totalCorrect / 5) * 100}%` }}
                        />
                    </div>
                    <ul className="space-y-4">
                        {quiz.map((q, index) => (
                            <li
                                key={q._id}
                                className={`p-4 rounded-lg shadow ${results[index] ? 'bg-green-100' : 'bg-red-100'
                                    }`}
                            >
                                <p className="font-medium">
                                    {index + 1}. {q.question}
                                </p>
                                <p
                                    className={`mt-2 ${results[index] ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {results[index] ? 'Correct' : 'Incorrect'}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-center flex justify-center space-x-4">
                        <button
                            onClick={fetchQuizData}
                            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 mr-2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 10l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Try Again
                        </button>

                        <button
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center"
                        >
                            <a href='/quickTest' className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Home
                            </a>
                        </button>
                    </div>


                </div>
            </div>
        );
    }

    return (
        <div className="quiz-page bg-gray-100 min-h-screen text-gray-800">
            <NavBar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Quiz</h1>
                <div className="question-box p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">{currentQuestion.question}</h3>
                    <ul className="space-y-4">
                        {Object.entries(currentQuestion.options).map(([key, option]) => (
                            <li key={key}>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`question-${currentIndex}`}
                                        value={option}
                                        checked={selectedOptions[currentIndex] === option}
                                        onChange={() => handleOptionChange(option)}
                                        className="form-radio h-5 w-5 text-primary-500"
                                    />
                                    <span className="text-gray-700">{option}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between items-center">
                        {currentIndex > 0 && (
                            <button
                                onClick={handlePreviousQuestion}
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={handleNextQuestion}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
