'use client'

import React from 'react'
import Link from 'next/link'

import classes from './Navbar.module.sass'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  console.log('pathname', pathname)
  return (
    <nav className={classes.container}>
      <Link href="/server" className={pathname !== '/server' ? '' : classes.selected}>
        Server
      </Link>
      <Link href="/client" className={pathname !== '/client' ? '' : classes.selected}>
        Client
      </Link>
      <Link href="/admin" className={pathname !== '/admin' ? '' : classes.selected}>
        Admin
      </Link>
      <Link href="/settings" className={pathname !== '/settings' ? '' : classes.selected}>
        Settings
      </Link>
    </nav>
  )
}

export { Navbar }
