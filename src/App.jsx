import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScrollWrapper from './components/layout/SmoothScrollWrapper';
import PageTransition from './components/layout/PageTransition';

// Eagerly loaded pages for instant navigation
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Industries from './pages/Industries';
import Quality from './pages/Quality';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Configurator from './pages/Configurator';

import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

import ScrollCylinder from './components/ui/ScrollCylinder';

function AppContent() {
  const location = useLocation();

  return (
    <SmoothScrollWrapper>
      <div className="flex flex-col min-h-screen bg-dark-bg text-white/90">
        <Header />
        <ScrollCylinder />
        <main className="flex-grow overflow-x-clip">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
              <Route path="/products/:productId" element={<PageTransition><ProductDetails /></PageTransition>} />
              <Route path="/configurator" element={<PageTransition><Configurator /></PageTransition>} />
              <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
              <Route path="/quality" element={<PageTransition><Quality /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />

              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
              <Route path="/terms-conditions" element={<PageTransition><TermsConditions /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={1200}
          hideProgressBar={true}
          closeButton={false}
        />
      </div>
    </SmoothScrollWrapper>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
