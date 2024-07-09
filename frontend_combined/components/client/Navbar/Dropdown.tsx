import { CheckOutlined, HeartOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const DropdownMenuIcon = () => {
  const { data: session } = useSession();
    const router = useRouter();

    const items: MenuProps['items'] = [
      {
        key: '/restaurants',
        icon: <HomeOutlined size={15} className="mr-2" />,
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
      <div>
        { session?.user.role == "restaurant_owner" ? <Link className='mx-2 text-blue-500' href="/admin/dashboard" >Admin Panel</Link>: ""}
        <Dropdown menu={{items, onClick}} >
          <Button type="text" size="large">
            <MenuOutlined />
          </Button>
        </Dropdown>
      </div>
    );
}

export default DropdownMenuIcon