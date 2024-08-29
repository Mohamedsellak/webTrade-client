import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Deposit({ isOpenModel, onClose,refresh }) {
  if (!isOpenModel) return null;

  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!walletAddress || !amount) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/withdraw`, {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token') || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          amount,
        }),
      });

      if (response.ok) {
        refresh()
        setSuccess("Withdraw successful");
        setError(false);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError('Withdraw failed');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor: "#212325" }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-blue-500">
            Withdraw Funds
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className='font-bold text-center mt-8'>
            Total Balance : {JSON.parse(localStorage.getItem("authData")).totalBalance}$
        </div>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">Withdraw successful</p>}

        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Wallet Address
              </label>
              <input
                type="text"
                id="address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter wallet address"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400 flex justify-center items-center"
            >
              Confirm Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
