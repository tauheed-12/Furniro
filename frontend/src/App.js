import './css/App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { AuthProvider } from './Context/AuthContext';
import { CheckoutProvider } from './Context/CheckoutContext';


function App() {
  return (
    <AuthProvider>
      <CheckoutProvider>
        <RouterProvider router={router} />
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
