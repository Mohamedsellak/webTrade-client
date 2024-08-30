"use client";
import React, { useEffect, useState } from 'react';
import AddModel from "../_components/models/wallet/addModel";
import EditModel from "../_components/models/wallet/editModel";

export default function Page() {
  const [wallets, setWallets] = useState([]);
  const [addModelStatus, setAddModelStatus] = useState(false);
  const [editModelStatus, setEditModelStatus] = useState(false);
  const [wallet,setWallet] = useState({})

  const fetchWallets = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallets`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWallets(data);
      } else {
        throw new Error('Failed to fetch wallets');
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Fetching wallets done');
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleRefresh = () => {
    fetchWallets();
  };

  return (
    <div className="p-6 rounded-lg shadow-lg lg:p-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold mb-6 text-white">Wallet Addresses</h2>
        <div>
            <button
                className="text-base ms-2 px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black"
                onClick={handleRefresh}
            >
                Refresh
            </button>
            <button
                className="text-base ms-2 px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black"
                onClick={() => setAddModelStatus(true)}
            >
                Add Address
            </button>
        </div>
      </div>

      <AddModel
        isOpenModel={addModelStatus}
        onClose={() => setAddModelStatus(false)}  // Fixed the onClose handler
        refresh={handleRefresh}
      />

      <EditModel
        wallet={wallet}
        isOpenModel={editModelStatus}
        onClose={() => setEditModelStatus(false)}  // Fixed the onClose handler
        refresh={handleRefresh}
      />

      <div className="space-y-4">
        {wallets.map((wallet, index) => (
          <div key={index} className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
            <label className="block mb-2 ms-2 text-lg font-semibold text-white">
              {wallet.name} Wallet Address
            </label>
            <div className="flex items-center">
              <div className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400">
                {wallet.address}
              </div>
              <button 
                className="ml-2 text-black bg-white px-4 py-4 border-2 border-white rounded-full hover:bg-black hover:text-white transition transform hover:scale-105"
                onClick={()=> {
                  setWallet(wallet)
                  setEditModelStatus(true)
                }}
              >
                Change Address
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
