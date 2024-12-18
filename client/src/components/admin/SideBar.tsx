'use client';

// components/Sidebar.js
import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiArrowRightCircle, FiArrowLeftCircle, FiLogOut, FiAlertTriangle, FiOctagon } from 'react-icons/fi';
import { adminLogout } from '@/api/admin';
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
    { name: 'Home', icon: <FiHome />, path: '/' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'QuickTest', icon: <FiOctagon />, path: '/admin/quickTest' },
    { name: 'Problem', icon: <FiAlertTriangle />, path: '/admin/problem' },
  ];

  const handleLogout = async ()=> {
    try {
      const response = await adminLogout()
      console.log('admin logout response = >' , response)
      
      if(response?.message == 'logout success') {
        dispatch(removeAdmin());
        toast.success('logout success')
        router.push('/admin')
      }else{
        toast.error('An error occured')
      }
      

    } catch (error) {
      
    }
  }

  return (
    <div
      className={`bg-gray-800 text-white h-screen p-5 pt-8 ${isOpen ? 'w-64' : 'w-16'
        } duration-300 relative shadow-2xl`} // Added shadow here
    >
      {/* Logo */}
      <div className="flex items-center gap-x-4">
        <div className="text-xl font-bold"></div>
        <button onClick={toggleSidebar} className="text-xl">
          {isOpen ? '◁' : '▷'}
        </button>
      </div>

      {/* Menu */}
      <ul className="mt-10">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <li

              className="flex items-center gap-x-4 p-2 my-4 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <div className="text-2xl">{item.icon}</div>

              <span
                className={`text-base font-medium ${isOpen ? '' : 'hidden'
                  } duration-700 relative`}
              >
                {item.name}
              </span>

            </li>
          </Link>
        ))}

        <li onClick={handleLogout}

          className="flex items-center gap-x-4 p-2 my-4 hover:bg-gray-700 rounded-lg cursor-pointer"
        >
          <div className="text-2xl"><FiLogOut /></div>

          <span
            className={`text-base font-medium ${isOpen ? '' : 'hidden'
              } duration-700 relative`}
          >
            Logout
          </span>

        </li>

      </ul>

      {/* Toggle Button */}
      <div className="flex items-center gap-x-4">
        <button onClick={toggleSidebar} className="text-4xl">
          {isOpen ? <FiArrowLeftCircle /> : <FiArrowRightCircle />}
        </button>
      </div>
    </div>
  );

};

export default Sidebar;
