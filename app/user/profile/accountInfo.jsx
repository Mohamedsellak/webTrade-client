import React from 'react';
import { FaChartLine, FaMoneyCheckAlt, FaRegCopy } from 'react-icons/fa';
import { PiHandWithdrawFill } from 'react-icons/pi';

export default function AccountInfo({ userData }) {
  return (
    <div className='rounded-lg shadow-lg p-6'>
      <h3 className="text-xl font-semibold text-primary mb-6">Account Information</h3>
      <div className="grid grid-col-1 2xl:grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-8 rounded-xl bg-neutral-900" >
          <img
            className="rounded-full w-32 h-32 object-cover border-4 border-accent"
            src="/assets/images/avatar.jpg"
            alt={`Profile Picture of ${userData.username}`}
          />
          <h2 className="text-3xl font-extrabold mt-4 text-white">{userData.username}</h2>
          <p className="text-lg text-primary-foreground my-4 flex items-center justify-center">
            <span className='p-2 border-2 rounded-full'>{userData._id.slice(0,8)}</span>
            <span className='ml-2 p-4 rounded-full hover:bg-white hover:text-white'>
              <FaRegCopy className='h-5 w-5 '/>
            </span>
          </p>
          <p className="text-zinc-600 dark:text-muted">{userData.email}</p>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold text-accent">Balance: {userData.totalBalance} $</span>
          </div>
        </div>

        <div className="p-8 rounded-xl bg-neutral-900" >
          <div className="mt-2">
            <p className="font-bold text-secondary">Account Verified</p>
            <p className="text-zinc-600 dark:text-muted-foreground">
              {userData.verified ? 'Yes' : 'No'}
            </p>
          </div>
          <h3 className="text-xl font-semibold text-primary my-4">Activity Summary</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col items-center bg-gradient-to-br bg-white text-black shadow rounded-lg p-4">
              <FaChartLine className="w-8 h-8 mb-2" />
              <h4 className="text-sm font-medium">Trades</h4>
              <p className="text-3xl font-semibold">{userData.trads.length}</p>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-br bg-white text-black shadow rounded-lg p-4">
              <PiHandWithdrawFill className="w-8 h-8 mb-2" />
              <h4 className="text-sm font-medium">Withdrawals</h4>
              <p className="text-3xl font-semibold">{userData.withdraw.length}</p>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-br bg-white text-black shadow rounded-lg p-4">
              <FaMoneyCheckAlt className="w-8 h-8 mb-2" />
              <h4 className="text-sm font-medium">Deposits</h4>
              <p className="text-3xl font-semibold">{userData.deposit.length}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-primary mt-4">Basic Information</h3>
          <p className="text-zinc-500">Account Created: {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
