import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { ServiceLandingPage } from '@/components/sections/ServiceLandingPage';
import { siteConfig } from '@/lib/config';

// Services data - will be replaced by CMS
const servicesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  price?: string;
  duration?: string;
}> = {
  lasik: {
    title: 'عمليات الليزك',
    subtitle: 'تصحيح النظر بأحدث تقنيات الليزر',
    description: 'عملية الليزك هي إجراء جراحي آمن وفعال لتصحيح عيوب الإبصار مثل قصر النظر وطول النظر والاستجماتيزم، مما يمكنك من الاستغناء عن النظارات والعدسات اللاصقة.',
    heroImage: '/images/lasik-hero.jpg',
    benefits: [
      'نتائج فورية - تحسن الرؤية خلال 24 ساعة',
      'عملية سريعة - 15 دقيقة فقط لكلتا العينين',
      'بدون ألم - تخدير موضعي بقطرات',
      'استعادة سريعة - العودة للحياة الطبيعية خلال يومين',
      'نسبة نجاح عالية تتجاوز 98%',
      'تقنيات متعددة تناسب جميع الحالات',
    ],
    process: [
      { title: 'الفحص الشامل', description: 'فحص دقيق للعين لتحديد مدى ملاءمتك للعملية' },
      { title: 'التحضير للعملية', description: 'إرشادات ما قبل العملية والتوقف عن العدسات' },
      { title: 'إجراء العملية', description: 'عملية سريعة وآمنة باستخدام أحدث أجهزة الليزر' },
      { title: 'المتابعة', description: 'فحوصات متابعة للتأكد من نجاح العملية' },
    ],
    faqs: [
      { question: 'هل عملية الليزك آمنة؟', answer: 'نعم، الليزك من أكثر العمليات أماناً ونسبة نجاحها تتجاوز 98%' },
      { question: 'ما هو العمر المناسب للعملية؟', answer: 'يجب أن يكون عمرك 18 سنة على الأقل مع استقرار النظر لمدة سنة' },
      { question: 'كم تستمر نتائج العملية؟', answer: 'نتائج الليزك دائمة في معظم الحالات' },
    ],
    duration: '15-20 دقيقة',
  },
  cataract: {
    title: 'عمليات المياه البيضاء',
    subtitle: 'استعد وضوح رؤيتك',
    description: 'المياه البيضاء (الكتاراكت) هي عتامة تصيب عدسة العين مع التقدم في العمر. نقدم أحدث تقنيات إزالة المياه البيضاء وزراعة العدسات داخل العين.',
    heroImage: '/images/cataract-hero.jpg',
    benefits: [
      'تقنية الفاكو الحديثة - فتحة صغيرة جداً',
      'بدون غرز - شفاء سريع',
      'عدسات متعددة البؤر - رؤية واضحة لجميع المسافات',
      'عدسات توريك - تصحيح الاستجماتيزم',
      'عملية آمنة بنسبة نجاح تتجاوز 99%',
    ],
    process: [
      { title: 'التشخيص', description: 'فحص شامل للعين وقياس العدسة المناسبة' },
      { title: 'اختيار العدسة', description: 'اختيار نوع العدسة المناسب لاحتياجاتك' },
      { title: 'العملية', description: 'إزالة العدسة المعتمة وزراعة العدسة الجديدة' },
      { title: 'التعافي', description: 'متابعة دورية لضمان أفضل النتائج' },
    ],
    faqs: [
      { question: 'متى أحتاج لعملية المياه البيضاء؟', answer: 'عندما تؤثر المياه البيضاء على جودة حياتك وقدرتك على الرؤية' },
      { question: 'هل العملية مؤلمة؟', answer: 'لا، تتم تحت تخدير موضعي ولا تشعر بأي ألم' },
    ],
    duration: '20-30 دقيقة',
  },
  glaucoma: {
    title: 'علاج المياه الزرقاء',
    subtitle: 'حماية بصرك من الجلوكوما',
    description: 'المياه الزرقاء (الجلوكوما) هي ارتفاع في ضغط العين يؤدي إلى تلف العصب البصري. التشخيص المبكر والعلاج ضروريان للحفاظ على البصر.',
    heroImage: '/images/glaucoma-hero.jpg',
    benefits: [
      'تشخيص مبكر بأحدث الأجهزة',
      'علاج دوائي متقدم',
      'ليزر علاجي',
      'جراحات متخصصة عند الحاجة',
      'متابعة دورية مستمرة',
    ],
    process: [
      { title: 'الفحص', description: 'قياس ضغط العين وفحص العصب البصري' },
      { title: 'التشخيص', description: 'تحديد نوع ودرجة الجلوكوما' },
      { title: 'خطة العلاج', description: 'وضع خطة علاجية مخصصة' },
      { title: 'المتابعة', description: 'فحوصات دورية لمراقبة تقدم الحالة' },
    ],
    faqs: [
      { question: 'هل يمكن الشفاء من المياه الزرقاء؟', answer: 'لا يمكن استعادة البصر المفقود، لكن العلاج يمنع المزيد من التلف' },
      { question: 'من هم الأكثر عرضة للإصابة؟', answer: 'من تجاوزوا 40 عاماً، ومن لديهم تاريخ عائلي' },
    ],
  },
  retina: {
    title: 'أمراض الشبكية',
    subtitle: 'علاج متقدم لأمراض الشبكية',
    description: 'نقدم أحدث طرق تشخيص وعلاج أمراض الشبكية بما في ذلك اعتلال الشبكية السكري، انفصال الشبكية، والتنكس البقعي.',
    heroImage: '/images/retina-hero.jpg',
    benefits: [
      'تصوير الشبكية بتقنية OCT',
      'ليزر الشبكية الحديث',
      'حقن العين (Anti-VEGF)',
      'جراحات الشبكية المتقدمة',
    ],
    process: [
      { title: 'الفحص', description: 'فحص قاع العين وتصوير الشبكية' },
      { title: 'التشخيص', description: 'تحديد المشكلة ودرجتها بدقة' },
      { title: 'العلاج', description: 'ليزر أو حقن أو جراحة حسب الحالة' },
      { title: 'المتابعة', description: 'متابعة دورية لتقييم النتائج' },
    ],
    faqs: [
      { question: 'ما هي أعراض مشاكل الشبكية؟', answer: 'رؤية خطوط متعرجة، بقع عائمة، فقدان جزء من الرؤية' },
      { question: 'هل مرضى السكر معرضون أكثر؟', answer: 'نعم، يجب على مرضى السكر فحص الشبكية سنوياً' },
    ],
  },
  pediatric: {
    title: 'طب عيون الأطفال',
    subtitle: 'رعاية متخصصة لعيون أطفالك',
    description: 'نقدم خدمات شاملة لفحص وعلاج مشاكل العيون عند الأطفال مع بيئة مريحة ومناسبة للصغار.',
    heroImage: '/images/pediatric-hero.jpg',
    benefits: [
      'فحص النظر للأطفال',
      'علاج كسل العين',
      'علاج الحول',
      'انسداد القناة الدمعية',
      'بيئة صديقة للأطفال',
    ],
    process: [
      { title: 'الفحص', description: 'فحص شامل مناسب لعمر الطفل' },
      { title: 'التشخيص', description: 'تحديد المشكلة بدقة' },
      { title: 'العلاج', description: 'خطة علاجية مخصصة للطفل' },
      { title: 'المتابعة', description: 'متابعة تطور الحالة' },
    ],
    faqs: [
      { question: 'متى يجب فحص عيون الطفل؟', answer: 'الفحص الأول قبل المدرسة، ثم سنوياً أو عند ملاحظة أي مشكلة' },
      { question: 'ما علامات مشاكل النظر عند الأطفال؟', answer: 'الاقتراب من التلفزيون، فرك العين، إمالة الرأس' },
    ],
  },
  cosmetic: {
    title: 'تجميل العيون',
    subtitle: 'إطلالة شبابية ومنعشة',
    description: 'نقدم عمليات تجميل الجفون وإزالة الانتفاخات والتجاعيد حول العينين للحصول على مظهر أكثر شباباً ونضارة.',
    heroImage: '/images/cosmetic-hero.jpg',
    benefits: [
      'شد الجفون العلوية والسفلية',
      'إزالة الأكياس الدهنية',
      'علاج ترهل الجفون',
      'حقن البوتوكس والفيلر',
      'نتائج طبيعية',
    ],
    process: [
      { title: 'الاستشارة', description: 'تقييم الحالة ومناقشة التوقعات' },
      { title: 'التخطيط', description: 'وضع خطة العلاج المناسبة' },
      { title: 'الإجراء', description: 'تنفيذ العملية بدقة عالية' },
      { title: 'التعافي', description: 'إرشادات العناية والمتابعة' },
    ],
    faqs: [
      { question: 'هل العملية تترك ندبات؟', answer: 'الشقوق تكون في ثنايا طبيعية وتصبح غير مرئية بعد الشفاء' },
      { question: 'كم يستمر التورم بعد العملية؟', answer: 'عادة أسبوع إلى أسبوعين' },
    ],
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = servicesData[params.slug];
  
  if (!service) {
    return { title: 'خدمة غير موجودة' };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${siteConfig.shortName}`,
      description: service.description,
      type: 'website',
      images: [{ url: service.heroImage }],
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ServiceLandingPage service={service} slug={params.slug} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
