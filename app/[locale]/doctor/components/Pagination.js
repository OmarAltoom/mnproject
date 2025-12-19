import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        السابق
      </button>
      <span>
        صفحة {currentPage} من {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        التالي
      </button>
    </div>
  );
}
