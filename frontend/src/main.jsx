import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './Login';
import CreateUser from './CreateUser';
import HomePage from './HomePage';
import Entries from './Entries'

const router = createBrowserRouter([
  {
    path: '/entry',
    element: <Entries />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <CreateUser />
  },
  {
    path: '/',
    element: <HomePage />
  },


])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router } />
  </React.StrictMode>,
)
