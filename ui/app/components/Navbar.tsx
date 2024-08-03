'use client';
import React from 'react'
import { NavButtons } from '../constants/constants'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation';
const links = [
    {
      href: "/projects",
      displayName: NavButtons.PROJECTS
    },
    {
      href: "/career",
      displayName: NavButtons.CAREER
    },
    {
      href: "/education",
      displayName: NavButtons.EDUCATION
    },
    {
      href: "/about",
      displayName: NavButtons.ABOUT
    },
  ]
  
const Navbar = () => {
    const currentPath = usePathname();
  return (
    <div className="flex h-20">
            {links.map((link) => <Link
                                    key={link.displayName}
                                    href={link.href}
                                    className={clsx("mr-20 text-2xl hover:text-green-600", currentPath === link.href && "text-green-600")}>
                                      {link.displayName}
                                  </Link>)}
          </div>
  )
}

export default Navbar