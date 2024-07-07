import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PasswordResetForm: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      // Assume you have an API endpoint for password reset
      const response = await axios.post('/api/reset-password', values);

      if (response.status !== 200) {
        throw new Error('Failed to reset password');
      }

      message.success('Password reset successfully');
    } catch (error) {
      //message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isSocialLogin = session?.user.provider !== 'credentials';

  return (
    <div className="max-w-md p-2">
      {isSocialLogin ? (
        <div className="text-center text-red-500">
          You are logged in with social login. Please change your password at the respective service provider.
        </div>
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-6"
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password className="rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PasswordResetForm;
