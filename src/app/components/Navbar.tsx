'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconUser } from '@tabler/icons-react'

export default function Component() {
  const pathname = usePathname()

  return (
    <nav className="absolute top-0 left-0 right-0 bg-transparent text-white p-4 font-semibold z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold">
            Smart <span className="text-blue-500">Ambulance</span>
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className={`${pathname === '/signin' ? 'font-bold' : ''}`}
            >
              <IconUser
                size={30}
                className="text-blue-500 hover:text-blue-400 transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}