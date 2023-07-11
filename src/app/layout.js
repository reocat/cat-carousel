import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Random cat images',
  description: 'created just 4 fun',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
        <body className={inter.className}>{children}</body>
      
    </html>
  )
}
