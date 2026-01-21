'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, ChevronUp } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick } from '@/lib/tracking/events';

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-gray-700 hover:-translate-y-1"
            aria-label="العودة للأعلى"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Options */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Call Button */}
            <motion.a
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
              href={`tel:${siteConfig.phone}`}
              onClick={() => trackCallClick('floating-cta')}
              className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-primary-700 hover:scale-110"
              aria-label="اتصل بنا"
            >
              <Phone className="w-6 h-6" />
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('floating-cta')}
              className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-green-600 hover:scale-110"
              aria-label="تواصل عبر واتساب"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-green-500 hover:bg-green-600'
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'إغلاق' : 'تواصل معنا'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-green-500 animate-ping opacity-20" />
      )}
    </div>
  );
}
