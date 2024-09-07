"use client";
import React, { useEffect, useState } from 'react';
import ShowModel from "../_components/models/deposit/show";

const Page = () => {
    const [deposits, setDeposits] = useState([]);
    const [showModelStatus, setShowModelStatus] = useState(false);
    const [depositInfo, setDepositInfo] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deposit`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => fetchData();

    const handleDelete = async (depositId, userId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deposit/${depositId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('Failed to delete deposit');
            }
        } catch (error) {
            console.error('Error deleting deposit:', error);
        }
    };

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
                                            <button 
                                                className="px-4 py-2 text-sm font-medium leading-5 bg-white text-black rounded-full"
                                                onClick={() => {
                                                    setShowModelStatus(true);
                                                    setDepositInfo({
                                                        ...deposit,
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
                                                onClick={() => handleDelete(deposit._id, user._id)}
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

            <ShowModel 
                isOpenModel={showModelStatus}
                onClose={() => setShowModelStatus(false)}
                depositInfo={depositInfo}
                refresh={handleRefresh}
            />

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Pending', deposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Approved', deposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {renderTable('Rejected', deposits)}
            </div>
        </div>
    );
};

export default Page;
