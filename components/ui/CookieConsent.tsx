'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    // Enable all tracking
    enableTracking();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    // Disable non-essential tracking
    disableTracking();
  };

  const enableTracking = () => {
    // Enable GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const disableTracking = () => {
    // Disable GA4 tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden sm:flex w-12 h-12 bg-primary-100 rounded-full items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary-600" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-cairo font-bold text-lg text-gray-900 mb-2">
                    نستخدم ملفات تعريف الارتباط
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتك على موقعنا وتقديم محتوى مخصص لك.
                    يمكنك قراءة المزيد في{' '}
                    <Link href="/privacy" className="text-primary-600 hover:underline">
                      سياسة الخصوصية
                    </Link>
                    .
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={handleAccept}
                      className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium transition-all hover:bg-primary-700 hover:shadow-lg"
                    >
                      موافق
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all hover:bg-gray-200"
                    >
                      رفض الكوكيز غير الضرورية
                    </button>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleDecline}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
