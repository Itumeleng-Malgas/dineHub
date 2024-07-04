"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Button, Form, Input, Select, Row, Col, Upload, UploadFile } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { restaurantProfileValidationRules } from "./_utils/validationRules";
import { useUploadThing } from 'uploadthing/react';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const RestaurantProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    restaurantName: 'Test Restaurant',
    email: 'test@example.com',
    address: '123 Main St',
    phone: '+27636994946',
    cuisine: 'italian',
    description: 'A great place to eat!',
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [restaurantImage, setRestaurantImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const router = useRouter();

  const { upload } = useUploadThing();

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    // Fetch restaurant data
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get('/api/restaurant-profile');
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
      gallery
    };
    console.log('Payload:', payload); // Log the data to be posted
    try {
      const response = await axios.post('/restaurant', payload);
      console.log('Profile updated successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUploadChange = async ({ file, fileList, event }, type: 'restaurantImage' | 'gallery') => {
    if (file.status === 'done') {
      const uploadedFile = await upload(file.originFileObj);
      if (type === 'restaurantImage') {
        setRestaurantImage(uploadedFile.url);
      } else {
        setGallery((prevGallery) => [...prevGallery, uploadedFile.url]);
      }
      setFileList(fileList);
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