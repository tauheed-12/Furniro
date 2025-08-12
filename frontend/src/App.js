import './css/App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { CheckoutProvider } from './Context/CheckoutContext';
import { useEffect } from 'react';
import { setUserFromCookies } from './slices/authSlice';
import { useDispatch } from 'react-redux';
import { PaymentProvider } from './Context/PaymentContext';
import { useState } from 'react';


function App() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    dispatch(setUserFromCookies());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
