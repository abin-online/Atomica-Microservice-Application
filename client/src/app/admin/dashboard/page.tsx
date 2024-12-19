'use client'

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import { setAdmin } from '@/lib/features/users/adminSlice';
import { useAppDispatch } from '@/lib/hook';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
          dispatch(setAdmin(JSON.parse(storedAdmin)));
        }else{
            router.push(`/admin`)
        }
      }, [dispatch]);


    return (
        <>
            <Header />
            <div>
                <Sidebar />
                {/* Your Dashboard Content */}
            </div>
        </>

    );
};

export default Dashboard;
