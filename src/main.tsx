import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AndroidInstall from './pages/AndroidInstall.tsx';
import IosInstall from './pages/IosInstall.tsx';
import Launch from './pages/Launch.tsx';
import { PWAInstallProvider } from './PWAInstallContext.tsx';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PWAInstallProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/android" element={<AndroidInstall />} />
          <Route path="/ios" element={<IosInstall />} />
          <Route path="/launch" element={<Launch />} />
        </Routes>
      </BrowserRouter>
    </PWAInstallProvider>
  </StrictMode>
);
