import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import Button from './Button';

import useCitiesValue from '../context/CitiesValue';
import { useGeolocation } from '../hooks/GeoLoaction';
import { useUrlParams } from '../hooks/useUrlParams';

function Map() {
  const [position, setPosition] = useState([40, -3]);
  const [lat, lng] = useUrlParams();
  const { cities } = useCitiesValue();
  const [flyMap, setflyMap] = useState(false);

  const {
    isLoading: loactionLoading,
    position: userPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (userPosition) {
      setPosition([userPosition.lat, userPosition.lng]);
      setflyMap(true);
    }
  }, [userPosition]);

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
      setflyMap(true);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <Button btnType="position" action={getPosition}>
        {loactionLoading ? 'Loading...' : 'Use Your Loaction'}
      </Button>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.cityName}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.cityName} {city.emoji}
              </Popup>
            </Marker>
          );
        })}
        {flyMap && <ChangeCenter position={position} />}
        <OpenFrom />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.flyTo(position, 6);
  return null;
}

function OpenFrom() {
  const navigateTo = useNavigate();
  useMapEvents({
    click: (e) => {
      navigateTo(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
