// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';

import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useUrlParams } from '../hooks/useUrlParams';
import Spinner from './Spinner';
import Message from './Message';

import { convertToEmoji } from '../context/converToEmoji';
import useCitiesValue from '../context/CitiesValue';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [cityDataLoding, setCityDataLoding] = useState(false);
  const [errorCity, setErrorCity] = useState(null);

  const navigateTo = useNavigate();
  const [lat, lng] = useUrlParams();

  const { addCity, isLoading } = useCitiesValue();
  useEffect(() => {
    async function getCityData() {
      try {
        setErrorCity(null);
        setCityDataLoding(true);
        const res = await fetch(`${BASE_URL}?Latitude=${lat}&Longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) throw new Error('Please Click on a Country');
        console.log(data);
        setCountry(data.countryName);
        setCityName(data.city || data.locality || data.principalSubdivision);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorCity(err.message);
      } finally {
        setCityDataLoding(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  async function handleAddCity(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await addCity(newCity);
    navigateTo('/app');
  }

  if (cityDataLoding) return <Spinner />;

  if (errorCity) return <Message message={errorCity} />;

  if (!lat && !lng) return <Message message="Please click on the map" />;

  return (
    <form className={`${styles.form}  ${isLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          id="date"
          dateFormat="do MMM yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button btnType={'primary'} action={handleAddCity}>
          Submit
        </Button>
        <Button
          btnType={'back'}
          action={(e) => {
            e.preventDefault();
            navigateTo('/app');
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
