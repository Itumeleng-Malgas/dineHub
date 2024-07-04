'use client';

import * as React from 'react';
import { BookOpenCheck, HandPlatter, Heart, PlusCircle, User } from 'lucide-react';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { Dropdown } from 'antd';
import { useRouter } from 'next/navigation';

export const NavMenu: React.FC = () => {
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    router.push(path);
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '/',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/'),
            icon: <HomeOutlined size={15} className="mr-2" />,
            label: 'Home',
          },
          {
            key: '/restaurants',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/restaurants'),
            icon: <HandPlatter size={15} className="mr-2" />,
            label: 'Restaurants',
          },
          {
            key: '/restaurants/bookings',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/restaurants/bookings'),
            icon: <BookOpenCheck size={15} className="mr-2" />,
            label: 'Bookings',
          },
          {
            key: '/favorites',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/favorites'),
            icon: <Heart size={15} className="mr-2" />,
            label: 'Favorites',
          },
          {
            key: '/about',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/about'),
            icon: <User size={15} className="mr-2" />,
            label: 'About Us',
          },
          {
            key: '/register-restaurants',
            className: 'cursor-pointer flex gap-2 items-center',
            onClick: () => handleMenuClick('/register-restaurants'),
            icon: <PlusCircle size={15} className="mr-2" />,
            label: 'Register Restaurants',
          },
        ],
      }}
      trigger={['click']}
    >
      <Button variant="ghost" size="icon">
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
};

export default NavMenu;
