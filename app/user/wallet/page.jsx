"use client"
import React, { useEffect, useState } from 'react';
import UserHeader from "../_components/userheader"
import DepositModel from "../_components/depositModel"
import WithdrawModel from "../_components/withdrawModel"

const Page = () => {

    const [depositData, setDepositData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);

    const [depositModelStatus,setDepositModelStatus] =useState(false)
    const [withdrawModelStatus,setWithdrawModelStatus] =useState(false)

    const [refresh,setRefresh] =useState(false)

    useEffect(() => {
        setRefresh(false)
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token") || ""
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },
                });

                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.removeItem("authData")
                    localStorage.setItem("authData",JSON.stringify(data))
                    
                    // console.log(data);
                    setDepositData(data.deposit || []);
                    setWithdrawData(data.withdraw || []);
                }else{
                    console.log(response.json())
                }
                
            } catch (error) {
                console.error('Fetching data failed:', error);
            }
        };

        fetchData();
    }, [refresh]);
    

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
                        {data.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-gray-400 py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                        {data.map((item, index) => (
                            <tr key={index} className="text-gray-400">
                                <td className="px-4 py-3">{item.amount}</td>
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                            item.status === 'approved'
                                                ? 'bg-blue-500 text-white'
                                                : item.status === 'pending'
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
                <h1 className='text-4xl font-bold'>Total Balance : {JSON.parse(localStorage.getItem("authData")).totalBalance}$</h1>
                <div >
                    <button 
                        className='text-base px-5 py-3 me-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition duration-300'
                        onClick={()=> setDepositModelStatus(true)}
                    >deposit</button>

                    <button 
                        className='text-base px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition duration-300'
                        onClick={()=> setWithdrawModelStatus(true)}
                    >Withdraw</button>
                </div>
            </div>


            <DepositModel 
                isOpenModel={depositModelStatus} 
                onClose={()=>setDepositModelStatus(false) }
                refresh={()=>setRefresh(true)}
            />
            <WithdrawModel 
                isOpenModel={withdrawModelStatus} 
                onClose={()=>{setWithdrawModelStatus(false)}}
                refresh={()=>setRefresh(true)}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
