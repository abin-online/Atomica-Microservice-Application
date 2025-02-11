
'use client'
import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header"; // Assuming you have a Header component
import Sidebar from "@/components/admin/SideBar"; // Assuming you have a Sidebar component
import { getProblem, getUnblockedProblems } from "@/api/problem";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createTestCase } from "@/api/testCases";

// Define types for inputFormat and outputFormat
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

const CreateTestCase = () => {
    const router = useRouter();
    const [testCase, setTestCase] = useState({
        problem: "",
        input: [{ params: "" }], // Initialize input with the right structure
        expectedOutput: "",
        isExample: false,
        visibility: "hidden",
        description: "",
    });
    const [formData, setFormData] = useState<Problem | null>(null); // Define the type of formData

    type Problems = {
        _id: string;
        title: string;
    };

    const [problems, setProblems] = useState<Problems[]>([]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked, dataset } = e.target;

        if (name === "input") {
            const index = parseInt(dataset.index, 10);
            const updatedInput = [...testCase.input]; // Create a copy of the input array
            updatedInput[index] = { ...updatedInput[index], params: value }; // Update only the specific input param
            setTestCase((prev) => ({
                ...prev,
                input: updatedInput, // Update only the input field
            }));
        } else {
            setTestCase({
                ...testCase,
                [name]: type === "checkbox" ? checked : value, // Update other fields normally
            });
        }
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const problems: any = await getUnblockedProblems();
                setProblems(problems?.data);
            } catch (error) {
                toast.error("Error fetching problem data");
            }
        };
        fetchProblems();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Submitting Test Case: ", testCase);
        try {
        
            const response : any = await createTestCase(testCase)
            console.log(response);
            toast.success("Test case created");
            router.push("/admin/testcases");
        } catch (error) {
            toast.error("Error submitting test case");
        }
    };

    useEffect(() => {
        if (!testCase.problem) return; // Only fetch if a problem is selected

        const fetchProblem = async () => {
            try {
                const selectedProblem = problems.find(
                    (problem) => problem.title === testCase.problem
                );
                if (selectedProblem?._id) {

                    const response : any = await getProblem(selectedProblem._id)
                    console.log("response====> ", response);
                    setFormData(response.data); // Update form data with the fetched problem

                    // Dynamically set input fields based on the inputFormat
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
                                value={testCase.problem}
                                onChange={handleChange}
                                className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select a problem
                                </option>
                                {Array.isArray(problems) && problems.map((problem) => (
                                    <option key={problem._id} value={problem.title}>
                                        {problem.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData && Array.isArray(formData.inputFormat) && formData.inputFormat.map((inputParam: InputFormat, index: number) => (
                            <div key={index} className="flex flex-col mb-4">
                                <label htmlFor={`input-${index}`} className="text-sm font-medium mb-1">
                                    {inputParam?.name} ({inputParam?.type})
                                </label>
                                <textarea
                                    id={`input-${index}`}
                                    name="input"
                                    data-index={index}
                                    value={testCase.input[index]?.params || ""}
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
                                Visibility:
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
                            Submit Test Case
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTestCase;
