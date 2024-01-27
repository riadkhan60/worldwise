import { createContext, useReducer } from 'react';

const AuthContext = createContext();
const innitiateSataes = {
  user: null,
  isAutho: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isAutho: true, user: action.payload };
    case 'Logout':
      return { ...state, isAutho: false, user: null };
    default:
      throw new Error('Invalid action');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ isAutho, user }, dispatch] = useReducer(reducer, innitiateSataes);

  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: 'Login', payload: FAKE_USER});
    }
  }
  function logout() {
    dispatch({ type: 'Logout' });
  }
  return (
    <AuthContext.Provider value={{ isAutho, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
