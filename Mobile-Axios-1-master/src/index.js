import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals'

// redux
import { Provider } from 'react-redux/es/exports';
import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'layouts/authentication/sign-in/userSlice';

import { MaterialUIControllerProvider } from "context";

const store = configureStore({
  reducer: {
    user: userSlice,
  }
})

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
