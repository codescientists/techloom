
import Header from "@/components/admin/shared/Header"
import Sidebar from "@/components/admin/shared/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <div className="flex">
            <Sidebar/>
            <div className="flex flex-col w-4/5 px-8 py-4">
              <Header/>
              {children}
            </div>
          </div>
        </body>
      </html>
  )
}
