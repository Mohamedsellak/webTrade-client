import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function EditWallet({ wallet, isOpenModel, onClose, refresh }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Set initial state when the wallet prop changes
  useEffect(() => {
    if (wallet) {
      setName(wallet.name);
      setAddress(wallet.address);
    }
  }, [wallet]);

  if (!isOpenModel) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallets/${wallet._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ name, address }),
      });

      if (response.ok) {
        refresh();
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || 'Wallet update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor: '#212325' }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-white">Edit Wallet</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter wallet name"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter wallet address"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400 flex justify-center items-center"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
