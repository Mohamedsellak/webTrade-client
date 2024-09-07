"use client";

import React, { useEffect, useState } from 'react';
import UserHeader from "../userheader";
import Loader from "../../../_components/loader";
import CryptoMiniCharts from './CryptoMiniCharts'; 
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Page = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [recentlyAddedCoins, setRecentlyAddedCoins] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch("https://api.coinranking.com/v2/coins?limit=6", {
                headers: {
                    'x-access-token': 'coinranking3d430304bd116dd46418a28342ed1db304c8d682d22ff9f6'
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                const trending = data.data.coins.slice(0, 3);
                const recentlyAdded = data.data.coins.slice(3, 6);
                setTrendingCoins(trending);
                setRecentlyAddedCoins(recentlyAdded);
            } else {
                setError(data.message || 'Failed to fetch coin data');
            }
        } catch (error) {
            console.error('Error fetching coin data:', error);
            setError('An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderCoins = (coins, type) => (
        <ul className="mt-4">
            {coins.map((coin) => (
                <li key={coin.uuid} className="flex items-center justify-between p-4 bg-muted rounded-full bg-neutral-800 mb-3 border border-white">
                    <span className="flex items-center">
                        <img src={coin.iconUrl} alt={coin.name} className="h-6 w-6 mr-2" />
                        <span className="font-semibold">{coin.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{coin.symbol}</span>
                    </span>
                    <span className={`flex items-center ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.change > 0 ? <FaArrowUp /> : <FaArrowDown />} 
                        {type === 'trending' ? `${coin.change}%` : `$${parseFloat(coin.price).toFixed(2)}`}
                    </span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="text-gray-100 p-6 rounded-lg shadow-lg lg:p-20 lg:pt-4">
            <UserHeader title={"Dashboard"} />
            
            {isLoading ? <Loader isLoading={isLoading} /> : (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                        <div className="p-8 bg-neutral-900 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-4">Trending Coins</h2>
                            {trendingCoins.length > 0 ? renderCoins(trendingCoins, 'trending') : <p className="text-red-500">{error || "No trending coins available."}</p>}
                        </div>
                        <div className="p-8 bg-neutral-900 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-4">Recently Added Coins</h2>
                            {recentlyAddedCoins.length > 0 ? renderCoins(recentlyAddedCoins, 'recentlyAdded') : <p className="text-red-500">{error || "No recently added coins available."}</p>}
                        </div>
                    </div>

                    <div className="p-8 bg-neutral-900 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold text-white mb-4">Trending Coins Chart</h2>
                            <div className="flex overflow-x-auto space-x-4">
                                <CryptoMiniCharts symbols={[...trendingCoins, ...recentlyAddedCoins].map(coin => `CRYPTO:${coin.symbol}USD`)} />
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
