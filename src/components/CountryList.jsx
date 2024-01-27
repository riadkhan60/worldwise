import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import useCitiesValue from '../context/CitiesValue';

function CountryList() {
  const { isLoading, cities } = useCitiesValue();
  if (isLoading) return <Spinner />;

  if (cities.length < 1)
    return (
      <Message
        message={'Add your first country by clicking on a city on map'}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  console.log(countries)

  return (
    <ul className={styles.countryList}>
       {countries.map(country => <CountryItem country={country} key={country.country} ></CountryItem>)}
    </ul>
  );
}
export default CountryList;
