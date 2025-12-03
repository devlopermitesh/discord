import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import ImageKitProvider from '@/components/providers/ImagekitProvider'
const OpenSans = Open_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Theme Chat',
  description: 'Chat with fun & randomous',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ImageKitProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={cn(`${OpenSans.className}  antialiased`, 'bg-white dark:bg-[#313338]')}>
            <ThemeProvider
              attribute={'class'}
              storageKey="discord-theme"
              enableSystem={true}
              defaultTheme="dark"
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ImageKitProvider>
    </ClerkProvider>
  )
}
