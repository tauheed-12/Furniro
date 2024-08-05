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
                { path: '/:userId/orders', element: <OrdersPage /> }
            ]
        },
        {
            path: '/signin', element: <Login />
        },
        {
            path: '/signup', element: <Register />
        }, {
            path: '/add', element: <AddProduct />
        }
    ]
}])

export default router;