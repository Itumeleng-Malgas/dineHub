"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Button, Form, Input, Select, Row, Col, Upload, UploadFile, message } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { restaurantProfileValidationRules } from "./_utils/validationRules";
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

interface InitialValues {
  restaurantName: string;
  email: string;
  address: string;
  phone: string;
  cuisine: string;
  description: string;
}

const RestaurantProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialValues>({
    restaurantName: '',
    email: '',
    address: '',
    phone: '',
    cuisine: '',
    description: '',
  });
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const [restaurantImage, setRestaurantImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const router = useRouter();

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get('/api/getProfile');
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      ...values,
      restaurantImage,
      gallery,
    };
    console.log('Payload:', payload); // Log the data to be posted
    try {
      const response = await axios.post('/api/saveProfile', payload);
      console.log('Profile updated successfully:', response.data);
      message.success('Profile updated successfully')
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Error updating profile')
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUploadChange = async (info: UploadChangeParam<UploadFile<RcFile>>, type: 'restaurantImage' | 'gallery') => {
    if (info.file.status === 'done' && info.file.originFileObj) {
      const formData = new FormData();
      formData.append('file', info.file.originFileObj);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const uploadedFileUrl = response.data.url;

        if (type === 'restaurantImage') {
          setRestaurantImage(uploadedFileUrl);
        } else {
          setGallery((prevGallery) => [...prevGallery, uploadedFileUrl]);
        }
        setFileList(info.fileList);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Content>
      {initialValues && (
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="restaurantName"
                label="Restaurant Name"
                rules={restaurantProfileValidationRules.restaurantName}
              >
                <Input placeholder="Restaurant Name" type="text" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={restaurantProfileValidationRules.email}
              >
                <Input placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={restaurantProfileValidationRules.address}
              >
                <Input placeholder="Address" type="text" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={restaurantProfileValidationRules.phone}
              >
                <Input placeholder="Phone Number" type="text" />
              </Form.Item>
              <Form.Item
                name="cuisine"
                label="Cuisine Type"
                rules={restaurantProfileValidationRules.cuisine}
              >
                <Select placeholder="Select cuisine type">
                  <Option value="italian">Italian</Option>
                  <Option value="chinese">Chinese</Option>
                  <Option value="indian">Indian</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={restaurantProfileValidationRules.description}
              >
                <TextArea placeholder="Description" rows={4} />
              </Form.Item>
              <Form.Item
                name="image"
                label="Restaurant Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
              >
                <Upload
                  name="image"
                  listType="picture"
                  maxCount={1}
                  onChange={(info) => handleUploadChange(info, 'restaurantImage')}
                >
                  <Button icon={<UploadOutlined />}>Upload Restaurant Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="gallery"
                label="Gallery"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
              >
                <Upload
                  name="gallery"
                  listType="picture-card"
                  multiple
                  onChange={(info) => handleUploadChange(info, 'gallery')}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Update Profile</Button>
          </Form.Item>
        </Form>
      )}
    </Content>
  );
};

export default RestaurantProfilePage;