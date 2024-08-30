import React from 'react';

const page = () => {
    const tradingHistory = [
        {
            username: 'Hans Burger',
            type: 'Buy',
            status: 'Win',
            amount: '$ 863.45',
        },
        {
            username: 'Jolina Angelie',
            type: 'Sell',
            status: 'Loss',
            amount: '$ 369.95',
        },
        // Add more trading history data as needed
    ];

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-lg lg:p-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold mb-6 text-white">Trading History</h2>
                <div>
                    <button className="text-base px-5 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white">
                        Refresh
                    </button>
                </div>
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-12" style={{ backgroundColor:"#151617" }}>
                <input
                    type="text"
                    className="p-4 mb-6 border-2 border-zinc-700 rounded-full w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search for trading history"
                />

                <div className="w-full overflow-x-auto">
                    <table className="w-full border border-zinc-700 text-center">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide uppercase text-white" style={{ backgroundColor:"#212325" }}>
                                <th className="px-4 py-3">Username</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {tradingHistory.map((trade, index) => (
                                <tr key={index} className="text-gray-400">
                                    <td className="px-4 py-3">{trade.username}</td>
                                    <td className="px-4 py-3">{trade.type}</td>
                                    <td className="px-4 py-3">
                                        {trade.status === 'Win' ? (
                                            <span className="px-2 py-1 font-semibold leading-tight bg-blue-500 text-white rounded-full">
                                                {trade.status}
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 font-semibold leading-tight bg-red-500 text-white rounded-full">
                                                {trade.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{trade.amount}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center space-x-4">
                                            <button className="px-4 py-2 text-sm font-medium leading-5 bg-blue-700 text-blue-100 rounded-full hover:bg-blue-800 transition">
                                                View
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

export default page;
