import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function TradeDetails({ isOpenModel, onClose, tradeInfo }) {

  if (!isOpenModel) return null;
  console.log(tradeInfo)


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-h-full bg-gray-900 bg-opacity-70">
      <div className="p-4 w-full max-w-2xl rounded-2xl shadow-lg shadow-gray-600" style={{ backgroundColor: "#212325" }}>
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-3xl font-semibold text-white">Trade Details</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
            onClick={onClose}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>


        <div className="p-4 space-y-4">
          <div className="mb-4">
            <h4 className="text-white">Trade Details</h4>
            <p className="text-gray-400"><strong>Username:</strong> {tradeInfo.username}</p>
            <p className="text-gray-400"><strong>Email:</strong> {tradeInfo.email}</p>
            <p className="text-gray-400"><strong>Total Balance:</strong> {tradeInfo.totalBalance}</p>
            <p className="text-gray-400"><strong>Trade Amount:</strong> {tradeInfo.amount}</p>
            <p className="text-gray-400"><strong>Status:</strong> {tradeInfo.status}</p>
            <p className="text-gray-400"><strong>Profit Rate:</strong> {tradeInfo.profitRate} %</p>
          </div>
        </div>
      </div>
    </div>
  );
}
