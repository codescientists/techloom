import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className="flex items-center justify-center h-screen">{children}</body>
      </html>
  )
}
