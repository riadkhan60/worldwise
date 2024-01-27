import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

function useAuthoValue() {
  const values = useContext(AuthContext);
  if (!values) throw new Error('can not use outside of autho context');
  return values;
}

export default useAuthoValue;
