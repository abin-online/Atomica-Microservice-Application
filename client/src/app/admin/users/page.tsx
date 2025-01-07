'use client';

import { blockUser, getUsersData } from "@/api/adminAuthentication";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { FaSyncAlt } from "react-icons/fa";
import { useConfirmationDialog } from "@/app/customHooks/useConfirmationDialog";

const UsersPage = () => {
  interface User {
    _id: string;
    name: string;
    email: string;
    is_blocked: boolean;
    createdAt: string | null;
  }

  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 5;
  const { dialog, openDialog } = useConfirmationDialog();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await getUsersData();
        setUsers(data || []);
      } catch (error) {
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBlock = async (userId: string) => {
    setUpdatingId(userId);
    try {
      const response = await blockUser(userId);
      if (response.statusText === "OK") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, is_blocked: !user.is_blocked } : user
          )
        );
        const updatedUser = users.find((user) => user._id === userId);
        toast.success(
          `${updatedUser?.name} is ${updatedUser?.is_blocked ? "unblocked" : "blocked"} successfully`
        );
      } else {
        throw new Error("Backend error");
      }
    } catch (error) {
      toast.error("An error occurred while updating user status");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmBlock = (user: User) => {
    openDialog({
      title: user.is_blocked ? "Unblock User" : "Block User",
      message: `Are you sure you want to ${user.is_blocked ? "unblock" : "block"} this user?`,
      onConfirm: () => handleBlock(user._id),
    });
  };

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-gray-100">
      <Header />
      <Sidebar />
      <div className="my-20 flex bg-gray-900 text-white min-h-screen w-full p-6">
        <div className="flex flex-col w-full p-6 bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">User List</h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <FaSyncAlt className="text-4xl animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-xl text-gray-400">No users found.</p>
          ) : (
            <>
              <table className="w-full table-auto bg-gray-800 text-left border-collapse border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="p-4 border-b border-gray-600">Name</th>
                    <th className="p-4 border-b border-gray-600">Email</th>
                    <th className="p-4 border-b border-gray-600">Status</th>
                    <th className="p-4 border-b border-gray-600">Actions</th>
                    <th className="p-4 border-b border-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-700">
                      <td className="p-4 border-b border-gray-600">{user.name}</td>
                      <td className="p-4 border-b border-gray-600">{user.email}</td>
                      <td className="p-4 border-b border-gray-600">
                        <span
                          className={
                            user.is_blocked
                              ? "text-red-400 font-semibold"
                              : "text-green-400 font-semibold"
                          }
                        >
                          {user.is_blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-600">
                        <button
                          onClick={() => confirmBlock(user)}
                          disabled={updatingId === user._id}
                          className={`w-32 py-2 px-4 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center space-x-2 ${
                            user.is_blocked
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } ${
                            updatingId === user._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {user.is_blocked ? (
                            <>
                              <AiFillCloseCircle />
                              <span>Unblock</span>
                            </>
                          ) : (
                            <>
                              <AiFillCheckCircle />
                              <span>Block</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4 border-b border-gray-600">
                        {user.createdAt || "13/12/2024"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                  {dialog}
              <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                  {Array.from(
                    { length: Math.ceil(users.length / userPerPage) },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
