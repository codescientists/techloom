import Navbar from "@/components/root/shared/Navbar"
import { Separator } from "@/components/ui/separator"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <Navbar />
          <Separator/>
          {children}
        </body>
      </html>
  )
}
