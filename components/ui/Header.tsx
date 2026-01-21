'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/config';
import { cn, getWhatsAppUrl } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick } from '@/lib/tracking/events';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('header');
  };

  const handleCallClick = () => {
    trackCallClick('header');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-cairo font-bold text-lg md:text-xl transition-colors',
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                )}>
                  {siteConfig.shortName}
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                    'hover:bg-primary-50 hover:text-primary-600',
                    isScrolled ? 'text-gray-700' : 'text-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* WhatsApp Button */}
              <a
                href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 bg-green-500 text-white rounded-lg font-medium transition-all hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">واتساب</span>
              </a>

              {/* Call Button */}
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={handleCallClick}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary-600 text-white rounded-lg font-medium transition-all hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">اتصل الآن</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-cairo font-bold text-lg">القائمة</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Menu Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Menu Footer - CTA Buttons */}
                <div className="p-4 border-t space-y-3">
                  <a
                    href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handleWhatsAppClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium transition-all hover:bg-green-600"
                  >
                    <MessageCircle className="w-5 h-5" />
                    تواصل عبر واتساب
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    onClick={() => {
                      handleCallClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium transition-all hover:bg-primary-700"
                  >
                    <Phone className="w-5 h-5" />
                    اتصل الآن
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
