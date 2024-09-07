import React, { useState } from 'react';

export default function AccountSettings() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email update logic here
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    // Handle account deletion logic here
  };

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-6">Account Settings</h3>
      <div className='grid grid-col-1 2xl:grid-cols-2 gap-4'>
        {/* Email Update Form */}
        <div className='p-10 rounded-xl mb-4 bg-neutral-900' >
          <h4 className="text-lg font-semibold text-primary mb-4">Update Email</h4>
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-500">New Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your new email"
                className="bg-transparent mt-2 p-4 border-2 border-zinc-700 rounded-full w-full outline-none focus:ring focus:ring-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-500">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="bg-transparent mt-2 p-4 border-2 border-zinc-700 rounded-full w-full outline-none focus:ring focus:ring-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full "
            >
              Update Email
            </button>
          </form>
        </div>

        {/* Password Update Form */}
        <div className='p-10 rounded-xl mb-4 bg-neutral-900' >
          <h4 className="text-lg font-semibold text-primary mb-4">Update Password</h4>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="currentPassword2" className="block text-sm font-medium text-gray-500">Current Password</label>
              <input
                type="password"
                id="currentPassword2"
                name="currentPassword2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="bg-transparent mt-2 p-4 border-2 border-zinc-700 rounded-full w-full outline-none focus:ring focus:ring-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-500">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="bg-transparent mt-2 p-4 border-2 border-zinc-700 rounded-full w-full outline-none focus:ring focus:ring-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-500">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="bg-transparent mt-2 p-4 border-2 border-zinc-700 rounded-full w-full outline-none focus:ring focus:ring-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full "
            >
              Update Password
            </button>
          </form>
        </div>


        {/* Account Deletion Form */}
        <div className='p-10 rounded-xl mb-4 bg-neutral-900' >
          <h4 className="text-lg font-semibold text-primary mb-4">Delete Account</h4>
          <form onSubmit={handleDeleteAccount}>
            <div className="mb-4">
              <p className="text-sm font-medium text-red-500">Are you sure you want to delete your account? This action cannot be undone.</p>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition"
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
