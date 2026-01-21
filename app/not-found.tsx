import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center px-4">
          <h1 className="text-9xl font-cairo font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-cairo font-bold text-gray-900 mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <Link href="/" className="btn-primary">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
