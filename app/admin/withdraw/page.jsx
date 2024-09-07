"use client";

import React, { useEffect, useState } from 'react';
import WithdrawDetails from "../_components/models/withdraw/show"; // Adjust the path if needed

const Page = () => {
    const [withdraws, setWithdraws] = useState([]);
    const [showModelStatus, setShowModelStatus] = useState(false);
    const [withdrawInfo, setWithdrawInfo] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/withdraw`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWithdraws(data);
            } else {
                console.error('Failed to fetch withdraw data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => fetchData();

    const handleDelete = async (withdrawId, userId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/withdraw/${withdrawId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                setWithdraws(prevWithdraws =>
                    prevWithdraws.map(user => ({
                        ...user,
                        withdraw: user.withdraw.filter(withdraw => withdraw._id !== withdrawId)
                    }))
                );
            } else {
                console.error('Failed to delete withdraw');
            }
        } catch (error) {
            console.error('Error deleting withdraw:', error);
        }
    };

    const renderTable = (title, data) => (
        <div>
            <h3 className="text-2xl font-semibold text-white mb-4">{title} Withdraws</h3>
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
                            const filteredWithdraws = user.withdraw.filter(withdraw => withdraw.status === title.toLowerCase());

                            return filteredWithdraws.map((withdraw, withdrawIndex) => (
                                <tr key={withdrawIndex} className="text-gray-400">
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{withdraw.amount}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center space-x-4">
                                            <button 
                                                className="px-4 py-2 text-sm font-medium leading-5 bg-white text-black rounded-full"
                                                onClick={() => {
                                                    setShowModelStatus(true);
                                                    setWithdrawInfo({
                                                        ...withdraw,
                                                        userId: user._id,
                                                        username: user.username,
                                                        email: user.email,
                                                        totalBalance: user.totalBalance
                                                    });
                                                }}
                                            >
                                                Open
                                            </button>
                                            <button
                                                onClick={() => handleDelete(withdraw._id, user._id)}
                                                className="px-4 py-2 text-sm font-medium leading-5 bg-white text-black rounded-full"
                                            >
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
                <h2 className="text-4xl mb-6 text-white">Deposit History</h2>
                <button 
                    className="text-base px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black" 
                    onClick={handleRefresh}
                >
                    Refresh
                </button>
            </div>

            <WithdrawDetails 
                isOpenModel={showModelStatus}
                onClose={() => setShowModelStatus(false)}
                withdrawInfo={withdrawInfo}
                refresh={handleRefresh}
            />

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Pending', withdraws)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Approved', withdraws)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Rejected', withdraws)}
            </div>
        </div>
    );
};

export default Page;
