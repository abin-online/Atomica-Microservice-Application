"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { getUnblockedProblems } from "@/api/problem";

type InputFormat = {
    name: string;
    type: string;
};

type OutputFormat = {
    type: string;
    description: string;
};

type Problem = {
    _id: string;
    title: string;
    inputFormat: InputFormat[];
    outputFormat: OutputFormat;
};

const EditTestCase = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const router = useRouter();

    const [testCase, setTestCase] = useState({
        problem: "",
        input: [{ params: "" }],
        expectedOutput: "",
        isExample: false,
        visibility: "hidden",
        description: "",
    });
    const [formData, setFormData] = useState<Problem | null>(null);

    type Problems = {
        _id: string;
        title: string;
    };

    const [problems, setProblems] = useState<Problems[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked, dataset } = e.target;

        if (name === "input") {
            const index = parseInt(dataset.index, 10);
            const updatedInput = [...testCase.input];
            updatedInput[index] = { ...updatedInput[index], params: value };
            setTestCase((prev) => ({
                ...prev,
                input: updatedInput,
            }));
        } else {
            setTestCase({
                ...testCase,
                [name]: type === "checkbox" ? checked : value,
            });
        }
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
                const fetchedInput = Array.isArray(fetchedTestCase.input)
                ? fetchedTestCase.input.map((item: any) => ({ params: item.params || "" }))
                : [{ params: "" }];
            
                console.log(fetchedInput, "test case setting ", fetchedTestCase.input)
                setTestCase({
                    ...testCase,
                    problem: fetchedTestCase.problem,
                    input: fetchedInput ,
                    expectedOutput: fetchedTestCase.expectedOutput,
                    isExample: fetchedTestCase.isExample,
                    visibility: fetchedTestCase.visibility,
                    description: fetchedTestCase.description,
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

    useEffect(() => {
        if (!testCase.problem) return;

        const fetchProblem = async () => {
            try {
                const selectedProblem = problems.find(
                    (problem) => problem.title === testCase.problem
                );
                if (selectedProblem?._id) {
                    const response = await axios.get(
                        `http://localhost:5002/problem/getProblem/${selectedProblem._id}`
                    );
                    setFormData(response.data);

                    setTestCase((prev) => ({
                        ...prev,
                        input: Array(response.data.inputFormat.length).fill({ params: "" }),
                    }));
                }
            } catch (error) {
                console.error("Error fetching problem:", error);
            }
        };

        fetchProblem();
    }, [testCase.problem, problems]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.put(
                `http://localhost:4001/problem/testCase/testCase/${id}`,
                testCase
            );
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
                            <select
                                id="problem"
                                name="problem"
                                value={testCase.problem}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
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
                            <p className="text-sm text-gray-400 mt-1">
                                You cannot change the problem. You can modify other fields.
                            </p>
                        </div>

                        {formData && formData.inputFormat.map((inputParam: any, index: number) => (
                            <div key={index} className="flex flex-col mb-4">
                                <label htmlFor={`input-${index}`} className="text-sm font-medium mb-1">
                                    {inputParam?.name} ({inputParam?.type})
                                </label>
                                <textarea
                                    id={`input-${index}`}
                                    name="input"
                                    data-index={index}
                                    value={testCase.input[index]?.params}
                                    onChange={handleChange}
                                    className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter ${inputParam?.name}`}
                                    required
                                ></textarea>
                            </div>
                        ))}

                        {formData && formData.outputFormat && (
                            <div className="flex flex-col mb-4">
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
                        )}

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
