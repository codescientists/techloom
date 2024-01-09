// "use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AlignLeftIcon, AlignRightIcon, HeartIcon, LogInIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Cart from './Cart'
import NavLinks from './NavLinks'


const Navbar = () => {
  
  return (
    <nav className="container mx-auto px-4 py-2 flex items-center justify-between border-b md:flex-row md:items-center">
      <div className="flex items-center">
        {/* SIDEBAR FOR MOBILE DEVICES  */}
        <Sheet>
          <SheetTrigger>
            <div className="md:hidden rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
                <AlignLeftIcon/>
            </div>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>TechLoom</SheetTitle>
            </SheetHeader>
            <NavLinks/>
          </SheetContent>
          </SheetTrigger>
        </Sheet>
        <h5 className="text-lg font-bold md:ml-4">TechLoom</h5>
      </div>

      <div className="hidden md:block">
      <NavLinks/>
      </div>

      <div className="flex items-center space-x-2">
        <button className="px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white hidden md:block">
          <HeartIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <Sheet>
          <SheetTrigger>
            <div className="px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
              <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SignedOut>
              Your cart is empty! Please Login to view your cart
            </SignedOut>
            <SignedIn>
              <Cart />
            </SignedIn>
          </SheetContent>
        </Sheet>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant="default">
            <Link href={`/sign-in`} className="flex items-center">
              Login <LogInIcon className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </SignedOut>
      </div>

    </nav>

  )
}

export default Navbar