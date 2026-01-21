'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  MessageCircle, 
  Phone, 
  Clock, 
  ChevronDown,
  Star,
  Shield,
  Award
} from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/animations/ScrollAnimation';
import { siteConfig } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick, trackServiceView, trackCTAClick } from '@/lib/tracking/events';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  price?: string;
  duration?: string;
}

interface ServiceLandingPageProps {
  service: ServiceData;
  slug: string;
}

export function ServiceLandingPage({ service, slug }: ServiceLandingPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  // Track service view on mount
  useEffect(() => {
    trackServiceView(service.title);
  }, [service.title]);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(service.title);
    trackCTAClick('whatsapp', `service-${slug}`);
  };

  const handleCallClick = () => {
    trackCallClick(`service-${slug}`);
    trackCTAClick('call', `service-${slug}`);
  };

  const whatsappMessage = `السلام عليكم، أرغب في الاستفسار عن ${service.title}`;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                {service.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.description}
              </p>
              
              {/* Quick Info */}
              {service.duration && (
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span>مدة العملية: {service.duration}</span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={getWhatsAppUrl(siteConfig.whatsapp, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="btn-whatsapp text-lg px-8 py-4"
                >
                  <MessageCircle className="w-6 h-6" />
                  احجز موعدك الآن
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={handleCallClick}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <Phone className="w-6 h-6" />
                  اتصل للاستفسار
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent z-10" />
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Trust Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">+98%</p>
                  <p className="text-sm text-gray-500">نسبة النجاح</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="section-title">مميزات {service.title}</h2>
            <p className="section-subtitle">لماذا تختار عيادتنا لإجراء {service.title}؟</p>
          </ScrollAnimation>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="section-title">خطوات العلاج</h2>
            <p className="section-subtitle">رحلتك نحو رؤية أفضل</p>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="relative">
              {/* Connecting Line */}
              <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-primary-200 hidden md:block" />
              
              {service.process.map((step, index) => (
                <StaggerItem key={index}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 relative">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="font-cairo font-bold text-xl text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-primary-600">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <Award className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">+15</p>
              <p className="text-primary-100">سنة خبرة</p>
            </div>
            <div>
              <Star className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">4.9</p>
              <p className="text-primary-100">تقييم المرضى</p>
            </div>
            <div>
              <Shield className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">+98%</p>
              <p className="text-primary-100">نسبة النجاح</p>
            </div>
            <div>
              <CheckCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">+5000</p>
              <p className="text-primary-100">عملية ناجحة</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="section-title">أسئلة شائعة عن {service.title}</h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto">
            {service.faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between py-5 text-right"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pb-5 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="section-container text-center text-white">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-cairo font-bold mb-4">
              جاهز لتحسين رؤيتك؟
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              احجز موعدك الآن للحصول على استشارة مجانية مع أطبائنا المتخصصين
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl(siteConfig.whatsapp, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                احجز عبر واتساب
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={handleCallClick}
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-400 transition-colors flex items-center justify-center gap-2 border-2 border-primary-400"
              >
                <Phone className="w-6 h-6" />
                اتصل الآن
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
