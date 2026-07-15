import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScrollWrapper from './components/layout/SmoothScrollWrapper';
import SkeletonLoader from './components/ui/SkeletonLoader';

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

function App() {
  return (
    <HelmetProvider>
      <Router>
        <SmoothScrollWrapper>
          <div className="flex flex-col min-h-screen bg-dark-bg text-white/90">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<SkeletonLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productId" element={<ProductDetails />} />
                  <Route path="/configurator" element={<Configurator />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/quality" element={<Quality />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />

                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
      </Router>
    </HelmetProvider>
  );
}

export default App;
