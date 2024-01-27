import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/AuthProvider';

// import AppLayout from './pages/AppLayout';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to={'cities'} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
