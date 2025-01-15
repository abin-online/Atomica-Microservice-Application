'use client'
'use client';
import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { getUnblockedProblems } from "@/api/problem";

const EditTestCase = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const router = useRouter();

    const [testCase, setTestCase] = useState({
        problem: "",
        input: "",
        expectedOutput: "",
        isExample: false,
        visibility: "hidden",
        description: "",
    });

    const [problems, setProblems] = useState<{ _id: string; title: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setTestCase({
            ...testCase,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [testCaseResponse, problemsResponse] = await Promise.all([
                    axios.get(`http://localhost:4001/problem/testCase/testCase/${id}`),
                    getUnblockedProblems(),
                ]);

                const fetchedTestCase = testCaseResponse.data;
                const problemMatch = problemsResponse?.data.find(
                    (problem: any) => problem.title === fetchedTestCase.problem
                );

                // setTestCase({
                //     ...fetchedTestCase,
                //     problem: problemMatch ? problemMatch._id : "",
                // });
                setTestCase({
                    problem: testCaseResponse.data.problem,
                    input: testCaseResponse.data.input,
                    expectedOutput: testCaseResponse.data.expectedOutput,
                    isExample: false,
                    visibility: testCaseResponse.data.visibility,
                    description: testCaseResponse.data.description,
                });

                setProblems(problemsResponse?.data);
            } catch (error) {
                toast.error("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Updating Test Case: ", testCase);

        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:4001/problem/testCase/testCase/${id}`, testCase);
            console.log(response)
            toast.success("Test case updated successfully");
            router.push("/admin/testcases");
        } catch (error) {
            toast.error("Error updating test case");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Edit Test Case</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="problem" className="text-sm font-medium mb-1">
                                Problem
                            </label>

                            {/* <select
                                id="problem"
                                name="problem"
                                value={"poda myre"}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select a problem
                                </option>
                                {problems.map((problem) => (
                                    <option key={problem._id} value={problem._id}>
                                        {problem.title}
                                    </option>
                                ))}
                            </select> */}
                            <select
                                id="problem"
                                name="problem"
                                value={testCase.problem || ""} // Correctly references the problem's _id
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
                                Visibility
                            </label>
                            <select
                                id="visibility"
                                name="visibility"
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
                            Update Test Case
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTestCase;
