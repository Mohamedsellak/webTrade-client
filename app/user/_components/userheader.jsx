import Link from 'next/link'
import React from 'react'

export default function userheader({title}) {

    // const user = localStorage.getItem("user")
    const user = JSON.parse(localStorage.getItem("authData"))
  return (
    <div className='flex items-center justify-between mt-4 lg:mb-20'>
        <h1 className='text-4xl font-bold text-blue-500'>{title}</h1>
        <div className=' flex items-center justify-around rounded-full px-6 py-2' style={{ backgroundColor:"#151617" }}>
            <span className='textt-lg font-bold me-10'>{user.username}</span>
            <span className='textt-lg font-bold me-10'>ID : {user._id}</span>
            <Link href={"/user/profile"}>
                <img src="/assets/images/avatar.jpg" className='h-14 w-14 rounded-full' alt="profile" />
            </Link>

        </div>
    </div>
  )
}
