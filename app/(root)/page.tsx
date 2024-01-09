import BestSellingProducts from "@/components/root/shared/BestSellingProducts";
import Collection from "@/components/root/shared/Collection";
import HomeHero from "@/components/root/shared/HomeHero";
import { getAllProducts } from "@/lib/actions/product.action";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";


export default async function Home({searchParams}: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const products = await getAllProducts({
    query: searchText,
    category,
    page,
    limit: 8
  })

  return (
    <main className="container">
      <HomeHero/>

      <div className="my-10 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Best Selling Products</h2>
        </div>
        <BestSellingProducts
          data={products?.data}
          userId={userId}
        />
      </div>

      <div className="my-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Explore Our Products</h2>
        </div>
        <Collection
          data={products?.data}
          emptyTitle="No Products Found"
          emptyStateSubtext="Come back later"
          limit={8}
          page={page}
          totalPages={products?.totalPages}
        />
      </div>
    </main>
  )
}
