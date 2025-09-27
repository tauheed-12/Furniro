import { createBrowserRouter } from 'react-router-dom';

import RootPage from './pages/RootPage';
import Home from './pages/Home';
import Shop from './pages/Shop';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import ProtectedRoutes from './pages/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import SuccessPage from './pages/SuccessPage';
import OrdersPage from './pages/OrdersPage';
import VerifyMail from './pages/VerifyMail.jsx';
import PaymentForm from './pages/PaymentForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPassword.jsx';

const stripePromise = loadStripe('pk_test_51PytxG2MwbGLW2CMjN9jQukdRo5569zPL5LxzfHYBR9L4Ywy0ws27isxM3fe45JGS5yQTBrdAJ7f6HVg6Pfp7qxc000XDNJyo7');

const router = createBrowserRouter([{
    path: '/',
    element: <RootPage />,
    children: [
        { path: '/', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: '/product/:productId', element: <SingleProduct /> },
        { path: '/contact', element: <Contact /> },
        {
            element: <ProtectedRoutes />,
            children: [
                { path: '/cart', element: <Cart /> },
                { path: '/checkout', element: <Checkout /> },
                { path: '/success', element: <SuccessPage /> },
                { path: '/:userId/orders', element: <OrdersPage /> },
                { path: '/add', element: <AddProduct /> },
            ]
        },
        {
            path: '/signIn', element: <Login />
        },
        {
            path: '/signup', element: <Register />
        },
        {
            path: '/forgot-password', element: <ForgotPasswordPage />
        },
        {
            path: '/forgotpassword/:token', element: <ResetPasswordPage />
        },
        {
            path: '/verifyemail/:token', element: <VerifyMail />
        },
        {
            path: '/stripe/checkout',
            element: (
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            )
        }
    ]
}]);

export default router;
