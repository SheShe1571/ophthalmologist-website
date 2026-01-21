'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Stethoscope, Users } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem, CounterAnimation } from '@/components/animations/ScrollAnimation';

const credentials = [
  {
    icon: GraduationCap,
    title: 'المؤهلات العلمية',
    description: 'زمالة طب وجراحة العيون - جامعة الملك سعود',
  },
  {
    icon: Award,
    title: 'الشهادات',
    description: 'البورد السعودي والعربي في طب العيون',
  },
  {
    icon: Stethoscope,
    title: 'التخصص الدقيق',
    description: 'جراحة الليزك وتصحيح الإبصار',
  },
  {
    icon: Users,
    title: 'العضويات',
    description: 'عضو الجمعية السعودية لطب العيون',
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'سنة خبرة' },
  { value: 5000, suffix: '+', label: 'عملية ناجحة' },
  { value: 10000, suffix: '+', label: 'مريض سعيد' },
  { value: 98, suffix: '%', label: 'نسبة النجاح' },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="section-container relative">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">من نحن</h2>
          <p className="section-subtitle">
            نقدم أعلى مستويات الرعاية الطبية لعينيك مع فريق متخصص وتقنيات متطورة
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <ScrollAnimation variant="slideRight" className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/doctor.jpg"
                  alt="د. [اسم الطبيب] - طبيب عيون"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -left-4 md:-left-8 bottom-8 bg-white rounded-xl shadow-xl p-4 md:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">+15</p>
                    <p className="text-gray-500 text-sm">سنة من الخبرة</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500 rounded-2xl -z-10 opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500 rounded-full -z-10 opacity-10" />
            </div>
          </ScrollAnimation>

          {/* Content Side */}
          <div className="space-y-8">
            <ScrollAnimation variant="slideLeft">
              <h3 className="text-2xl md:text-3xl font-cairo font-bold text-gray-900 mb-4">
                د. [اسم الطبيب]
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                استشاري طب وجراحة العيون، متخصص في عمليات الليزك وتصحيح الإبصار بخبرة تمتد لأكثر من 15 عاماً في مجال طب العيون.
              </p>
              <p className="text-gray-600 leading-relaxed">
                نسعى دائماً لتقديم أفضل رعاية طبية لمرضانا باستخدام أحدث التقنيات والأجهزة الطبية المتطورة، مع الحرص على راحة المريض وسلامته في المقام الأول.
              </p>
            </ScrollAnimation>

            {/* Credentials */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((credential) => (
                <StaggerItem key={credential.title}>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                      <credential.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {credential.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {credential.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Stats Section */}
        <ScrollAnimation className="mt-16 md:mt-24">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-cairo font-bold text-white mb-2">
                    <CounterAnimation to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-primary-100 text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
