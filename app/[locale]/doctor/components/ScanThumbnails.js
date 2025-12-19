import React from 'react';
import Image from 'next/image';
import styles from './ScanThumbnails.module.css';

export default function ScanThumbnails({ images, selected, onSelect }) {
  return (
    <div className={styles.thumbnails}>
      {images.map((img, idx) => (
        <Image
          key={idx}
          src={img}
          alt={`صورة ${idx + 1}`}
          width={96}
          height={72}
          className={img === selected ? styles.selected : ''}
          onClick={() => onSelect(img)}
        />
      ))}
    </div>
  );
}
