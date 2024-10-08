"use client";
import React, { useEffect, useState } from 'react';
import UserHeader from "../_components/userheader";
import DepositModel from "../_components/models/deposit/depositModel";
import WithdrawModel from "../_components/models/withdraw/withdrawModel";

const Page = () => {
    const [depositData, setDepositData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);
    const [depositModelStatus, setDepositModelStatus] = useState(false);
    const [withdrawModelStatus, setWithdrawModelStatus] = useState(false);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authData", JSON.stringify(data));
                setDepositData(data.deposit || []);
                setWithdrawData(data.withdraw || []);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch data');
                console.log(errorData);
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
            setError('An error occurred while fetching data.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => fetchData();

    const renderTable = (title, data) => (
        <div className="w-full p-4">
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-4">{title}</h3>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full border border-zinc-700 text-center">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide uppercase text-white" style={{ backgroundColor: "#212325" }}>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-gray-400 py-4">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index} className="text-gray-400">
                                    <td className="px-4 py-3">{item.amount}</td>
                                    <td className="px-4 py-3">{item.date}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className="px-2 py-1 font-semibold leading-tight rounded-full text-black bg-white"
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="text-white p-6 lg:p-10 lg:pt-4">
            <UserHeader title={"Wallet"} />

            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-0'>
                    Total Balance: ${JSON.parse(localStorage.getItem("authData")).totalBalance}
                </h1>
                <div>
                    <button 
                        className='text-sm sm:text-base px-4 py-2 me-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300 mb-4 sm:mb-0'
                        onClick={() => setDepositModelStatus(true)}
                    >
                        Deposit
                    </button>

                    <button 
                        className='text-sm sm:text-base px-4 py-2 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition duration-300'
                        onClick={() => setWithdrawModelStatus(true)}
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            <DepositModel 
                isOpenModel={depositModelStatus} 
                onClose={() => setDepositModelStatus(false)}
                refresh={handleRefresh}
            />
            <WithdrawModel 
                isOpenModel={withdrawModelStatus} 
                onClose={() => setWithdrawModelStatus(false)}
                refresh={handleRefresh}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="p-5 rounded-xl shadow-md border border-gray-700">
                    {renderTable('Deposits', depositData)}
                </div>
                
                <div className="p-5 rounded-xl shadow-md border border-gray-700">
                    {renderTable('Withdrawals', withdrawData)}
                </div>
            </div>
        </div>
    );
};

export default Page;
