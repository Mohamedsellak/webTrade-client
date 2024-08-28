import React from 'react';

const Users = () => {
    const users = [
        {
            username: 'Hans Burger',
            email: 'hans.burger@example.com',
            verified: true,
            totalBalance: '$ 863.45',
        },
        {
            username: 'Jolina Angelie',
            email: 'jolina.angelie@example.com',
            verified: false,
            totalBalance: '$ 369.95',
        },
        // Add more user data as needed
    ];

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-lg lg:p-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold mb-6 text-blue-500">Users</h2>
                <div>
                    <button className="text-base px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black">
                        Refresh
                    </button>
                    <button className="text-base ms-2 px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black">
                        Create User
                    </button>
                </div>
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-12 " style={{ backgroundColor:"#151617" }}>
                <input
                    type="text"
                    className="p-4 mb-6 border-2 border-zinc-700 rounded-full w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search for user"
                />

                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-zinc-700 ">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left uppercase text-white" style={{ backgroundColor:"#212325" }}>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Verified</th>
                                <th className="px-4 py-3">Total Balance</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {users.map((user, index) => (
                                <tr key={index} className="text-gray-400">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        {user.verified ? (
                                            <span className="px-2 py-1 font-semibold leading-tight bg-green-500 text-white rounded-full">
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
                                            <button className="px-4 py-2 text-sm font-medium leading-5 bg-green-700 text-green-100 rounded-full hover:bg-green-800 transition">
                                                Edit
                                            </button>
                                            <button className="px-4 py-2 text-sm font-medium leading-5 bg-red-700 text-red-100 rounded-full hover:bg-red-800 transition">
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
