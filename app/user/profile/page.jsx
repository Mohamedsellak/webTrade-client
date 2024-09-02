"use client";
import React, { useEffect, useState } from 'react';
import UserHeader from '../_components/userheader';
import AccountInfo from "./accountInfo";
import AccountSetting from "./accountSetting";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [profilePage, setProfilePage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.log('Failed to fetch user data:', response.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div className="text-center mt-16">Loading...</div>;
  }

  return (
    <div className='text-gray-100 p-6 rounded-lg shadow-lg lg:p-20 lg:pt-4'>
      <UserHeader title={"Profile"} />

      <div className='flex items-center justify-start mb-3'>
        <button
          className={`text-base px-5 py-3 me-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition duration-300 ${profilePage === 0 ? 'bg-blue-500 text-black' : ''}`}
          onClick={() => setProfilePage(0)}
        >
          Account Info
        </button>
        <button
          className={`text-base px-5 py-3 me-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-white transition duration-300 ${profilePage === 1 ? 'bg-blue-500 text-black' : ''}`}
          onClick={() => setProfilePage(1)}
        >
          Account Settings
        </button>
      </div>

      {
        profilePage === 0 ?
          <AccountInfo userData={userData} />
          :
          <AccountSetting />
      }
    </div>
  );
}
