import { useEffect } from 'react';
import useAuthoValue from './AuthoValue';
import { useNavigate } from 'react-router-dom';

function Protetedroutes({ children }) {
  const { isAutho } = useAuthoValue();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAutho) {
      navigateTo('/');
    }
  }, [isAutho, navigateTo]);

  return isAutho ? children :  null ;
}

export default Protetedroutes;
