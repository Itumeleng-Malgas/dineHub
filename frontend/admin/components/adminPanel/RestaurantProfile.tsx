"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Button, Form, Input, Select, Row, Col, Upload, } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { restaurantProfileValidationRules } from "./_utils/validationRules";

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
  const [fileList, setFileList] = useState([]);
  const router = useRouter();

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
    try {
      await axios.put('/api/restaurant-profile', values);
      console.log('Profile updated successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

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
                  onChange={handleUploadChange}
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
                  onChange={handleUploadChange}
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