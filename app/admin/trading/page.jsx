"use client"
import React, { useEffect, useState } from 'react';
import ShowModel from "../_components/models/trade/show"


const page = () => {
    const [showModelStatus, setShowModelStatus] = useState(false);
    const [tradeInfo, setTradeInfo] = useState({});
    const [Trades, setTrades] = useState([{
        id:'1',
        username:"moh",
        email:"m2m@m.com",
        totalBalance:"150",
        trads:[
            {
                status:"win",
                amount:"1500",
                profitRate:"15"
            }
        ]
    }]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trads`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTrades(data);
            } else {
                console.error('Failed to fetch Trades data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (TradeId, userId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/trads/${TradeId}`, {
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

            <ShowModel 
                isOpenModel={showModelStatus}
                onClose={() => setShowModelStatus(false)}
                tradeInfo={tradeInfo}
            />

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
                                <th className="px-4 py-3">email</th>
                                <th className="px-4 py-3">status</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {Trades.map((user, index) => {
                                const filteredTrades = user.trads

                                return filteredTrades.map((trade, tradeIndex) => (
                                    <tr key={tradeIndex} className="text-gray-400">
                                        <td className="px-4 py-3">{user.username}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{trade.status}</td>
                                        <td className="px-4 py-3">{trade.amount}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center space-x-4">
                                                <button 
                                                    className="px-4 py-2 text-sm font-medium leading-5 bg-white text-black rounded-full"
                                                    onClick={() => {
                                                        setShowModelStatus(true);
                                                        setTradeInfo({
                                                            ...trade,
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
                                                    onClick={() => handleDelete(trade._id, user._id)}
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
        </div>
    );
};

export default page;
