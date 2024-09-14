import './css/App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { CheckoutProvider } from './Context/CheckoutContext';


function App() {
  return (
      <CheckoutProvider>
        <RouterProvider router={router} />
      </CheckoutProvider>
  );
}

export default App;
