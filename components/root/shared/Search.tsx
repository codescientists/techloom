"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  return (
    <div className="flex items-center h-[35px] border overflow-hidden rounded-full bg-gray-50 px-4 py-2">
      <SearchIcon/>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e:any) => setQuery(e.target.value)}
        className="border-0 bg-gray-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}

export default Search