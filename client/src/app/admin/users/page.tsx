'use client'

import { blockUser, getUsersData } from "@/api/admin";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { removeUser } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UsersPage = () => {
    interface User {
        _id: string;
        name: string;
        email: string;
        is_blocked: boolean;
        joined: string | null;
    }

    const dispatch = useAppDispatch()

    const [users, setUsers] = useState<User[]>([]);

    const handleBlock = async (userId: string) => {
        console.log('Blocking...!', userId);
        const response = await blockUser(userId);
        console.log("user removed ",dispatch(removeUser()))
        if(response.statusText == 'OK') {
            const updatedUser = users.find((user)=> user._id == userId)
            toast.success(`${updatedUser?.name} is ${updatedUser?.is_blocked ? 'unblocked' : 'blocked'} successfully`)
        }else{
            toast.error(`An error occured in backend`)
        }
       
    };

    useEffect(() => {
        try {
            const getUsers = async () => {
                let users = await getUsersData();
                //console.log('users', users.data);
                setUsers(users.data || []);
            };
            getUsers();
        } catch (error: any) {
            toast.error('Error in fetching users');
        }
    }, [users]);

    return (
<div className="flex bg-gray-100">
  <Header />
  <Sidebar />
  <div className="flex-1 bg-gray-800 text-white p-4">
    <h1 className="text-xl font-bold mb-4">Users</h1>
    <table className="w-full my-24 bg-gray-700 rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-3 text-left text-white">Name</th>
          <th className="p-3 text-left text-white">Email</th>
          <th className="p-3 text-left text-white">Status</th>
          <th className="p-3 text-left text-white">Action</th>
          <th className="p-3 text-left text-white">Joined</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'
            } hover:bg-gray-500 transition`}
          >
            <td className="p-3">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.is_blocked ? 'BLOCKED' : 'ACTIVE'}</td>
            <td className="p-3">
              <button
                onClick={() => handleBlock(user._id)}
                className={`w-20 h-8 rounded-lg text-white ${
                  user.is_blocked ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
                } transition`}
              >
                {user.is_blocked ? 'UNBLOCK' : 'BLOCK'}
              </button>
            </td>
            <td className="p-3">{user.joined || '13/12/2024'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    );
};

export default UsersPage;
