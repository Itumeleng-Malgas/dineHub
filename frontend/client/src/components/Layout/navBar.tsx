'use client'
import React from 'react'
import { UserButton, useAuth } from '@clerk/nextjs'
import Container from '@/components/Container'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Searchinput from '@/components/Searchinput'
import { ModeToggle } from '@/components/theme-toggle'
import { NavMenu } from './navMenu'

export const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className='sticky top-0 border border-b primary/10 bg-secondary z-20'>
      <Container>
        <div className='flex gap-3 justify-between items-center'>
          <div className='flex items-center gap-1 cursor-pointer' onClick={() => router.push('/')}>
            <Image src='/logo.png' alt='logo' width={50} height={50} />
            <div className='font-extra-bold text-xl'>DineHub</div>
          </div>
          <Searchinput />
          <div className='flex gap-3 items-center'>
            <div>
              <ModeToggle />
              <NavMenu />
            </div>
            <UserButton afterSignOutUrl='/' />
            {!userId && <>
              <Button onClick={() => router.push('/sign-in')} variant='outline' size='sm'>Sign in</Button>
              <Button onClick={() => router.push('/sign-up')} size='sm'>Sign up</Button>
            </>}
          </div>
        </div>
      </Container>
    </div>
  )
}
export default NavBar;
