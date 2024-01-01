
import Header from "@/components/admin/shared/Header"
import Sidebar from "@/components/admin/shared/Sidebar"
import { getUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await currentUser();

  const userInfo = await getUser(user?.id);
  
  if (!userInfo[0].admin) redirect("/");

  return (
      <html lang="en">
        <body>
          <div className="flex">
            <div className="h-screen fixed hidden lg:block">
              <Sidebar/>
            </div>
            <div className="flex flex-col justify-center w-full lg:ml-auto lg:w-4/5 px-8 py-4">
              <Header/>
              {children}
            </div>
          </div>
        </body>
      </html>
  )
}
