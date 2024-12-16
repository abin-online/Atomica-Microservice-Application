'use client'

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/SideBar';
import React from 'react';

const Dashboard = () => {
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
