import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Input, Upload, Button, message, Select, FormInstance, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useToggle } from '@/context/toggleContext';
import { RcFile, UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import { restaurantProfileValidationRules } from '@/utils/validationRules';
import { BACKEND_URL } from '@/utils/configs';
import { useSession } from 'next-auth/react';
import { fetchMenuItems } from './_utilities';

const { Option } = Select;

interface AddProductFormProps {
  form: FormInstance;
  fileList: UploadFile<RcFile>[];
  setFileList: Dispatch<SetStateAction<UploadFile<RcFile>[]>>;
  editMode?: boolean;
  initialValues?: any;
  onClose?: () => void;
}

interface MenuItem {
  id: string;
  name: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ form, fileList, setFileList, editMode = false, initialValues, onClose }) => {
  const { toggleState } = useToggle();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { data: session } = useSession();

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

  useEffect(() => {
    if (editMode && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [editMode, initialValues, form]);

  const handleUploadChange = async (info: UploadChangeParam<UploadFile<RcFile>>) => {
    if (info.file.status === 'done' && info.file.originFileObj) {
      const formData = new FormData();
      formData.append('file', info.file.originFileObj);

      try {
        const response = await axios.post(`http://localhost:3001/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const uploadedFileUrl = response.data.url;
        setFileList(info.fileList);
        return uploadedFileUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
      }
    }
    setFileList(info.fileList);
    return '';
  };

  const onFinish = async (values: any) => {
    try {
      let imageUrl = '';
      if (fileList.length > 0) {
        const info = {
          file: fileList[0],
          fileList
        } as UploadChangeParam<UploadFile<RcFile>>;
        imageUrl = await handleUploadChange(info);
      }

      const productData = {
        ...values,
        restaurant_id: session?.user?.id,
        picture: imageUrl,
        price: parseFloat(values.price),
      };

      const apiUrl = editMode ? `${BACKEND_URL}/products/${initialValues.id}` : `${BACKEND_URL}/products`;
      const method = editMode ? 'put' : 'post';
      const saveResponse = await axios[method](apiUrl, productData);

      if (saveResponse.status === 201 || saveResponse.status === 200) {
        message.success(editMode ? 'Product updated successfully' : 'Product added successfully');
        form.resetFields();
        setFileList([]);
        toggleState();
        if (onClose) onClose();
      } else {
        message.error(editMode ? 'Failed to update product' : 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
      message.error(editMode ? 'Failed to update product' : 'Failed to add product');
    }
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
      <Form.Item name="description" label="Description">
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
            name="menu_id"
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
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              onChange={(info) => handleUploadChange(info)}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddProductForm;