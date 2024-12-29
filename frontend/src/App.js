import './css/App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { CheckoutProvider } from './Context/CheckoutContext';
import { PaymentProvider } from './Context/PaymentContext';


function App() {
  return (
    <CheckoutProvider>
      <PaymentProvider>
        <RouterProvider router={router} />
      </PaymentProvider>
    </CheckoutProvider>
  );
}

export default App;
