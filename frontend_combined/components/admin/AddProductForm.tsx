import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Upload, Button, message, Select, FormInstance } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useToggle } from '@/context/toggleContext';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { restaurantProfileValidationRules } from '@/utils/validationRules';
import { BACKEND_URL } from '@/utils/configs';
import { useSession } from 'next-auth/react';
import { fetchMenuItems } from './_utilities';

const { Option } = Select;

interface AddProductFormProps {
  form: FormInstance;
  fileList: UploadFile<RcFile>[];
  setFileList: Dispatch<SetStateAction<UploadFile<RcFile>[]>>;
  email: string | undefined | null;
}

interface MenuItem {
  id: string;
  name: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ form, fileList, setFileList, email }) => {
  const { toggleState } = useToggle();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      const restaurant_id = session?.user?.id;

      if (!restaurant_id) {
        message.error('Restaurant ID not found.');
        return;
      }

      const menuItems = await fetchMenuItems(restaurant_id);
      setMenuItems(menuItems);
    };

    fetchData();
  }, [session]);

  const uploadImage = async (file: RcFile): Promise<string> => {
    const formData = new FormData();
    formData.append('picture', file);

    try {
      const uploadResponse = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return uploadResponse.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const onFinish = async (values: any) => {
    try {
      let imageUrl = '';
      if (fileList.length > 0) {
        imageUrl = await uploadImage(fileList[0].originFileObj as RcFile);
      }

      // Prepare product data with imageUrl
      const productData = {
        ...values,
        picture: imageUrl,
        userEmail: email,
      };

      // Send productData to saveProduct API endpoint
      const saveResponse = await axios.post('/api/saveProduct', productData);

      if (saveResponse.status === 200) {
        message.success('Product added successfully');
        form.resetFields();
        setFileList([]);
        toggleState();
      } else {
        message.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product');
    }
  };

  const beforeUploadHandler = (file: RcFile): boolean => {
    setFileList([file as UploadFile<RcFile>]);
    return false; // Prevent default upload behavior
  };

  const props = {
    onRemove: (file: UploadFile<RcFile>) => {
      const index = fileList.indexOf(file);
      const newFileList = [...fileList];
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: beforeUploadHandler,
    fileList,
    multiple: false,
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter product name' }]}
      >
        <Input placeholder="Product Name" />
      </Form.Item>
      <Form.Item name="desc" label="Description">
        <Input.TextArea placeholder="Input product description" />
      </Form.Item>
      <div className='flex gap-1'>
        <div className='flex-1'>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter product price' }]}
          >
            <Input style={{ maxWidth: '300px' }} placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="cuisine"
            label="Cuisine Type"
            rules={restaurantProfileValidationRules.cuisine}
          >
            <Select style={{ maxWidth: '300px' }} placeholder="Select cuisine type">
              <Option value="italian">Italian</Option>
              <Option value="chinese">Chinese</Option>
              <Option value="indian">Indian</Option>
            </Select>
          </Form.Item>
        </div>
        <div className='flex-1'>
          <Form.Item
            name="menu"
            label="Menu"
            rules={[{ required: true, message: 'Please select an appropriate menu' }]}
          >
            <Select placeholder="Select a menu">
              {menuItems.map((menuItem) => (
                <Option key={menuItem.id} value={menuItem.id}>{menuItem.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="picture"
            label="Product Picture"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
          >
            <Upload {...props} >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddProductForm;
