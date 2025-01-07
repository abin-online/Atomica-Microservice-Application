"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const Testcases = () => {


    type TestCase = {
        problem : string;
        input: string;
        expectedOutput: string
    }

    const [testCases, setTestCases] = useState<TestCase[]>([])

    const router = useRouter()
    const handleCreateTestCase = () => {
        router.replace('/admin/createTestCase')
    }

    useEffect(()=> {
        const fetchTestCase = async ()=> {
            try {
                const response = await axios.get('http://localhost:4001/problem/testCase/testCases');
                console.log(response)
                setTestCases(response?.data)
            } catch (error) {
                toast.error('error fetching testcases');
            }
        }
        fetchTestCase()
    },[])

    return (
        <div className="flex bg-gray-100">
            <Header />
            <Sidebar />
            <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
                <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-semibold">Test Cases</h1>
                        <button
                            onClick={handleCreateTestCase}
                            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                        >
                            Create New Testcases
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Testcases;
