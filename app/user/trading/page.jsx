"use client";
import { useState, useEffect } from 'react';
import UserHeader from '../_components/userheader';

const timerOptions = [
  { label: '30s', minAmount: 100, profitRate: 10 },
  { label: '60s', minAmount: 150, profitRate: 12 },
  { label: '90s', minAmount: 200, profitRate: 15 },
  { label: '2min', minAmount: 250, profitRate: 18 },
  { label: '3min', minAmount: 300, profitRate: 20 },
  { label: '4min', minAmount: 350, profitRate: 22 },
  { label: '5min', minAmount: 400, profitRate: 25 },
  { label: '10min', minAmount: 500, profitRate: 30 }
];

const Page = () => {
  const [selectedMarket, setSelectedMarket] = useState('BTC');
  const [selectedAction, setSelectedAction] = useState('Buy');
  const [selectedTimer, setSelectedTimer] = useState(timerOptions[0].label);
  const [minAmount, setMinAmount] = useState(timerOptions[0].minAmount);
  const [profitRate, setProfitRate] = useState(timerOptions[0].profitRate);
  const [amount, setAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState('$0.00');
  const [trads, setTrads] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/trads`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token")
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTrads(data.trads);
      } else {
        console.error('Failed to fetch Trades data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      setCurrentBalance(authData.totalBalance);
    }
    updateTimerValues(selectedTimer);
  }, [selectedTimer]);

  const updateTimerValues = (timer) => {
    const timerData = timerOptions.find(option => option.label === timer);
    if (timerData) {
      setMinAmount(timerData.minAmount);
      setProfitRate(timerData.profitRate);
    }
  };

  return (
    <div className="text-gray-100 p-6 lg:p-10 lg:pt-4">
      <UserHeader title="Trading" />

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Trade Form */}
        <div className="p-6 sm:p-8 xl:p-10 rounded-xl bg-neutral-900">
          <div className='flex items-center justify-between mb-4'>
            <h2 className="text-lg font-bold">Trade</h2>
            <div className="flex border-2 border-white rounded-full p-2">
              <button 
                className={`rounded-full px-6 py-2 mr-2 ${selectedAction === 'Buy' ? 'bg-white text-black' : ''}`}
                onClick={() => setSelectedAction('Buy')}
              >
                Buy
              </button>
              <button 
                className={`rounded-full px-6 py-2 ${selectedAction === 'Sell' ? 'bg-white text-black' : ''}`}
                onClick={() => setSelectedAction('Sell')}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Select Market */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Select Market</h2>
            <select 
              id="market" 
              className="bg-transparent text-white border-2 border-white rounded-full p-4"
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
            >
              <option value="BTC">BTC - $58733.79</option>
              <option value="ETH">ETH - $4000.00</option>
              <option value="USDT">USDT - $1.00</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Select Timer */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Timer</h3>
            <div className="flex flex-wrap">
              {timerOptions.map((option, index) => (
                <button 
                  key={index} 
                  className={`rounded-full px-4 py-2 mr-2 mb-2 ${selectedTimer === option.label ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}
                  onClick={() => setSelectedTimer(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Display Balance, Min Amount, Profit Rate */}
          <div className="mb-4">
            <div className="flex justify-between bg-transparent text-white border border-white rounded-full p-4 mb-4 w-full">
              <p>Your balance</p>
              <div>{currentBalance}</div>
            </div>

            <div className="flex justify-between bg-transparent text-white border border-white rounded-full p-4 mb-4 w-full">
              <p>Minimum trading amount</p>
              <div>{minAmount} $</div>
            </div>

            <div className="flex justify-between bg-transparent text-white border border-white rounded-full p-4 mb-4 w-full">
              <p>Profit rate</p>
              <div>{profitRate} %</div>
            </div>
          </div>

          <hr className="my-4 border-muted" />

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input 
              type="text" 
              placeholder="Enter limit price" 
              className="bg-transparent text-white border border-white rounded-full p-4 w-full" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Open Trade Button */}
          <div className='flex items-center justify-center'>
            <button className="bg-white text-black rounded-full px-6 py-4">Open Trade</button>
          </div>
        </div>
        
        {/* Trade Operation History */}
        <div className="p-6 sm:p-8 xl:p-10 rounded-xl bg-neutral-900">
          <h2 className="text-2xl font-bold mb-4">Your Operations</h2>
          {
            trads.length > 0
            ? (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Time Frame</th>
                    <th>Amount</th>
                    <th>Profit Rate</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {trads.map((trade, index) => (
                    <tr key={index}>
                      <td>{trade.market}</td>
                      <td>{trade.timeFrame}</td>
                      <td>{trade.amount}</td>
                      <td>{trade.profitRate}</td>
                      <td>{trade.status}</td>
                      <td>{new Date(trade.date).toLocaleString()}</td> {/* Assuming date is stored as a string */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground">It seems you don’t have any operations yet</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
