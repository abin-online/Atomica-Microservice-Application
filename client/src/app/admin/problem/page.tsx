'use client'

import React, { useEffect } from 'react'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/SideBar'
import { useAppDispatch } from '@/lib/hook'
import { setAdmin } from '@/lib/features/users/adminSlice'
import { useRouter } from 'next/navigation'
const Problem = () => {
  
      const dispatch = useAppDispatch()
      
      const router = useRouter()
      useEffect(() => {
          const storedAdmin = localStorage.getItem('admin');
          if (storedAdmin) {
            dispatch(setAdmin(JSON.parse(storedAdmin)));
          }else{
            router.push(`/admin`)
        }
        }, [dispatch]);
  return (
    <div className="flex">
    <Header />
    <Sidebar />
    </div>
  )
}

export default Problem
