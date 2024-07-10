"use client";
import { useToggle } from '@/context/toggleContext';
import { Modal, Button, Form, UploadFile } from 'antd';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AddProductForm from './AddProductForm';
import { Product } from '@/app/(admin)/admin/products/page';

interface AddFormModalProps {
  editMode?: boolean;
  initialValues?: Product | null;
}

const AddFormModal: React.FC<AddFormModalProps> = ({ editMode = false, initialValues = null }) => {
  const { isTrue, toggleState } = useToggle();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: session } = useSession();
  const [form] = Form.useForm();

  useEffect(() => {
    if (editMode && initialValues) {
      form.setFieldsValue(initialValues);
      // Populate fileList with the existing picture if necessary
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editMode, initialValues, form]);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    toggleState();
  };

  return (
    <Modal
      title={editMode ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
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
          {editMode ? "Save Changes" : "Save"}
        </Button>,
      ]}
    >
      <AddProductForm form={form} fileList={fileList} setFileList={setFileList} />
    </Modal>
  );
};

export default AddFormModal;