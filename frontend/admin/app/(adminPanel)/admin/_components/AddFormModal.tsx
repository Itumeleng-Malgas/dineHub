"use client";
import { useToggle } from '@/context/ToggleContext';
import { Modal, Button, Form, UploadFile } from 'antd';
import AddProductForm from './AddProductForm';
import { useState } from 'react';

const AddFormModal = () => {
  const { isTrue, toggleState } = useToggle();


  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    toggleState();
  };

  return (
    <Modal
      title="ADD NEW PRODUCT"
      open={isTrue}
      onCancel={handleCancel}
      width={'800px'}
      footer={[
        <Button onClick={handleCancel} key="back">
          Cancel
        </Button>,
        <Button
          type="primary"
          key="submit"
          onClick={() => form.submit()}
        >
          Save
        </Button>,
      ]}
    >
      <AddProductForm form={form} fileList={fileList} setFileList={setFileList} />
    </Modal>
  );
};

export default AddFormModal;
