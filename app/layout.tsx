import React from 'react'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { Poppins } from 'next/font/google'

import { Header } from '@/components/Header'
import { auth } from '@/auth'

import 'react-toastify/dist/ReactToastify.css'
import './globals.sass'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Next Auth',
}

interface IProps {
  children: React.ReactNode
}
const RootLayout: React.FC<IProps> = async ({ children }) => {
  const session = await auth()

  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider session={session}>
          <Header auth={Boolean(session?.user.id)} />
          {children}
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
