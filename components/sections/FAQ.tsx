'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/animations/ScrollAnimation';
import { trackEvent } from '@/lib/tracking/events';

// FAQ data - will be replaced by CMS
const faqs = [
  {
    id: '1',
    question: 'ما هي ساعات العمل في العيادة؟',
    answer: 'نستقبل المرضى من السبت إلى الخميس من الساعة 9 صباحاً حتى 9 مساءً. يوم الجمعة إجازة. يمكنك حجز موعدك عبر الواتساب أو الاتصال في أي وقت.',
  },
  {
    id: '2',
    question: 'هل يمكنني حجز موعد عبر الإنترنت؟',
    answer: 'نعم، يمكنك حجز موعدك بسهولة عبر الواتساب أو تعبئة نموذج الحجز على موقعنا وسيتم التواصل معك خلال ساعات العمل لتأكيد الموعد.',
  },
  {
    id: '3',
    question: 'كم تستغرق عملية الليزك؟',
    answer: 'تستغرق عملية الليزك حوالي 15-20 دقيقة لكلتا العينين. العملية سريعة وآمنة ويمكنك العودة للمنزل في نفس اليوم. ستلاحظ تحسناً في الرؤية خلال 24-48 ساعة.',
  },
  {
    id: '4',
    question: 'هل عمليات العيون مؤلمة؟',
    answer: 'لا، جميع عملياتنا تتم تحت تخدير موضعي باستخدام قطرات مخدرة، لذلك لن تشعر بأي ألم أثناء العملية. قد تشعر ببعض الانزعاج البسيط بعد العملية والذي يزول سريعاً.',
  },
  {
    id: '5',
    question: 'ما هي شروط إجراء عملية الليزك؟',
    answer: 'يجب أن يكون عمرك 18 سنة فأكثر، وأن يكون النظر مستقراً لمدة سنة على الأقل. سيتم إجراء فحص شامل للعين لتحديد مدى ملاءمتك للعملية.',
  },
  {
    id: '6',
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع النقدي، البطاقات البنكية (مدى، فيزا، ماستركارد)، والتأمين الطبي للشركات المعتمدة. كما نوفر خطط تقسيط مريحة.',
  },
  {
    id: '7',
    question: 'هل تقبلون التأمين الطبي؟',
    answer: 'نعم، نتعامل مع معظم شركات التأمين الطبي المعتمدة في المملكة. يرجى التواصل معنا للتأكد من تغطية تأمينك.',
  },
  {
    id: '8',
    question: 'كم تكلفة الكشف والفحص؟',
    answer: 'تختلف التكلفة حسب نوع الفحص المطلوب. يرجى التواصل معنا عبر الواتساب أو الهاتف للاستفسار عن الأسعار والعروض الحالية.',
  },
];

interface FAQItemProps {
  faq: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <StaggerItem>
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-5 text-right hover:text-primary-600 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-lg pr-4 group-hover:text-primary-600">
            {faq.question}
          </span>
          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-gray-600 leading-relaxed pr-4">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StaggerItem>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number, question: string) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);
    
    if (newIndex !== null) {
      trackEvent('faq_expand', {
        event_category: 'engagement',
        event_label: question,
      });
    }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <p className="section-subtitle">
            إجابات على أكثر الأسئلة شيوعاً من مرضانا
          </p>
        </ScrollAnimation>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="bg-white rounded-2xl shadow-lg divide-y divide-gray-100 p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index, faq.question)}
              />
            ))}
          </StaggerContainer>
        </div>

        {/* Contact CTA */}
        <ScrollAnimation className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            لم تجد إجابة سؤالك؟
          </p>
          <a
            href="#contact"
            className="btn-primary"
          >
            تواصل معنا
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}
