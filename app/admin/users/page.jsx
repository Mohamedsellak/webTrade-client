"use client"
import React, { useEffect, useState } from 'react';
import AddModel from "../_components/models/user/addModel"
import EditModel from "../_components/models/user/editModel"

const Users = () => {
    const [users, setUsers] = useState([]);
    const [addModelStatus, setAddModelStatus] = useState(false);
    const [editModelStatus, setEditModelStatus] = useState(false);
    const [user,setUser] = useState({})

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            console.log("done")
        }
    };

    const handleDelete = async (userId) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
          });
          if (response.ok) {
            handleRefresh()
          } else {
            throw new Error('Failed to delete wallets');
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRefresh = () => fetchUsers()

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-lg lg:p-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold mb-6 text-white">Users</h2>
                <div>
                    <button
                        onClick={handleRefresh}
                        className="text-base px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={() => setAddModelStatus(true)}
                        className="text-base ms-2 px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition"
                    >
                        Create User
                    </button>
                </div>
            </div>

            <AddModel  
                isOpenModel={addModelStatus} 
                onClose={()=> setAddModelStatus(false)}
                refresh={handleRefresh}
            />

            <EditModel  
                userInfo={user}
                isOpenModel={editModelStatus} 
                onClose={()=> setEditModelStatus(false)}
                refresh={handleRefresh}
            />


            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-12" style={{ backgroundColor: "#151617" }}>
                <input
                    type="text"
                    className="p-4 mb-6 border-2 border-zinc-700 rounded-full w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search for user"
                />

                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-zinc-700">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left uppercase text-white" style={{ backgroundColor: "#212325" }}>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Verified</th>
                                <th className="px-4 py-3">Total Balance</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {users.map((user) => (
                                <tr key={user._id} className="text-gray-400">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        {user.verified ? (
                                            <span className="px-2 py-1 font-semibold leading-tight bg-blue-500 text-white rounded-full">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 font-semibold leading-tight bg-red-500 text-white rounded-full">
                                                No
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{user.totalBalance}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-4">
                                            <button 
                                                onClick={() => {
                                                    setUser(user)
                                                    setEditModelStatus(true)
                                                }}
                                                className="px-4 py-2 text-sm font-medium leading-5 bg-blue-700 text-blue-100 rounded-full hover:bg-blue-800 transition">
                                                Edit
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className="px-4 py-2 text-sm font-medium leading-5 bg-red-700 text-red-100 rounded-full hover:bg-red-800 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
