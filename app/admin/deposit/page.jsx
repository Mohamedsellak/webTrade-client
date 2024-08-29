"use client";

import React, { useEffect, useState } from 'react';

const page = () => {
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deposit`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    }
                }); // Replace with your actual API endpoint

                if (response.ok) {
                    const data = await response.json();
                    setDeposits(data);
                } else {
                    console.error('Failed to fetch deposit data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderTable = (title, data) => (
        <div>
            <h3 className="text-2xl font-semibold text-white mb-4">{title} Deposits</h3>
            <div className="w-full overflow-x-auto">
                <table className="w-full border border-zinc-700 text-center">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide uppercase text-white" style={{ backgroundColor: "#212325" }}>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent">
                        {data.map((user, index) => {
                            const filteredDeposits = user.deposit.filter(deposit => deposit.status === title.toLowerCase());

                            return filteredDeposits.map((deposit, depositIndex) => (
                                <tr key={depositIndex} className="text-gray-400">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{deposit.amount}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center space-x-4">
                                            <button className="px-4 py-2 text-sm font-medium leading-5 bg-blue-700 text-blue-100 rounded-full hover:bg-blue-800 transition">
                                                Open
                                            </button>
                                            <button className="px-4 py-2 text-sm font-medium leading-5 bg-red-700 text-red-100 rounded-full hover:bg-red-800 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-lg lg:p-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold mb-6 text-blue-500">Deposit History</h2>
                <div>
                    <button className="text-base px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black" onClick={() => {/* Add refresh logic here */}}>
                        Refresh
                    </button>
                </div>
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Pending Deposits Table */}
                {renderTable('Pending', deposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Approved Deposits Table */}
                {renderTable('Approved', deposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Rejected Deposits Table */}
                {renderTable('Rejected', deposits)}
            </div>

        </div>
    );
};

export default page;