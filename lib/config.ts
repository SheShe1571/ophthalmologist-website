/**
 * Site Configuration
 * Central configuration file for the ophthalmologist website
 */

export const siteConfig = {
  // Site Information
  name: 'عيادة د. [اسم الطبيب] لطب العيون',
  shortName: 'عيادة العيون',
  description: 'عيادة متخصصة في طب وجراحة العيون - نقدم أفضل خدمات العناية بالعيون مع أحدث التقنيات والأجهزة الطبية',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  
  // Contact Information
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+966500000000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000',
  email: 'info@example.com',
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
    snapchat: 'https://snapchat.com/',
    tiktok: 'https://tiktok.com/',
  },
  
  // Location
  location: {
    address: 'العنوان، المدينة، المملكة العربية السعودية',
    city: 'المدينة',
    country: 'المملكة العربية السعودية',
    postalCode: '12345',
    coordinates: {
      lat: 24.7136,
      lng: 46.6753,
    },
    googleMapsUrl: 'https://maps.google.com/?q=24.7136,46.6753',
  },
  
  // Working Hours
  workingHours: {
    saturday: { open: '09:00', close: '21:00' },
    sunday: { open: '09:00', close: '21:00' },
    monday: { open: '09:00', close: '21:00' },
    tuesday: { open: '09:00', close: '21:00' },
    wednesday: { open: '09:00', close: '21:00' },
    thursday: { open: '09:00', close: '21:00' },
    friday: { open: 'مغلق', close: 'مغلق' },
  },
  
  // Default WhatsApp Message
  defaultWhatsAppMessage: 'السلام عليكم، أرغب في حجز موعد في العيادة.',
  
  // SEO Keywords (to be customized based on specialty)
  keywords: [
    'طبيب عيون',
    'عيادة عيون',
    'جراحة العيون',
    'تصحيح النظر',
    'الليزك',
    'علاج المياه البيضاء',
    'علاج المياه الزرقاء',
    'طب العيون',
    'فحص النظر',
    'نظارات طبية',
  ],
  
  // Theme Colors
  colors: {
    primary: '#2563eb',
    secondary: '#14b8a6',
    accent: '#eab308',
  },
};

// Navigation Links
export const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '#about' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'فيديوهات', href: '#videos' },
  { label: 'آراء المرضى', href: '#reviews' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
  { label: 'موقعنا', href: '#location' },
  { label: 'تواصل معنا', href: '#contact' },
];

// Default Services (will be overridden by CMS)
export const defaultServices = [
  {
    id: 'lasik',
    title: 'عمليات الليزك',
    description: 'تصحيح النظر بأحدث تقنيات الليزر لحياة بدون نظارات',
    icon: 'eye',
    slug: 'lasik',
  },
  {
    id: 'cataract',
    title: 'عمليات المياه البيضاء',
    description: 'إزالة المياه البيضاء وزراعة عدسات متطورة',
    icon: 'lens',
    slug: 'cataract',
  },
  {
    id: 'glaucoma',
    title: 'علاج المياه الزرقاء',
    description: 'تشخيص وعلاج ضغط العين المرتفع',
    icon: 'activity',
    slug: 'glaucoma',
  },
  {
    id: 'retina',
    title: 'أمراض الشبكية',
    description: 'علاج أمراض الشبكية وانفصال الشبكية',
    icon: 'scan',
    slug: 'retina',
  },
  {
    id: 'pediatric',
    title: 'طب عيون الأطفال',
    description: 'فحص وعلاج مشاكل العيون عند الأطفال',
    icon: 'baby',
    slug: 'pediatric',
  },
  {
    id: 'cosmetic',
    title: 'تجميل العيون',
    description: 'عمليات تجميل الجفون وإزالة الانتفاخات',
    icon: 'sparkles',
    slug: 'cosmetic',
  },
];

// FAQ Items (will be overridden by CMS)
export const defaultFAQs = [
  {
    question: 'ما هي ساعات العمل؟',
    answer: 'نستقبل المرضى من السبت إلى الخميس من الساعة 9 صباحاً حتى 9 مساءً. يوم الجمعة إجازة.',
  },
  {
    question: 'هل يمكنني حجز موعد عبر الإنترنت؟',
    answer: 'نعم، يمكنك الحجز عبر الواتساب أو تعبئة نموذج الحجز على الموقع وسيتم التواصل معك.',
  },
  {
    question: 'كم تستغرق عملية الليزك؟',
    answer: 'تستغرق العملية حوالي 15-20 دقيقة لكلتا العينين، ويمكنك العودة للمنزل في نفس اليوم.',
  },
  {
    question: 'هل عمليات العيون مؤلمة؟',
    answer: 'جميع عملياتنا تتم تحت تخدير موضعي ولا تشعر بأي ألم أثناء العملية.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع النقدي، البطاقات البنكية، والتأمين الطبي للشركات المعتمدة.',
  },
];

export default siteConfig;
