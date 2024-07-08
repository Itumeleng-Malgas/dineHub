import { CheckOutlined, HeartOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlineAim } from 'react-icons/ai';

const DropdownMenuIcon = () => {
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
        type: 'divider',
      },
      {
        label: (
          <Space className='text-red-500 font-bold'>
            <LogoutOutlined /> Sign Out
          </Space>
        ),
        key: 'signout',
      },
    ];
  
  
    const onClick: MenuProps['onClick'] = async ({ key }) => {
      if (key == "signout") {
        await signOut()
      }
      router.push(key);
    };
  
    return (
      <Dropdown menu={{items, onClick}} >
        <Button type="default" size="large">
          <MenuOutlined />
        </Button>
      </Dropdown>
    );
}

export default DropdownMenuIcon