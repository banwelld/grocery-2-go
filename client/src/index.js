import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import routes from './config/routes';
import './css/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
