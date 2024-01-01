"use client"

import { Separator } from '@/components/ui/separator';
import { SignOutButton } from '@clerk/nextjs';
import { HomeIcon, ListOrderedIcon, LogOutIcon, Package2Icon, Settings2Icon, ShoppingCartIcon, StoreIcon, Users2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? 'bg-gray-800' : 'bg-gray-900';
  };

  return (
    <div className="bg-gray-900 h-full w-full px-8 pt-8">
      <h1 className="text-2xl font-bold mb-4 text-white flex items-center"><StoreIcon className="mr-2" />TechLoom Admin</h1>
      <Separator className='my-4' />
      <ul className="space-y-2">
        <li>
          <Link href="/admin/dashboard">
            <div className={`flex items-center ${isActive('/admin/dashboard')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <HomeIcon className="mr-2" /> Dashboard
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            <div className={`flex items-center ${isActive('/admin/products')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <Package2Icon className="mr-2" /> Products
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/categories">
            <div className={`flex items-center ${isActive('/admin/categories')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <ListOrderedIcon className="mr-2" /> Categories
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/orders">
            <div className={`flex items-center ${isActive('/admin/orders')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <ShoppingCartIcon className="mr-2" /> Orders
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/admins">
            <div className={`flex items-center ${isActive('/admin/admins')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <Users2Icon className="mr-2" /> Admins
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            <div className={`flex items-center ${isActive('/admin/settings')} cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <Settings2Icon className="mr-2" /> Settings
            </div>
          </Link>
        </li>
        <li>
          <SignOutButton>
            <div className={`flex items-center cursor-pointer hover:bg-gray-800 my-2 px-4 py-2 rounded-md text-white transition`}>
              <LogOutIcon className="mr-2" /> 
                <button>Log out</button>
            </div>
          </SignOutButton>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;