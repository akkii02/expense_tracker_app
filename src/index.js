import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuhContextProvider } from './components/store/AuthContext';
import { EditExpenseProvider } from './components/store/EditExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuhContextProvider>
    <EditExpenseProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </EditExpenseProvider>
  </AuhContextProvider>
);
