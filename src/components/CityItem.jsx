/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import useCitiesValue from '../context/CitiesValue';
const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));


function CityItem({ city: { emoji, cityName, date, id, position } }) {
  const { currentCity, deleteCity } = useCitiesValue();
  function handleDelete(e) { 
    e.preventDefault();
    deleteCity(id);
  }
  const isActive = currentCity.id === id;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          isActive ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
export default CityItem;
