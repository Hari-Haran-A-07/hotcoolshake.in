import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { initTelemetryObserver } from './utils/telemetry.js';

// Initialize Aero-Grid™ Client-Side Performance Observer
initTelemetryObserver();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <ToastProvider>
          <LoadingProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <App />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </LoadingProvider>
        </ToastProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
