"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from './Sidebar'
import { AlignJustify } from 'lucide-react'


const Header = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <header className="w-full flex items-center justify-between border-b py-2 mb-5">
        <Sheet>
        <div className="flex items-center font-bold">
          <SheetTrigger className="lg:hidden">
            <div className="border rounded p-2 mr-2">
              <AlignJustify className='h-4 w-4'/>
            </div>
          </SheetTrigger>
          Hello, {user?.fullName}
        </div>
        <div>
            <UserButton afterSignOutUrl='/'/>
        </div>


        {/* SIDEBAR FOR MOBILE DEVICES */}
          <SheetContent side="left" className="p-0 text-white">
            <Sidebar/> 
          </SheetContent>
        </Sheet>

    </header>
  )
}

export default Header