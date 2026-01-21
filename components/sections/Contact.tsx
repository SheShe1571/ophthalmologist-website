'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';
import { siteConfig, defaultServices } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';
import { trackWhatsAppClick, trackCallClick, trackFormSubmit } from '@/lib/tracking/events';

interface FormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedService, setSelectedService] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        trackFormSubmit('contact_form', data.service);
        reset();
        setSelectedService('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = selectedService
      ? `${siteConfig.defaultWhatsAppMessage}\n\nالخدمة المطلوبة: ${selectedService}`
      : siteConfig.defaultWhatsAppMessage;
    trackWhatsAppClick(selectedService || 'contact-form');
    window.open(getWhatsAppUrl(siteConfig.whatsapp, message), '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="section-container relative">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">تواصل معنا</h2>
          <p className="section-subtitle">
            احجز موعدك الآن أو تواصل معنا لأي استفسار
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <ScrollAnimation variant="slideRight">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-cairo font-bold text-gray-900 mb-6">
                نموذج حجز موعد
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'الاسم مطلوب' })}
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الجوال <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    dir="ltr"
                    {...register('phone', {
                      required: 'رقم الجوال مطلوب',
                      pattern: {
                        value: /^(05\d{8}|9665\d{8}|\+9665\d{8})$/,
                        message: 'يرجى إدخال رقم جوال صحيح',
                      },
                    })}
                    className={`input-field text-left ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="05XXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    الخدمة المطلوبة
                  </label>
                  <select
                    id="service"
                    {...register('service')}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="input-field"
                  >
                    <option value="">اختر الخدمة</option>
                    {defaultServices.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="فحص عام">فحص عام</option>
                    <option value="استشارة">استشارة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    رسالتك أو ملاحظات
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="أي تفاصيل إضافية تود مشاركتها..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      إرسال الطلب
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>تم إرسال طلبك بنجاح! سنتواصل معك قريباً.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل عبر الواتساب.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </ScrollAnimation>

          {/* Quick Contact Options */}
          <ScrollAnimation variant="slideLeft" className="space-y-6">
            {/* WhatsApp Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-xl">واتساب</h3>
                  <p className="text-green-100 text-sm">الطريقة الأسرع للتواصل</p>
                </div>
              </div>
              <p className="text-green-50 mb-6">
                تواصل معنا مباشرة عبر الواتساب للحجز السريع أو الاستفسار عن أي خدمة
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                ابدأ المحادثة
              </button>
            </motion.div>

            {/* Call Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 md:p-8 text-white shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-xl">اتصل بنا</h3>
                  <p className="text-primary-100 text-sm">نحن هنا لمساعدتك</p>
                </div>
              </div>
              <p className="text-primary-50 mb-6">
                اتصل بنا مباشرة للحجز أو الاستفسار. فريقنا جاهز للرد على جميع أسئلتك
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={() => trackCallClick('contact-section')}
                className="w-full py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
            </motion.div>

            {/* Info Note */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-sm">
                ⏰ نرد على جميع الاستفسارات خلال ساعات العمل
                <br />
                <span className="font-medium">السبت - الخميس: 9 صباحاً - 9 مساءً</span>
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
