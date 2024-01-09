"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLinks = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? 'border-b-2' : '';
  };

  return (
    <>
        <ul className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 mt-5 md:m-0">
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
    </>
  )
}

export default NavLinks