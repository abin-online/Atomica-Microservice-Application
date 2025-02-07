'use client';

import { setUser } from '@/lib/features/users/userSlice';
import { useAppDispatch } from '@/lib/hook';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useConfirmationDialog } from '../../customHooks/useConfirmationDialog';
import { updateTest } from '@/api/badge';
import LoadingSpinner from '@/components/user/LoadingSpinner';
import { fetchQuiz } from '@/api/quickTest';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
    const [results, setResults] = useState<number[]>([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // Timer state
    const [newBadgeData, setNewBadgeData] = useState<BadgeData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { dialog, openDialog } = useConfirmationDialog()


    type BadgeData = {
        name: string;
        description: string;
        minQuestionsSolved: number;
        imageURL: string;
    };


    useEffect(() => {
        const validateAndFetchUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    console.log('parsed User:', user);
                    dispatch(setUser(user));
                } catch (error) {
                    console.error("Error in parsingg", error);
                    await router.push('/login');
                }
            } else {
                await router.push('/login');
            }

            await fetchQuizData();
        };

        validateAndFetchUser();
    }, [dispatch, router]);



    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isQuizCompleted && quiz.length > 0) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup on unmount or when quiz completes
    }, [isQuizCompleted, quiz.length]);

    type IUserMcq = {
        name: string;
        email: string;
        questionAttended: number;
        wrongAnswers: number;
        rightAnswers: number;
    };




    useEffect(() => {
        if (isQuizCompleted) {
            const sendQuizData = async () => {
                if (!quiz.length || !results.length) return; // Ensure the quiz is completed

                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (!user.name || !user.email) {
                    console.error('User data missing!');
                    return;
                }

                const totalCorrect = results.reduce((sum, r) => sum + r, 0);
                const totalWrong = results.length - totalCorrect;

                const userQuizData: IUserMcq = {
                    name: user.name,
                    email: user.email,
                    questionAttended: results.length,
                    rightAnswers: totalCorrect,
                    wrongAnswers: totalWrong,
                };

                try {
                    console.log("|-----------------> user Quiz Data____________|", userQuizData)
                    const response: any = await updateTest(userQuizData)
                    if (response.data.newBadge) {
                        setNewBadgeData(response.data.badgeData);  // Store badge data
                        setTimeout(() => {
                            setIsModalOpen(true);
                        }, 500);
                    }
                } catch (err) {
                    console.error('Error submitting quiz data:', err);
                    toast.error('Failed to submit quiz results.');
                }
            };

            sendQuizData();
        }
    }, [isQuizCompleted, quiz, results]);


    const fetchQuizData = async () => {
        const url = new URL(window.location.href);
        const tag = url.searchParams.get('tag');
        const difficulty = url.searchParams.get('difficulty');

        try {
            const response: any = await fetchQuiz(tag, difficulty)

            setTimeout(() => {
                setQuiz(response.data);
            }, 500);

            setSelectedOptions(new Array(response.data.length).fill(null));
            setResults([]);
            setCurrentIndex(0);
            setIsQuizCompleted(false);
            setElapsedTime(0); // Reset timer
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
                const updatedResults = quiz.map((q, idx) =>
                    selectedOptions[idx] === q.correctAnswer ? 1 : 0
                );
                setResults(updatedResults);
                setIsQuizCompleted(true);
                toast.success('Quiz completed!');
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            toast.error('Please select an option.');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const closeModal = () => setIsModalOpen(false);

    if (quiz.length === 0) {
        return <LoadingSpinner message="Fetching the quiz... Please wait!" />;
    }

    const handleRetry = () => {
        window.location.reload()
    }
    const confirmBack = () => {
        openDialog({
            title: 'Exit Confirmation',
            message: `Are you sure you want to exit?`,
            onConfirm: backToHome
        });
    };

    const backToHome = () => {
        router.push('/quickTest')
    }

    if (isQuizCompleted) {
        const totalCorrect = results.reduce((sum, r) => sum + r, 0);
        return (
            <div className="quiz-page bg-gray-100 min-h-screen text-gray-800">

                <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">Quiz Results</h1>
                    <p className="text-lg mb-4">You scored {totalCorrect} out of {quiz.length}</p>
                    <p className="text-lg mb-4">Time taken: {Math.floor(elapsedTime / 60)} minutes {elapsedTime % 60} seconds</p>
                    <div className="progress-bar bg-gray-200 rounded-full h-4 mb-6">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{ width: `${(totalCorrect / quiz.length) * 100}%` }}
                        />
                    </div>
                    <ul className="space-y-4">
                        {quiz.map((q, index) => (
                            <li
                                key={q._id}
                                className={`p-4 rounded-lg shadow ${results[index] ? 'bg-green-100' : 'bg-red-100'}`}
                            >
                                <p className="font-medium">
                                    {index + 1}. {q.question}
                                </p>
                                <p
                                    className={`mt-2 ${results[index] ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {results[index] ? 'Correct' : 'Incorrect'}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handleRetry}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                        >
                            Retry
                        </button>
                        <button
                            onClick={confirmBack}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                        >
                            Back
                        </button>
                    </div>
                </div>
                {dialog}
                {newBadgeData && isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 animate-modal-fade-in">
                        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center animate-scale-up">
                            <h2 className="text-2xl font-bold text-green-500 mb-4">🎉 Congratulations!</h2>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{newBadgeData.name}</h3>
                            <p className="text-gray-600 mb-4">{newBadgeData.description}</p>
                            <img
                                src={newBadgeData.imageURL}
                                alt={newBadgeData.name}
                                className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4"
                            />
                            <p className="text-gray-600"> </p>
                            <button
                                onClick={closeModal}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="quiz-page bg-gray-100 min-h-screen text-gray-800">
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
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={handleNextQuestion}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
