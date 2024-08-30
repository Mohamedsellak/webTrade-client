import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function AddUser({ isOpenModel, onClose, refresh }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false); // Assuming a checkbox for verified
  const [status, setStatus] = useState("win"); // Default status
  const [totalBalance, setTotalBalance] = useState(0);
  const [error, setError] = useState("");

  if (!isOpenModel) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ username, email, password, verified, status, totalBalance }),
      });

      if (response.ok) {
        refresh();
        onClose();
      } else {
        setError('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor: "#212325" }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-white">
            Add User
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

        {error && <p className="text-red-500">{error}</p>}

        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={verified}
                onChange={() => setVerified(!verified)}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label htmlFor="verified" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Verified
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-transparent mt-2 p-3 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
              >
                <option value="win">Win</option>
                <option value="loss">Loss</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="totalBalance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Balance
              </label>
              <input
                type="number"
                id="totalBalance"
                value={totalBalance}
                onChange={(e) => setTotalBalance(parseFloat(e.target.value))}
                placeholder="Enter total balance"
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
