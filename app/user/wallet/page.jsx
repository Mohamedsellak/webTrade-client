import Link from 'next/link';
import React from 'react';
import UserHeader from "../../_components/userheader"

const Page = () => {
    const depositData = [
        { amount: '$500.00', date: '2024-08-25', status: 'Pending' },
        { amount: '$1,000.00', date: '2024-08-24', status: 'Approved' },
        { amount: '$300.00', date: '2024-08-23', status: 'Rejected' },
    ];

    const withdrawalData = [
        { amount: '$200.00', date: '2024-08-25', status: 'Pending' },
        { amount: '$700.00', date: '2024-08-24', status: 'Approved' },
        { amount: '$150.00', date: '2024-08-23', status: 'Rejected' },
    ];

    const renderTable = (title, data) => (
        <div className="w-full p-4">
            <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
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
                        {data.map((item, index) => (
                            <tr key={index} className="text-gray-400">
                                <td className="px-4 py-3">{item.amount}</td>
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                            item.status === 'Approved'
                                                ? 'bg-green-500 text-white'
                                                : item.status === 'Pending'
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-red-500 text-white'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="text-gray-100 p-6 rounded-lg shadow-lg lg:p-20 lg:pt-4"> 

            <UserHeader title={"Wallet"}/>

            <div className='flex justify-between items-center mb-10'>
                <h1 className='text-4xl font-bold'>Total Balance : 150$</h1>
                <div >
                    <Link href={"/user/deposit"} className='text-base px-5 py-3 me-4 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black transition duration-300'>deposit</Link>
                    <Link href={"/user/withdraw"} className='text-base px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black transition duration-300'>Withdraw</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl shadow-md border border-gray-700">
                    {renderTable('Deposits', depositData)}
                </div>
                
                <div className="p-5 rounded-xl shadow-md border border-gray-700">
                    {renderTable('Withdrawals', withdrawalData)}
                </div>
            </div>
        </div>
    );
};

export default Page;
