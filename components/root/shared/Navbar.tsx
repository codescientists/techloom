"use client"
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


const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? 'border-b-2' : '';
  };

  return (
    <nav className="container mx-auto px-4 py-2 flex items-center justify-between border-b md:flex-row md:items-center">
      <div className="flex items-center">
        {/* SIDEBAR FOR MOBILE DEVICES  */}
        <Sheet>
          <SheetTrigger>
            <div className="md:hidden rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
                <AlignLeftIcon/>
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>TechLoom</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col items-start space-y-4 mt-5">
              <li>
                <Link href="/">
                  <div className={`flex items-center ${isActive('/')} hover:border-b-2 border-slate-700`}>
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className={`flex items-center ${isActive('/shop')} hover:border-b-2 border-slate-700`}>
                    Shop
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className={`flex items-center ${isActive('/contact')} hover:border-b-2 border-slate-700`}>
                    Contact
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <div className={`flex items-center ${isActive('/profile')} hover:border-b-2 border-slate-700`}>
                    Profile
                  </div>
                </Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
        <h5 className="text-lg font-bold md:ml-4">TechLoom</h5>
      </div>

      <ul className="hidden md:flex items-center space-x-4">
        <li>
          <Link href="/">
            <div className={`flex items-center ${isActive('/')} hover:border-b-2 border-slate-700`}>
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <div className={`flex items-center ${isActive('/products')} hover:border-b-2 border-slate-700`}>
              Products
            </div>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <div className={`flex items-center ${isActive('/contact')} hover:border-b-2 border-slate-700`}>
              Contact
            </div>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <div className={`flex items-center ${isActive('/profile')} hover:border-b-2 border-slate-700`}>
              Profile
            </div>
          </Link>
        </li>
      </ul>

      <div className="flex items-center space-x-2">
        <button className="px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white hidden md:block">
          <HeartIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <Sheet>
          <SheetTrigger>
            <div className="px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
              <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <SheetContent>
              Your Cart is empty, please login
            </SheetContent>
          </SheetTrigger>
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