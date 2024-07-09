"use client"
import { Button, Empty, Form, Input, List, message } from 'antd'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import axios from 'axios'
import { BACKEND_URL } from '@/utils/configs'
import { useSession } from 'next-auth/react'

const initialData: string[] = [];

const AddMenu = () => {
  const [data, setData] = useState<string[]>(initialData);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const onFinish = async (values: { menu: string }) => {
    const restaurant_id = session?.user.id;

    setLoading(true);
    try {
      console.log("Values", {...values, restaurant_id})
      const response = await axios.post(`${BACKEND_URL}/menus`, {...values, restaurant_id});
    
      if (response.status === 201) {
        setData([...data, values.menu, restaurant_id as string]);
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
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            ) : (
                <Empty />
            )}
        </div>
    </div>
  )
}

export default AddMenu;