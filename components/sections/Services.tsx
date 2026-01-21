'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Scan, 
  Activity, 
  Baby, 
  Sparkles, 
  ArrowLeft,
  Glasses,
  Syringe
} from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/animations/ScrollAnimation';
import { trackCTAClick } from '@/lib/tracking/events';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  lens: Glasses,
  activity: Activity,
  scan: Scan,
  baby: Baby,
  sparkles: Sparkles,
  syringe: Syringe,
};

// Services data
const services = [
  {
    id: 'lasik',
    title: 'عمليات الليزك',
    description: 'تصحيح النظر بأحدث تقنيات الليزر للتخلص من النظارات والعدسات اللاصقة نهائياً',
    icon: 'eye',
    slug: 'lasik',
    color: 'primary',
    features: ['فيمتو ليزك', 'الليزك السطحي', 'تصحيح قصر النظر', 'تصحيح طول النظر'],
  },
  {
    id: 'cataract',
    title: 'عمليات المياه البيضاء',
    description: 'إزالة المياه البيضاء بتقنية الفاكو وزراعة عدسات متعددة البؤر',
    icon: 'lens',
    slug: 'cataract',
    color: 'secondary',
    features: ['تقنية الفاكو', 'عدسات متعددة البؤر', 'عدسات توريك', 'بدون غرز'],
  },
  {
    id: 'glaucoma',
    title: 'علاج المياه الزرقاء',
    description: 'تشخيص وعلاج ارتفاع ضغط العين والمياه الزرقاء بأحدث الطرق',
    icon: 'activity',
    slug: 'glaucoma',
    color: 'primary',
    features: ['فحص ضغط العين', 'الليزر العلاجي', 'الأدوية الحديثة', 'العمليات الجراحية'],
  },
  {
    id: 'retina',
    title: 'أمراض الشبكية',
    description: 'علاج أمراض الشبكية السكرية وانفصال الشبكية والتنكس البقعي',
    icon: 'scan',
    slug: 'retina',
    color: 'secondary',
    features: ['ليزر الشبكية', 'حقن العين', 'علاج السكري', 'انفصال الشبكية'],
  },
  {
    id: 'pediatric',
    title: 'طب عيون الأطفال',
    description: 'فحص وعلاج مشاكل العيون عند الأطفال والكشف المبكر عن العيوب البصرية',
    icon: 'baby',
    slug: 'pediatric',
    color: 'primary',
    features: ['فحص كسل العين', 'علاج الحول', 'انسداد القناة الدمعية', 'فحص النظر'],
  },
  {
    id: 'cosmetic',
    title: 'تجميل العيون',
    description: 'عمليات تجميل الجفون وإزالة الانتفاخات والتجاعيد حول العينين',
    icon: 'sparkles',
    slug: 'cosmetic',
    color: 'secondary',
    features: ['شد الجفون', 'إزالة الأكياس', 'البوتوكس', 'الفيلر'],
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Eye;
  const isEven = index % 2 === 0;

  const handleClick = () => {
    trackCTAClick('service-details', `services-${service.id}`);
  };

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -8 }}
        className="group h-full"
      >
        <div className={`card h-full flex flex-col ${
          isEven ? 'bg-white' : 'bg-gray-50'
        } hover:bg-white border border-gray-100 hover:border-primary-200`}>
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 ${
            service.color === 'primary' 
              ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
              : 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white'
          }`}>
            <Icon className="w-7 h-7" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-cairo font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4 flex-1">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  service.color === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'
                }`} />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/services/${service.slug}`}
            onClick={handleClick}
            className={`inline-flex items-center gap-2 font-medium transition-all ${
              service.color === 'primary' 
                ? 'text-primary-600 hover:text-primary-700'
                : 'text-secondary-600 hover:text-secondary-700'
            }`}
          >
            المزيد من التفاصيل
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30" />

      <div className="section-container relative">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">خدماتنا الطبية</h2>
          <p className="section-subtitle">
            نقدم مجموعة شاملة من خدمات طب وجراحة العيون باستخدام أحدث التقنيات والأجهزة
          </p>
        </ScrollAnimation>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollAnimation className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            لا تجد الخدمة التي تبحث عنها؟ تواصل معنا وسنساعدك
          </p>
          <Link
            href="#contact"
            className="btn-primary"
            onClick={() => trackCTAClick('contact-us', 'services-bottom')}
          >
            تواصل معنا
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
}
