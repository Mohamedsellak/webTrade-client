import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function DepositDetails({ isOpenModel, onClose, refresh, depositInfo }) {
  const [error, setError] = useState('');

  if (!isOpenModel) return null;
  console.log(depositInfo)

  const handleSubmit = async (status) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deposit/${depositInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ status,userId:depositInfo.userId }),
      });

      if (response.ok) {
        refresh();
        onClose();
      } else {
        setError('Failed to update deposit status.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor: "#212325" }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-white">Deposit Details</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <div className="p-4 space-y-4">
          <div className="mb-4">
            <h4 className="text-white">Transaction Details</h4>
            <p className="text-gray-400"><strong>Username:</strong> {depositInfo.username}</p>
            <p className="text-gray-400"><strong>Email:</strong> {depositInfo.email}</p>
            <p className="text-gray-400"><strong>Total Balance:</strong> {depositInfo.totalBalance}</p>
            <p className="text-gray-400"><strong>Deposit Amount:</strong> {depositInfo.amount}</p>
            <p className="text-gray-400"><strong>Status:</strong> {depositInfo.status}</p>
            {depositInfo.prove && (
              <div className="mt-4">
                <h4 className="text-white">Proof Image:</h4>
                <img 
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/${depositInfo.prove.replace('/home/sellak/Desktop/nextwebtrade/server/public/', '')}`} 
                  alt="Proof" 
                  className="w-full max-w-xs rounded-md" 
                />
                </div>
            )}
          </div>

          {
            depositInfo.status === "pending" &&
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="p-4 bg-green-500 text-white rounded-full w-1/2 mr-2 hover:bg-green-400 flex justify-center items-center"
                onClick={() => handleSubmit('approved')}
              >
                Approve
              </button>
              <button
                type="button"
                className="p-4 bg-red-500 text-white rounded-full w-1/2 ml-2 hover:bg-red-400 flex justify-center items-center"
                onClick={() => handleSubmit('rejected')}
              >
                Reject
              </button>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
