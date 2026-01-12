import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { TimeframeProvider } from './context/TimeframeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { SentimentProvider } from './context/SentimentContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const CoinDetailPage = lazy(() => import('./pages/CoinDetailPage').then(module => ({ default: module.CoinDetailPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const ExchangesPage = lazy(() => import('./pages/ExchangesPage').then(module => ({ default: module.ExchangesPage })));
const EducationPage = lazy(() => import('./pages/EducationPage').then(module => ({ default: module.EducationPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(module => ({ default: module.NewsPage })));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage').then(module => ({ default: module.NewsDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsOfUsePage })));
const KVKKPage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.KVKKPage })));

import { ScrollToTop } from './components/layout/ScrollToTop';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { CookieConsent } from './components/layout/CookieConsent';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div>
  </div>
);

function App() {
  return (
    <MarketProvider>
      <CurrencyProvider>
        <TimeframeProvider>
          <SentimentProvider>
            <PortfolioProvider>
              <ThemeProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <InstallPrompt />
                  <CookieConsent />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/coin/:id" element={<CoinDetailPage />} />
                      <Route path="/portfolio" element={<PortfolioPage />} />
                      <Route path="/borsalar" element={<ExchangesPage />} />
                      <Route path="/egitim/*" element={<EducationPage />} />

                      {/* News Routes */}
                      <Route path="/haberler" element={<NewsPage />} />
                      <Route path="/haberler/kripto/:coinId" element={<NewsPage />} />
                      <Route path="/haberler/:slug" element={<NewsDetailPage />} />

                      {/* Blog Routes */}
                      <Route path="/egitim/:slug" element={<BlogPostPage />} />

                      {/* Legal Routes */}
                      <Route path="/iletisim" element={<ContactPage />} />
                      <Route path="/gizlilik-politikasi" element={<PrivacyPolicyPage />} />
                      <Route path="/kullanim-kosullari" element={<TermsOfUsePage />} />
                      <Route path="/kvkk" element={<KVKKPage />} />

                      {/* Redirects/Aliases */}
                      <Route path="/markets" element={<HomePage />} />
                      <Route path="/favorites" element={<HomePage />} />
                      <Route path="/search" element={<HomePage />} />
                      <Route path="/categories" element={<HomePage />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </ThemeProvider>
            </PortfolioProvider>
          </SentimentProvider>
        </TimeframeProvider>
      </CurrencyProvider>
    </MarketProvider>
  );
}

export default App;
