import React from 'react'
import Card from './Card'
import { IProduct } from '@/lib/database/models/product.model'
import { auth } from '@clerk/nextjs'
// import Pagination from './Pagination'

type CollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.map((product) => {
              return (
                <li key={product._id} className="flex justify-center">
                  <Card product={product} userId={userId}/>
                </li>
              )
            })}
          </ul>

          {/* {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )} */}
        </div>
      ): (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default Collection