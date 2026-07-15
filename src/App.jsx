import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScrollWrapper from './components/layout/SmoothScrollWrapper';
import SkeletonLoader from './components/ui/SkeletonLoader';
import PageTransition from './components/layout/PageTransition';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Industries = lazy(() => import('./pages/Industries'));
const Quality = lazy(() => import('./pages/Quality'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Configurator = lazy(() => import('./pages/Configurator'));

const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  const location = useLocation();

  return (
    <SmoothScrollWrapper>
      <div className="flex flex-col min-h-screen bg-dark-bg text-white/90">
        <Header />
        <main className="flex-grow overflow-hidden">
          <Suspense fallback={<SkeletonLoader />}>
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
          </Suspense>
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
