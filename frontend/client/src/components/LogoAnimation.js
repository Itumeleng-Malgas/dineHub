// components/LogoAnimation.js
import React from 'react';
import Image from 'next/image';
import styles from './LogoAnimation.module.css';

const LogoAnimation = () => {
  return (
    <div className={styles.container}>
      <Image src="/logo.jpeg" alt="Dinehub Logo" layout="fill" objectFit="contain" className={styles.logo} />
      <p className={styles.tagline}>your ultimate restaurant booking platform...</p>
    </div>
  );
};

export default LogoAnimation;
