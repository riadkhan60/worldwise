import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import useCitiesValue from '../context/CitiesValue';

function CityList() {
  const { isLoading, cities } = useCitiesValue()
  if (isLoading) return <Spinner />;

  if(cities.length < 1 ) return <Message message={'Add your first city by clicking on a city on map'}/> 
  return (
    <ul className={styles.cityList}>
      {cities.map(function (city) {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
