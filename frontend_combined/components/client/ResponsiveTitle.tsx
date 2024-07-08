import { Typography } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

interface ResponsiveTitleProps {
  title: string;
}

const ResponsiveTitle: React.FC<ResponsiveTitleProps> = ({ title }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 601px) and (max-width: 1024px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1025px)' });

  // Determine the title level based on screen size
  const titleLevel = isSmallScreen ? 3 : isMediumScreen ? 2 : 1;

  return (
    <Title level={titleLevel} className="text-center mx-auto max-w-[90%]">
      {title}
    </Title>
  );
};

export default ResponsiveTitle;