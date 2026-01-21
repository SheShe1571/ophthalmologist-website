'use client';

import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { siteConfig } from '@/lib/config';
import { trackEvent } from '@/lib/tracking/events';

export function Location() {
  const handleMapClick = () => {
    trackEvent('map_interaction', {
      event_category: 'engagement',
      event_label: 'google_maps_click',
    });
  };

  const handleDirectionsClick = () => {
    trackEvent('map_interaction', {
      event_category: 'engagement',
      event_label: 'get_directions',
    });
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">موقعنا</h2>
          <p className="section-subtitle">
            يسعدنا استقبالكم في عيادتنا
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <ScrollAnimation variant="slideRight" className="lg:col-span-2">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.!2d${siteConfig.location.coordinates.lng}!3d${siteConfig.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sar!2ssa!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع العيادة على الخريطة"
                onClick={handleMapClick}
              />
              
              {/* Overlay Button */}
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectionsClick}
                className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Navigation className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">احصل على الاتجاهات</span>
              </a>
            </div>
          </ScrollAnimation>

          {/* Info Cards */}
          <ScrollAnimation variant="slideLeft" className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">العنوان</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {siteConfig.location.address}
                  </p>
                  <a
                    href={siteConfig.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDirectionsClick}
                    className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 mt-2 text-sm font-medium"
                  >
                    عرض على الخريطة
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">ساعات العمل</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">السبت - الخميس</span>
                      <span className="font-medium text-gray-900">9:00 ص - 9:00 م</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">الجمعة</span>
                      <span className="font-medium text-red-500">مغلق</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">اتصل بنا</h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    dir="ltr"
                  >
                    {siteConfig.phone}
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    متاحون للرد على استفساراتكم
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectionsClick}
              className="btn-primary w-full justify-center"
            >
              <Navigation className="w-5 h-5" />
              احصل على الاتجاهات
            </a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
