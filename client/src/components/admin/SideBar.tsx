'use client';

// components/Sidebar.js
import { useState } from 'react';
import { FiHome, FiUsers, FiArrowRightCircle, FiArrowLeftCircle, FiLogOut, FiAlertTriangle, FiOctagon, FiTag, FiBriefcase, FiType } from 'react-icons/fi';
import { adminLogout } from '@/api/adminAuthentication';
import { useAppDispatch } from '@/lib/hook';
import { removeUser } from '@/lib/features/users/userSlice';
import { removeAdmin } from '@/lib/features/users/adminSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Sidebar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', icon: <FiHome />, path: '/admin/dashboard' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'QuickTest', icon: <FiOctagon />, path: '/admin/quickTest' },
    { name: 'Problem', icon: <FiAlertTriangle />, path: '/admin/problem' },
    {name: 'Testcases', icon : <FiType/>, path: '/admin/testcases'},
    { name: 'Tags', icon: <FiTag />, path: '/admin/tags' },
    {name : 'Badge', icon: <FiBriefcase/>, path: '/admin/badges'}
  ];

  const handleLogout = async () => {
    try {
      const response = await adminLogout()
      console.log('admin logout response = >', response)

      if (response?.message == 'logout success') {
        dispatch(removeAdmin());
        localStorage.removeItem('admin');
        toast.success('logout success')
        router.push('/admin')
      } else {
        toast.error('An error occured')
      }


    } catch (error) {

    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-gray-800 text-white h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-16"
          } duration-300 shadow-2xl`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center gap-x-4">
          <div className="text-xl font-bold"></div>
          <button onClick={toggleSidebar} className="text-xl">
            {isOpen ? "◁" : "▷"}
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-10">
          {menuItems.map((item, index) => (
            
              <li key={index} onClick={() => router.push(item.path)} className="flex items-center gap-x-4 p-2 my-4 hover:bg-gray-700 rounded-lg cursor-pointer">
                <div className="text-2xl">{item.icon}</div>
                <span
                  className={`text-base font-medium ${isOpen ? "" : "hidden"
                    } duration-700`}
                >
                  {item.name}
                </span>
              </li>
            
          ))}
          <li
            onClick={handleLogout}
            className="flex items-center gap-x-4 p-2 my-4 hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <div className="text-2xl"><FiLogOut /></div>
            <span
              className={`text-base font-medium ${isOpen ? "" : "hidden"
                } duration-700`}
            >
              Logout
            </span>
          </li>
        </ul>
        <div className=" flex items-center gap-x-4">
          <button onClick={toggleSidebar} className="text-4xl">
            {isOpen ? <FiArrowLeftCircle /> : <FiArrowRightCircle />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`ml-${isOpen ? "48" : "16"} flex-1 overflow-auto p-5 duration-300`}
        style={{
          marginLeft: isOpen ? "12rem" : "1rem", // Adjust dynamically based on sidebar state
        }}
      >

      </div>
    </div>
  );
};

export default Sidebar;
