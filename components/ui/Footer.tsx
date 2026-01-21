'use client';

import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick } from '@/lib/tracking/events';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: siteConfig.social.facebook, label: 'فيسبوك' },
    { icon: Instagram, href: siteConfig.social.instagram, label: 'انستغرام' },
    { icon: Twitter, href: siteConfig.social.twitter, label: 'تويتر' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'يوتيوب' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="font-cairo font-bold text-xl">{siteConfig.shortName}</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all hover:bg-primary-600 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={() => trackCallClick('footer')}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span dir="ltr">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('footer')}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span>واتساب</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>{siteConfig.location.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-4">ساعات العمل</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>السبت - الخميس</span>
                <span>9:00 ص - 9:00 م</span>
              </li>
              <li className="flex justify-between">
                <span>الجمعة</span>
                <span className="text-red-400">مغلق</span>
              </li>
            </ul>
            
            {/* CTA */}
            <div className="mt-6">
              <a
                href={getWhatsAppUrl(siteConfig.whatsapp, siteConfig.defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer-cta')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium transition-all hover:bg-green-600 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                احجز موعدك الآن
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-right">
              © {currentYear} {siteConfig.name}. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white transition-colors"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
