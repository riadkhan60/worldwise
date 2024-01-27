import { createContext, memo, useCallback, useEffect, useReducer } from 'react';
const BASE_URL = 'http://localhost:9000';
const CitiesContext = createContext();

const initiateState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'cities/added':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case 'cities/delete':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'error':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Invalid type of action');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initiateState,
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error('Fetching cities failed');
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (e) {
        dispatch({
          type: 'error',
          payload: 'There was an error loading Cities',
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) throw new Error('Fetching city failed');
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (e) {
        dispatch({
          type: 'error',
          payload: 'There was an error loading City',
        });
      }
    },
    [currentCity.id],
  );

  async function addCity(city) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(city),
      });
      if (!res.ok) throw new Error('Adding cities failed');
      const data = await res.json();
      dispatch({ type: 'cities/added', payload: data });
    } catch (e) {
      dispatch({
        type: 'error',
        payload: 'There was an error adding City',
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/delete', payload: id });
    } catch (e) {
      dispatch({
        type: 'error',
        payload: 'There was an error deleting City',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ isLoading, cities, getCity, currentCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
