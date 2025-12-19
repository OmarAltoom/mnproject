import React from 'react';
import styles from './SkeletonLoader.module.css';

export default function SkeletonLoader({ height = 24, width = '100%', count = 1 }) {
  return (
    <div>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={styles.skeleton} style={{ height, width }} />
      ))}
    </div>
  );
}
