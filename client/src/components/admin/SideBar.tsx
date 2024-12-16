'use client';

// components/Sidebar.js
import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers,FiArrowRightCircle,FiArrowLeftCircle,  FiLogOut, FiAlertTriangle, FiOctagon } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', icon: <FiHome />, path: '/' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'Quick Test', icon: <FiOctagon />, path: '/admin/quickTest' },
    { name: 'Problem', icon: <FiAlertTriangle />, path: '/admin/problem' },
    { name: 'Logout', icon: <FiLogOut />, path: '/logout' },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen p-5 pt-8 ${
        isOpen ? 'w-64' : 'w-16'
      } duration-300 relative`}
    >
      {/* Logo */}
      <div className="flex items-center gap-x-4">
        <div className="text-xl font-bold"></div>
        <button onClick={toggleSidebar} className="text-xl">
          {isOpen ? '◁' : '▷'}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-10">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-x-4 p-2 my-4 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <div className="text-2xl">{item.icon}</div>
            <Link href={item.path}>
              <span className={`text-base font-medium ${isOpen ? '' : 'hidden'}`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-x-4">
        <button onClick={toggleSidebar} className="text-4xl">
          {isOpen ? <FiArrowRightCircle/> : <FiArrowLeftCircle/>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
