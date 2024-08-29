"use client"
import React, { useEffect, useState } from 'react';

export default function page() {

    const [Wallets,setWalets] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallets`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWalets(data);
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log('fetching users done')
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRefresh = () => {
        fetchUsers();
    };

  return (
   
    <div className="p-6 rounded-lg shadow-lg lg:p-20">
        <div className='flex items-center justify-between mb-8'>
            <h2 className="text-4xl font-bold mb-6 text-blue-500">Wallets Addresses</h2>
            <button className='text-base ms-2 px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black'>Add Adress</button>
        </div>
    
    <div className="space-y-4">
        {Wallets.map((wallet,index) => (
            <div key={index} className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
                <label className="block mb-2 ms-2 text-lg font-semibold text-blue-500">{wallet.type} Wallet Address</label>
                <div className="flex items-center">
                    <div className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" >
                    {wallet.address}
                    </div>
                    <button className="ml-2 bg-accent text-black bg-blue-500 px-4 py-4 rounded-full hover:bg-blue-800 hover:text-white transition transform hover:scale-105">Change address</button>
                </div>
            </div>
        ))}
        
    </div>
</div>

  )
}
