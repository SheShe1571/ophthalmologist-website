# 🏥 موقع عيادة طب العيون | Ophthalmologist Website

موقع احترافي متكامل لعيادة طب العيون، مصمم وفق معايير Google مع دعم كامل للغة العربية (RTL).

## ✨ المميزات

### التصميم والتجربة
- ✅ تصميم Mobile-First متجاوب
- ✅ دعم RTL كامل للغة العربية
- ✅ خطوط عربية واضحة (Cairo & Tajawal)
- ✅ أزرار CTA واضحة في كل قسم
- ✅ تأثير "العيون الطافية" (Floating Eyes) مع Parallax
- ✅ رسوم متحركة سلسة (Scroll animations & Micro-interactions)

### الأقسام
- 🏠 الصفحة الرئيسية (Hero)
- 👨‍⚕️ من نحن (About)
- 🔬 الخدمات (Services)
- 🎬 الفيديوهات (Videos)
- ⭐ آراء المرضى (Reviews)
- ❓ الأسئلة الشائعة (FAQ)
- 📍 الموقع والخريطة (Location)
- 📞 تواصل معنا (Contact)

### صفحات الخدمات (Landing Pages)
- صفحة مخصصة لكل خدمة
- تصميم موجه للتحويل (Conversion-focused)
- تتبع أحداث مخصص لكل خدمة

### التكاملات والتتبع
- 📊 Google Analytics 4
- 🏷️ Google Tag Manager
- 📱 Meta Pixel (Facebook)
- 📈 تتبع الأحداث:
  - نقرات واتساب
  - نقرات الاتصال
  - إرسال النماذج
  - مشاهدات الفيديو

### الأمان والخصوصية
- 🔒 SSL/HTTPS Headers
- 🛡️ حماية النماذج (Rate Limiting)
- ✅ reCAPTCHA v3 جاهز
- 📄 صفحة سياسة الخصوصية
- 🍪 شريط موافقة الكوكيز

### نظام إدارة المحتوى (CMS)
- 📝 Sanity CMS للتحكم الكامل
- تعديل النصوص والخدمات
- إدارة الآراء والفيديوهات
- تصدير الطلبات كـ CSV

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone <repository-url>
cd ophthalmologist-website

# 2. تثبيت الاعتماديات
npm install

# 3. إعداد المتغيرات البيئية
cp .env.example .env.local
# قم بتعديل الملف وإضافة المفاتيح الخاصة بك

# 4. تشغيل خادم التطوير
npm run dev

# 5. فتح الموقع
# http://localhost:3000
```

### إعداد Sanity CMS

```bash
# 1. الدخول لمجلد Sanity
cd sanity

# 2. تثبيت الاعتماديات
npm install

# 3. إنشاء مشروع Sanity جديد
npx sanity init

# 4. تشغيل Studio
npm run dev
# http://localhost:3333
```

## 📁 هيكل المشروع

```
ophthalmologist-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # التخطيط الرئيسي
│   ├── page.tsx             # الصفحة الرئيسية
│   ├── privacy/             # سياسة الخصوصية
│   ├── terms/               # الشروط والأحكام
│   ├── services/[slug]/     # صفحات الخدمات
│   └── api/contact/         # API النماذج
├── components/
│   ├── ui/                  # مكونات UI
│   ├── sections/            # أقسام الصفحة
│   ├── animations/          # مكونات الرسوم المتحركة
│   └── tracking/            # مكونات التتبع
├── lib/
│   ├── config.ts            # إعدادات الموقع
│   ├── utils.ts             # دوال مساعدة
│   ├── sanity/              # إعدادات Sanity
│   └── tracking/            # دوال التتبع
├── sanity/                   # Sanity CMS Studio
│   └── schemas/             # مخططات البيانات
└── public/                   # الملفات الثابتة
```

## ⚙️ المتغيرات البيئية

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Google Analytics & GTM
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Contact Info
NEXT_PUBLIC_WHATSAPP_NUMBER=966XXXXXXXXX
NEXT_PUBLIC_PHONE_NUMBER=+966XXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🎨 تخصيص التصميم

### الألوان
عدّل الألوان في `tailwind.config.ts`:
```typescript
colors: {
  primary: { ... },    // الأزرق - اللون الرئيسي
  secondary: { ... },  // التركواز - اللون الثانوي
  accent: { ... },     // الأصفر - لون التمييز
}
```

### المحتوى
عدّل المحتوى الافتراضي في `lib/config.ts`:
- معلومات العيادة
- أرقام التواصل
- الخدمات
- الأسئلة الشائعة

## 📦 النشر (Deployment)

### Vercel (موصى به)
```bash
# 1. ربط المشروع
vercel link

# 2. النشر
vercel --prod
```

### أو من لوحة Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. Import من GitHub
3. أضف المتغيرات البيئية
4. Deploy

## 🔧 الصيانة الشهرية

### قائمة المهام
- [ ] تحديث الاعتماديات: `npm update`
- [ ] مراجعة النسخ الاحتياطية
- [ ] فحص أداء الموقع (Core Web Vitals)
- [ ] مراجعة تقارير Analytics
- [ ] تحديث المحتوى من CMS
- [ ] فحص النماذج والتتبع

## 📊 تحسين محركات البحث (SEO)

### ما تم تنفيذه
- ✅ Meta tags ديناميكية
- ✅ Open Graph للمشاركة
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap تلقائي
- ✅ Robots.txt
- ✅ تحسين الصور

### للعمل عليه
- تحديد الكلمات المفتاحية حسب التخصص
- إنشاء محتوى مستهدف
- بناء روابط خلفية
- متابعة الترتيب

## 📱 الدعم

للمساعدة أو الاستفسارات، تواصل معنا.

---

صُمم بـ ❤️ باستخدام Next.js, Tailwind CSS, Framer Motion & Sanity
