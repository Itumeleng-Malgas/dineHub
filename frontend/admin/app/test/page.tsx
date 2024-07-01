"use client";
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AppTest: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('picture', file as FileType);
    });
    setUploading(true);

    try {
      // Mock the server-side processing
      const response = await addProduct(formData);
      console.log(response);

      setFileList([]);
      message.success('Upload successfully.');
    } catch (error) {
      message.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

// Mock server-side function
const addProduct = async (formData: FormData) => {
  const formDataEntries = Array.from(formData.entries());

  const productData: any = {};
  let fileBuffer = null;
  let fileName = '';

  for (const [key, value] of formDataEntries) {
    if (key === 'picture' && value instanceof File) {
      fileBuffer = Buffer.from(await value.arrayBuffer());
      fileName = value.name;
    } else {
      productData[key] = value;
    }
  }

  if (!fileBuffer) {
    throw new Error('No file uploaded');
  }

  // Simulate saving the file to disk (replace this with actual disk storage logic)
  console.log('Simulated file save:', {
    fileName,
    fileBuffer,
    productData,
  });

  return { message: 'Product added successfully' };
};

export default AppTest;