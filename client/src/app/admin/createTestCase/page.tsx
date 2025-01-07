'use client'
import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";// Assuming you have a Header component
import Sidebar from "@/components/admin/SideBar"; // Assuming you have a Sidebar component
import { getUnblockedProblems } from "@/api/problem";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


const CreateTestCase = () => {
    const router = useRouter()
    const [testCase, setTestCase] = useState({
        problem: "",
        input: "",
        expectedOutput: "",
        isExample: false,
        visibility: 'hidden',
        description: "",
    });

    type problems = {
        _id: string;
        title: string;
    }

    const [problems, setProblems] = useState<problems[]>([])

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setTestCase({
            ...testCase,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const problems: any = await getUnblockedProblems();
                setProblems(problems?.data)
            } catch (error) {
                toast.error('error fetching in problems data')
            }
        }
        fetchProblems()
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Submitting Test Case: ", testCase);
        try {
            const response = await axios.post('http://localhost:4001/problem/testCase/testCase' , testCase );
            console.log(response)
            toast.success('Test case created');
            router.push('/admin/testcases');
        } catch (error) {
            
        }
    };

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Create Test Case</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="problem" className="text-sm font-medium mb-1">
                                Problem
                            </label>
                            <select
                                id="problem"
                                name="problem"
                                value={testCase.problem} // Assuming testCase has a `problemId` property
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select a problem
                                </option>
                                {problems.map((problem) => (
                                    <option key={problem._id} value={problem.title}>
                                        {problem.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="input" className="text-sm font-medium mb-1">
                                Input
                            </label>
                            <textarea
                                id="input"
                                name="input"
                                value={testCase.input}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the test case input"
                                required
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="expectedOutput" className="text-sm font-medium mb-1">
                                Expected Output
                            </label>
                            <textarea
                                id="expectedOutput"
                                name="expectedOutput"
                                value={testCase.expectedOutput}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the expected output"
                                required
                            ></textarea>
                        </div>
                  

                        <div className="mb-5">
                            <label htmlFor="visibility" className="block text-lg mb-2 font-semibold">
                                Visibility:
                            </label>
                            <select
                                id="visibility"
                                value={testCase.visibility}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 text-white"
                            >
                                <option value="hidden">Hidden</option>
                                <option value="public">Public</option>
                            </select>
                        </div>


                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm font-medium mb-1">
                                Description (Optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={testCase.description}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a description for the test case"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit Test Case
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTestCase;
