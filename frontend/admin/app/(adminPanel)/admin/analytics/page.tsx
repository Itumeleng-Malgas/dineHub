import WithSuspense from '@/components/WithSuspense';
import StatisticCard from '@/components/adminPanel/StatisticCard';
import { Col, Row } from 'antd';
import React, { Suspense } from 'react'

const Analytics = () => {
    const data = {
        totalSales: {
          title: 'Total Sales',
          value: 15000,
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            values: [1200, 1900, 3000, 5000, 7000],
          },
        },
        profit: {
          title: 'Revenue',
          value: 5000,
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            values: [300, 800, 1500, 2000, 2500],
          },
        },
      };
    
      return (
        <WithSuspense>
          <Row gutter={[16, 16]}>
            {Object.values(data).map((item, index) => (
              <Col xs={24} md={12} key={index}>
                <StatisticCard
                  title={item.title}
                  value={item.value}
                  data={item.data}
                />
              </Col>
            ))}
          </Row>
        </WithSuspense>
      );
}

export default Analytics