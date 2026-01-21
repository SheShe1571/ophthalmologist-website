'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Calendar, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { getWhatsAppUrl, scrollToElement } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick, trackCTAClick } from '@/lib/tracking/events';
import { SectionFloatingEyes } from '@/components/animations/FloatingEyes';

export function Hero() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('hero');
    trackCTAClick('whatsapp', 'hero');
  };

  const handleCallClick = () => {
    trackCallClick('hero');
    trackCTAClick('call', 'hero');
  };

  const handleBookingClick = () => {
    trackCTAClick('booking', 'hero');
    scrollToElement('contact');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Floating Eyes Background */}
      <SectionFloatingEyes />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            نستقبلكم يومياً من 9 صباحاً حتى 9 مساءً
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-cairo font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="block">رؤية أوضح</span>
            <span className="block gradient-text">لحياة أفضل</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            عيادة متخصصة في طب وجراحة العيون بأحدث التقنيات والأجهزة الطبية
            <br className="hidden md:block" />
            نقدم لك أفضل رعاية لعينيك مع خبرة تمتد لأكثر من 15 عاماً
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* WhatsApp Button */}
            <a
              href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto btn-whatsapp text-lg px-8 py-4"
            >
              <MessageCircle className="w-6 h-6" />
              احجز عبر واتساب
            </a>

            {/* Call Button */}
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={handleCallClick}
              className="w-full sm:w-auto btn-primary text-lg px-8 py-4"
            >
              <Phone className="w-6 h-6" />
              اتصل الآن
            </a>

            {/* Booking Form Button */}
            <button
              onClick={handleBookingClick}
              className="w-full sm:w-auto btn-secondary text-lg px-8 py-4"
            >
              <Calendar className="w-6 h-6" />
              احجز موعد
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">+15</span>
              </div>
              <span className="text-gray-600">سنة خبرة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary-600">+5K</span>
              </div>
              <span className="text-gray-600">عملية ناجحة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-600">4.9</span>
              </div>
              <span className="text-gray-600">تقييم المرضى</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToElement('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors"
        >
          <span className="text-sm">اكتشف المزيد</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
