"use client"
import { Button, Empty, Form, Input, List, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import axios from 'axios'
import { BACKEND_URL } from '@/utils/configs'
import { useSession } from 'next-auth/react'
import { fetchMenuItems } from './_utilities'

interface MenuItem {
  id: string;
  name: string;
}

const AddMenu = () => {
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const restaurant_id = session?.user?.id;

      if (!restaurant_id) {
        message.error('Restaurant ID not found.');
        return;
      }

      const menuItems = await fetchMenuItems(restaurant_id);
      setData(menuItems);
    };

    fetchData();
  }, [session]);

  const onFinish = async (values: { name: string }) => {
    const restaurant_id = session?.user?.id;

    if (!restaurant_id) {
      message.error('Restaurant ID not found.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/menus`, { ...values, restaurant_id });
      if (response.status === 201) {
        setData([...data, { id: response.data.id, name: values.name }]);
        message.success('Menu added successfully!');
      } else {
        message.error('Failed to add menu.');
      }
    } catch (error) {
      message.error('Failed to add menu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/menus/${id}`);
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
        message.success('Menu deleted successfully!');
      } else {
        message.error('Failed to delete menu.');
      }
    } catch (error) {
      message.error('Failed to delete menu.');
    }
  };

  return (
    <div>
      <Form className='flex gap-1 mt-5' onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the menu item!' }]}
        >
          <Input placeholder="Menu" type="text" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<IoAddOutline />} loading={loading}>Add Menu</Button>
        </Form.Item>
      </Form>
      <div>
        {data.length > 0 ? (
          <List
            className='w-1/2'
            size="small"
            header={<div>Menu Options</div>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <Button  key={item.id} type="link" onClick={() => handleDelete(item.id)}>x</Button>
                ]}
              >
                {item.name}
              </List.Item>
            )}
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

export default AddMenu;
