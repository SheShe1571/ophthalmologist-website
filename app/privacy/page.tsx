import { Metadata } from 'next';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'سياسة الخصوصية وحماية البيانات لعيادة طب العيون',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-cairo font-bold text-gray-900 mb-8">
            سياسة الخصوصية
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-lg mb-6">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">مقدمة</h2>
              <p>
                نحن في {siteConfig.name} نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام موقعنا الإلكتروني.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
              <p>نقوم بجمع المعلومات التالية:</p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li><strong>معلومات الاتصال:</strong> الاسم، رقم الهاتف، البريد الإلكتروني عند تعبئة نماذج الحجز أو الاتصال.</li>
                <li><strong>معلومات الاستخدام:</strong> بيانات حول كيفية استخدامك للموقع من خلال ملفات تعريف الارتباط (الكوكيز).</li>
                <li><strong>معلومات الجهاز:</strong> نوع المتصفح، نظام التشغيل، عنوان IP.</li>
                <li><strong>المعلومات الطبية:</strong> أي معلومات صحية تشاركها معنا عند حجز موعد أو طلب استشارة.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">كيف نستخدم معلوماتك</h2>
              <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li>التواصل معك بخصوص المواعيد والاستفسارات</li>
                <li>تقديم الخدمات الطبية المطلوبة</li>
                <li>تحسين خدماتنا وتجربة المستخدم على الموقع</li>
                <li>إرسال تذكيرات بالمواعيد (بعد موافقتك)</li>
                <li>تحليل استخدام الموقع لتحسين أدائه</li>
                <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (الكوكيز)</h2>
              <p>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. تشمل هذه:
              </p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li><strong>كوكيز ضرورية:</strong> لضمان عمل الموقع بشكل صحيح</li>
                <li><strong>كوكيز تحليلية:</strong> لفهم كيفية استخدام الزوار للموقع (Google Analytics)</li>
                <li><strong>كوكيز إعلانية:</strong> لعرض إعلانات مخصصة (Meta Pixel)</li>
              </ul>
              <p className="mt-4">
                يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك أو من خلال رسالة الموافقة التي تظهر عند زيارة الموقع.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">مشاركة المعلومات</h2>
              <p>
                نحن لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث. قد نشارك معلوماتك في الحالات التالية فقط:
              </p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li>مع مقدمي الخدمات الذين يساعدوننا في تشغيل الموقع (مثل خدمات الاستضافة)</li>
                <li>عند الضرورة للامتثال للقانون أو أمر قضائي</li>
                <li>لحماية حقوقنا أو سلامة المستخدمين</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">حماية البيانات</h2>
              <p>
                نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف، بما في ذلك:
              </p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li>تشفير SSL لجميع البيانات المنقولة</li>
                <li>تقييد الوصول إلى البيانات الشخصية</li>
                <li>نسخ احتياطية منتظمة</li>
                <li>مراجعة دورية لإجراءات الأمان</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">حقوقك</h2>
              <p>لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:</p>
              <ul className="list-disc pr-6 mt-4 space-y-2">
                <li>الحق في الوصول إلى بياناتك الشخصية</li>
                <li>الحق في تصحيح البيانات غير الدقيقة</li>
                <li>الحق في طلب حذف بياناتك</li>
                <li>الحق في الاعتراض على معالجة بياناتك</li>
                <li>الحق في سحب موافقتك في أي وقت</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">الاحتفاظ بالبيانات</h2>
              <p>
                نحتفظ ببياناتك الشخصية طالما كان ذلك ضرورياً للأغراض المذكورة في هذه السياسة، أو وفقاً لما يقتضيه القانون. سيتم حذف بياناتك أو إخفاء هويتها عندما لا تعود هناك حاجة مشروعة لمعالجتها.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">روابط خارجية</h2>
              <p>
                قد يحتوي موقعنا على روابط لمواقع خارجية. نحن غير مسؤولين عن ممارسات الخصوصية لهذه المواقع، وننصحك بمراجعة سياسات الخصوصية الخاصة بها.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">التعديلات على هذه السياسة</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية من خلال نشر السياسة الجديدة على هذه الصفحة.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-cairo font-bold text-gray-900 mb-4">اتصل بنا</h2>
              <p>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا:
              </p>
              <ul className="list-none mt-4 space-y-2">
                <li><strong>الهاتف:</strong> <span dir="ltr">{siteConfig.phone}</span></li>
                <li><strong>البريد الإلكتروني:</strong> {siteConfig.email}</li>
                <li><strong>العنوان:</strong> {siteConfig.location.address}</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
