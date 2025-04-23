'use client';

import { useState } from 'react';
import styles from './filter.css'; 

const clothingTypes = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];

export default function FilterCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (type) => {
    setSelectedFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className={styles.container}>
      <button className={styles.filterButton} onClick={() => setIsOpen(!isOpen)}>
        Filter
      </button>

      <div className={`${styles.popupCard} ${isOpen ? styles.open : ''}`}>
        <div className={styles.popupHeader}>
          <h3>Filter Clothing</h3>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className={styles.filterOptions}>
          {clothingTypes.map((type) => (
            <button
              key={type}
              className={`${styles.filterTag} ${
                selectedFilters.includes(type) ? styles.active : ''
              }`}
              onClick={() => toggleFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          className={styles.applyButton}
          onClick={() => alert(`Applied: ${selectedFilters.join(', ')}`)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
