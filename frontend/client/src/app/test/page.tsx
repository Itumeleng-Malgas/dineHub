'use client';

import * as React from 'react';
import { CheckOutlined, HeartOutlined, HomeOutlined, MenuOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { AiOutlineAim } from 'react-icons/ai';


interface NavMenuProps {}

const NavMenu: React.FC<NavMenuProps> = () => {
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined size={15} className="mr-2" />,
      label: 'Home',
    },
    {
      key: '/restaurants',
      icon: <AiOutlineAim size={15} className="mr-2" />,
      label: 'Restaurants',
    },
    {
      key: '/booking/1',
      icon: <CheckOutlined size={15} className="mr-2" />,
      label: 'Bookings',
    },
    {
      key: '/favorites',
      icon: <HeartOutlined size={15} className="mr-2" />,
      label: 'Favorites',
    },
    {
      key: '/about',
      icon: <UserOutlined size={15} className="mr-2" />,
      label: 'About Us',
    },
    {
      key: '/register-restaurants',
      icon: <PlusCircleOutlined size={15} className="mr-2" />,
      label: 'Register Restaurants',
    },
  ];


  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <Dropdown menu={{items, onClick}} >
      <Button type="default" size="large">
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
};


export default NavMenu;
