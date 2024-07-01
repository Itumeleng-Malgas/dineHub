import { Form, Input, Upload, Button, message, FormInstance, UploadProps, UploadFile, GetProp, App } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { Dispatch, SetStateAction } from 'react';
import { useToggle } from '@/context/ToggleContext';
import { addProduct } from '../_actions/product';
import { revalidatePath } from 'next/cache';

interface AddProductFormProps {
  form: FormInstance;
  fileList: UploadFile<any>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AddProductForm: React.FC<AddProductFormProps> = ({ form, fileList, setFileList }) => {
  const { toggleState } = useToggle();

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
    multiple: false,
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (key !== 'picture') {
        formData.append(key, values[key]);
      }
    });
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append('picture', file as FileType);
      });
    }

    try {
      // Call the server-side function
      const result = await addProduct(formData);
      message.success(result.message);
      revalidatePath("/admin/products")
      
      form.resetFields();
      setFileList([]);
      toggleState();
    } catch (error) {
      message.error('Failed to add product');
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
      <Form.Item name="desc" label="Description">
        <Input.TextArea placeholder="Input product description" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please enter product price' }]}
      >
        <Input style={{ maxWidth: '200px' }} placeholder="Price" />
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
    </Form>
  );
};

export default AddProductForm;