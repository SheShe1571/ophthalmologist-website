# 🚀 دليل النشر على Vercel | Deployment Guide

## الخطوة 1: إنشاء حساب Vercel (مجاني)

1. اذهب إلى [vercel.com/signup](https://vercel.com/signup)
2. سجل باستخدام:
   - GitHub (موصى به) ✅
   - GitLab
   - Bitbucket
   - البريد الإلكتروني

---

## الخطوة 2: رفع المشروع على GitHub

### إذا لم يكن لديك Repository:

```bash
# 1. إنشاء Git repository
git init

# 2. إضافة جميع الملفات
git add .

# 3. أول commit
git commit -m "Initial commit: Ophthalmologist website"

# 4. إنشاء repository على GitHub
# اذهب إلى github.com/new وأنشئ repo جديد

# 5. ربط ورفع
git remote add origin https://github.com/YOUR_USERNAME/ophthalmologist-website.git
git branch -M main
git push -u origin main
```

---

## الخطوة 3: النشر على Vercel

### الطريقة 1: من لوحة Vercel (الأسهل)

1. اذهب إلى [vercel.com/new](https://vercel.com/new)
2. اختر **"Import Git Repository"**
3. اختر الـ repository الخاص بالمشروع
4. Vercel سيكتشف أنه مشروع Next.js تلقائياً
5. **أضف المتغيرات البيئية** (Environment Variables):

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `your_id` | من Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | اسم Dataset |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXX` | من Google Analytics |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXX` | من Tag Manager |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789` | من Meta Business |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `6Lc...` | من Google reCAPTCHA |
| `RECAPTCHA_SECRET_KEY` | `6Lc...` | السر (لا تشاركه) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `966500000000` | رقم الواتساب |
| `NEXT_PUBLIC_PHONE_NUMBER` | `+966500000000` | رقم الهاتف |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | رابط الموقع |
| `ADMIN_API_TOKEN` | `random_secure_string` | لتصدير CSV |

6. اضغط **"Deploy"**
7. انتظر 1-2 دقيقة ✨

### الطريقة 2: من Command Line

```bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر
vercel

# 4. للنشر للإنتاج
vercel --prod
```

---

## الخطوة 4: ربط الدومين (اختياري)

### إذا كان لديك دومين خاص:

1. في لوحة Vercel، اذهب إلى **Project Settings > Domains**
2. اضغط **"Add Domain"**
3. أدخل اسم الدومين (مثل: `dr-eyeclinic.com`)
4. اتبع التعليمات لتحديث DNS:

```
# إضافة A Record
Type: A
Name: @
Value: 76.76.19.19

# إضافة CNAME للـ www
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. انتظر 24-48 ساعة للتفعيل
6. SSL سيتم تفعيله تلقائياً ✅

---

## الخطوة 5: إعداد الخدمات الخارجية

### 1. Google Analytics 4
1. اذهب إلى [analytics.google.com](https://analytics.google.com)
2. أنشئ Property جديد
3. انسخ Measurement ID (يبدأ بـ G-)
4. أضفه في Vercel Environment Variables

### 2. Google Tag Manager
1. اذهب إلى [tagmanager.google.com](https://tagmanager.google.com)
2. أنشئ Container جديد (Web)
3. انسخ Container ID (يبدأ بـ GTM-)
4. أضفه في Vercel Environment Variables

### 3. Meta Pixel
1. اذهب إلى [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. أنشئ Pixel جديد
3. انسخ Pixel ID
4. أضفه في Vercel Environment Variables

### 4. Google reCAPTCHA v3
1. اذهب إلى [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. أنشئ موقع جديد (reCAPTCHA v3)
3. أضف دومينك
4. انسخ Site Key و Secret Key
5. أضفهما في Vercel Environment Variables

### 5. Sanity CMS
1. اذهب إلى [sanity.io/manage](https://www.sanity.io/manage)
2. أنشئ مشروع جديد أو استخدم الموجود
3. انسخ Project ID
4. أنشئ API Token (من Settings > API)
5. أضفهما في Vercel Environment Variables

---

## ✅ قائمة التحقق قبل الإطلاق

- [ ] جميع المتغيرات البيئية مضافة
- [ ] الصور الحقيقية مرفوعة
- [ ] معلومات العيادة محدثة في `lib/config.ts`
- [ ] رقم الواتساب صحيح
- [ ] Google Analytics يعمل (افحص Real-time)
- [ ] النماذج تعمل بشكل صحيح
- [ ] الموقع يعمل على الجوال
- [ ] SSL مفعل (HTTPS)
- [ ] سرعة الموقع جيدة (PageSpeed)

---

## 🔄 التحديثات المستقبلية

كل ما عليك فعله:
```bash
git add .
git commit -m "Update: description"
git push
```

Vercel سينشر التحديث تلقائياً خلال 1-2 دقيقة! 🚀

---

## 🆘 حل المشاكل

### Build فشل؟
- راجع الـ logs في Vercel Dashboard
- تأكد من صحة المتغيرات البيئية
- شغّل `npm run build` محلياً للتأكد

### الموقع بطيء؟
- استخدم صور محسنة (WebP)
- راجع Core Web Vitals في Vercel Analytics

### النماذج لا تعمل؟
- تأكد من إضافة الدومين في reCAPTCHA
- راجع Function Logs في Vercel

---

## 📞 الدعم

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
