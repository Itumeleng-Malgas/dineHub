// components/ReviewForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import { Review } from '@/components/data/restaurants';

interface ReviewFormProps {
  review?: Review;
  onSubmit: (review: Review) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(review?.rating || 0);

  const handleFinish = (values: any) => {
    const newReview = { ...review, ...values, rating } as Review;
    onSubmit(newReview);
  };

  return (
    <Form form={form} onFinish={handleFinish} initialValues={review}>
      <Form.Item name="user" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="comment" label="Comment" rules={[{ required: true, message: 'Please enter your comment' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Rating">
        <Rate onChange={setRating} value={rating} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
        <Button onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
