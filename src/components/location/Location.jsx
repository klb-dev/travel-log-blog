import styles from './Location.module.css';
import locations from '../../data/locations';
import { useState } from 'react';

function LocationsGrid() {
  const [expandedId, setExpandedId] = useState(null);

  const handleCardClick = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className={styles.grid}>
      {locations.map((loc) => (
        <div 
          key={loc.id} 
          className={styles.card}
          onClick={() => handleCardClick(loc.id)}
        >
          <img src={loc.image} alt={loc.name} />
          <h3>{loc.name}</h3>

          {expandedId === loc.id && (
            <div className={styles.details}>
              <p>{loc.description}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default LocationsGrid;
