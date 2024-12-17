'use client'





import React from 'react'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/SideBar'

import Link from 'next/link';

const Problem = () => {


  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="flex-1 my-24 bg-gray-100 p-4">
        <div className="flex items-center justify-between my-6 ">
          <h1 className="text-xl font-bold">Quick Test</h1>
          <button className="px-4 py-3 mr-6 bg-gray-800 text-white rounded-full hover:bg-gray-900 shadow-lg">
            <Link href={'/admin/createQuickTest'}>
              Create new
            </Link>
          </button>
        </div>
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Problem
