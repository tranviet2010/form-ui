import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/home';
import Child from './components/child/child';
import { ConfigProvider } from 'antd';
import ResultChild from './components/child/result';
import Adult from './components/adult/adult';
import ResultAdult from './components/adult/resultAdult';
import Mature from './components/mature/mature';
import ResultMature from './components/mature/resultMature';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/child",
    element: <Child />,
  },
  {
    path: "/child/result",
    element: <ResultChild />,
  },
  {
    path: "/adult",
    element: <Adult />,
  },
  {
    path: "/adult/result",
    element: <ResultAdult />,
  },
  {
    path: "/mature",
    element: <Mature />,
  },
  {
    path: "/mature/result",
    element: <ResultMature />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
