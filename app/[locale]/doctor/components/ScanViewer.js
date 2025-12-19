import React, { useState } from 'react';
import Image from 'next/image';
import ScanThumbnails from './ScanThumbnails';
import ScanAnnotations from './ScanAnnotations';
import styles from './ScanViewer.module.css';

export default function ScanViewer({ scan, images, annotations, onClose }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 1));

  return (
    <div className={styles.overlay}>
      <div className={styles.viewer}>
        <button className={styles.closeBtn} onClick={onClose}>إغلاق</button>
        <h2>عارض الفحص: {scan.type}</h2>
        <div className={styles.controls}>
          <button onClick={handleZoomIn}>تكبير</button>
          <button onClick={handleZoomOut}>تصغير</button>
        </div>
        <div className={`${styles.imageContainer} relative`} style={{ transform: `scale(${zoom})` }}>
          <Image
            src={selectedImage}
            alt="صورة الفحص"
            fill
            sizes="90vw"
            className={styles.image}
          />
        </div>
        <ScanThumbnails images={images} selected={selectedImage} onSelect={setSelectedImage} />
        <ScanAnnotations annotations={annotations} />
      </div>
    </div>
  );
}
