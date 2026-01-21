import { Metadata } from 'next';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'الشروط والأحكام',
  description: 'شروط وأحكام استخدام موقع عيادة طب العيون',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-cairo font-bold text-gray-900 mb-8">
            الشروط والأحكام
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-lg mb-6">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">القبول بالشروط</h2>
              <p>
                باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">الخدمات الطبية</h2>
              <p>المعلومات المقدمة على هذا الموقع هي لأغراض تعليمية فقط ولا تُعد بديلاً عن الاستشارة الطبية المباشرة. يجب دائماً استشارة طبيب مختص للحصول على تشخيص وعلاج مناسب.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">حجز المواعيد</h2>
              <ul className="list-disc pr-6 space-y-2">
                <li>يتم تأكيد المواعيد عبر الاتصال أو الواتساب</li>
                <li>يرجى إلغاء أو تغيير الموعد قبل 24 ساعة على الأقل</li>
                <li>قد يتم إلغاء المواعيد المتكررة دون إشعار مسبق</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">حقوق الملكية الفكرية</h2>
              <p>جميع المحتويات على هذا الموقع محمية بحقوق الملكية الفكرية. لا يجوز نسخ أو توزيع أي محتوى دون إذن كتابي مسبق.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <p>للاستفسارات: {siteConfig.email}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
