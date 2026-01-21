'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { ScrollAnimation } from '@/components/animations/ScrollAnimation';

// Sample reviews - will be replaced by CMS
const reviews = [
  {
    id: '1',
    name: 'أحمد محمد',
    rating: 5,
    text: 'تجربة ممتازة مع الدكتور، أجريت عملية الليزك وكانت النتيجة مذهلة. الفريق الطبي محترف جداً والعيادة نظيفة ومجهزة بأحدث الأجهزة.',
    service: 'عملية الليزك',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'فاطمة علي',
    rating: 5,
    text: 'الحمدلله تمت عملية المياه البيضاء لوالدتي بنجاح تام. شكراً للدكتور على اهتمامه ومتابعته المستمرة.',
    service: 'عملية المياه البيضاء',
    date: '2024-01-10',
  },
  {
    id: '3',
    name: 'خالد العمري',
    rating: 5,
    text: 'من أفضل عيادات العيون التي زرتها. الدكتور متمكن جداً ويشرح كل شيء بالتفصيل. أنصح الجميع بزيارتهم.',
    service: 'فحص شامل',
    date: '2024-01-05',
  },
  {
    id: '4',
    name: 'نورة السعيد',
    rating: 5,
    text: 'عيادة راقية وخدمة ممتازة. الموظفون متعاونون جداً والمواعيد منظمة. شكراً لكم.',
    service: 'علاج جفاف العين',
    date: '2023-12-28',
  },
  {
    id: '5',
    name: 'عبدالله الحربي',
    rating: 5,
    text: 'أجريت عملية تصحيح النظر عند الدكتور وكانت النتيجة أفضل مما توقعت. الآن أرى بوضوح تام بدون نظارات.',
    service: 'تصحيح النظر',
    date: '2023-12-20',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="section-container">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">آراء مرضانا</h2>
          <p className="section-subtitle">
            نفخر بثقة مرضانا ونسعى دائماً لتقديم أفضل خدمة طبية
          </p>
        </ScrollAnimation>

        {/* Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="التقييم السابق"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:-translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="التقييم التالي"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Review Card */}
            <div className="overflow-hidden px-8 md:px-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                >
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-primary-200 mb-4" />

                  {/* Review Text */}
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    {reviews[currentIndex].text}
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {reviews[currentIndex].name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {reviews[currentIndex].service}
                      </p>
                    </div>
                    <StarRating rating={reviews[currentIndex].rating} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`انتقل للتقييم ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Overall Rating */}
        <ScrollAnimation className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md mx-auto text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">4.9</div>
            <StarRating rating={5} />
            <p className="text-gray-500 mt-2">بناءً على +500 تقييم</p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
