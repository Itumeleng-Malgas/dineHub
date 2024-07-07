'use client';
import React from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Container from '../Container';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import NavMenu from './navMenu'; // Import the NavMenu component

export const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className='sticky top-0 border-b bg-blue-300 z-20'>
      <Container>
        <div className='flex justify-between items-center py-2'>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
            <Image
              src='/logo.jpeg'
              alt='logo'
              width={70}
              height={70}
              className='rounded-full object-cover'
              priority
            />
            <h1 className='text-3xl font-bold'>Dinehub</h1>
          </div>
          <div className='py-4 flex '>
            <NavMenu />
          </div>

          <div className='flex items-center gap-4'>
            <a
              href="http://localhost:8000/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Register Your Restaurant
            </a>

            <UserButton afterSignOutUrl='/' />
            {!userId && (
              <>
                <Button onClick={() => router.push('/sign-in')} variant='outline' size='sm'>Sign in</Button>
                <Button onClick={() => router.push('/sign-up')} size='sm'>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
