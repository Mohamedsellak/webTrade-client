import React from 'react';

export default function page() {
  return (
   
    <div className="p-6 rounded-lg shadow-lg lg:p-20">
        <div className='flex items-center justify-between mb-8'>
            <h2 className="text-4xl font-bold mb-6 text-blue-500">Wallets Addresses</h2>
            <button className='text-base ms-2 px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black'>Add Adress</button>
        </div>
    
    <div className="space-y-4">
        <div className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
            <label className="block mb-2 ms-2 text-lg font-semibold text-blue-500">USDT ERC20 Wallet Address</label>
            <div className="flex items-center">
                <input type="text" value="0x8dc26F31a76B20E795FID50DA5e0d0da691Cb44B" className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="ml-2 bg-accent text-black bg-blue-500 px-4 py-4 rounded-full hover:bg-blue-800 hover:text-white transition transform hover:scale-105">Change address</button>
            </div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
            <label className="block mb-2 ms-2 text-lg font-semibold text-blue-500">USDT TRC20 Wallet Address</label>
            <div className="flex items-center">
                <input type="text" value="TYdCy2SzzWeEE2TqKKMK3BgRwWsh6dmv4g" className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="ml-2 bg-accent text-black bg-blue-500 px-4 py-4 rounded-full hover:bg-blue-800 hover:text-white transition transform hover:scale-105">Change address</button>
            </div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
            <label className="block mb-2 ms-2 text-lg font-semibold text-blue-500">BTC Wallet Address</label>
            <div className="flex items-center">
                <input type="text" value="bc1qupu9ktheltq9knqa0nay3wum5uj5wzkxx52xl" className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="ml-2 bg-accent text-black bg-blue-500 px-4 py-4 rounded-full hover:bg-blue-800 hover:text-white transition transform hover:scale-105">Change address</button>
            </div>
        </div>
        <div className="bg-card p-4 rounded-2xl shadow-md border-l-8 border-white">
            <label className="block mb-2 ms-2 text-lg font-semibold text-blue-500">ETH Wallet Address</label>
            <div className="flex items-center">
                <input type="text" value="0x8dc26F31a76B20E795FID50DA5e0d0da691Cb44B" className="text-white flex-1 p-4 border-2 border-zinc-700 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="ml-2 bg-accent text-black bg-blue-500 px-4 py-4 rounded-full hover:bg-blue-800 hover:text-white transition transform hover:scale-105">Change address</button>
            </div>
        </div>
    </div>
</div>

  )
}
