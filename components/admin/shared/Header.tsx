"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

const Header = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <header className="w-full flex items-center justify-between border-b py-2 mb-5">
        <div className="flex items-center font-bold">
          Hello, {user?.fullName}
        </div>
        <div>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </header>
  )
}

export default Header