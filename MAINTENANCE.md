# 📋 دليل الصيانة الشهرية

## الجدول الزمني

### أسبوعياً
- [ ] مراجعة طلبات الحجز الجديدة في Sanity
- [ ] التأكد من عمل النماذج بشكل صحيح
- [ ] مراجعة سريعة لأداء الموقع

### شهرياً
- [ ] تحديث الاعتماديات (npm update)
- [ ] نسخة احتياطية من قاعدة البيانات
- [ ] مراجعة تقارير Google Analytics
- [ ] فحص Core Web Vitals
- [ ] تحديث المحتوى حسب الحاجة

### ربع سنوياً
- [ ] مراجعة أمان الموقع
- [ ] تحديث SSL Certificate (إذا لزم)
- [ ] مراجعة SEO والترتيب
- [ ] تحديث الكلمات المفتاحية

## تحديث الاعتماديات

```bash
# فحص التحديثات المتاحة
npm outdated

# تحديث آمن (minor & patch)
npm update

# تحديث رئيسي (major) - بحذر
npx npm-check-updates -u
npm install
```

## النسخ الاحتياطي

### Sanity CMS
```bash
# تصدير البيانات
cd sanity
npx sanity dataset export production backup.tar.gz
```

### الكود
- GitHub يحفظ نسخ تلقائياً
- يُنصح بعمل tag لكل إصدار مستقر

## مراقبة الأداء

### أدوات مجانية
1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - الهدف: 90+ للجوال

2. **Google Search Console**
   - مراقبة الأخطاء
   - ترتيب الكلمات المفتاحية

3. **Vercel Analytics**
   - مدمج مع الاستضافة

## حل المشاكل الشائعة

### النماذج لا تعمل
1. تحقق من المتغيرات البيئية
2. تحقق من rate limiting
3. راجع console للأخطاء

### الصور بطيئة
1. استخدم Next.js Image
2. تحقق من أحجام الصور في Sanity
3. فعّل CDN

### التتبع لا يعمل
1. تحقق من IDs في .env
2. تأكد من موافقة الكوكيز
3. افحص Network tab

## تصدير طلبات الحجز (CSV)

```bash
# من API (يتطلب ADMIN_API_TOKEN)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://your-domain.com/api/contact?format=csv" \
  -o submissions.csv
```

## جهات الاتصال للدعم الفني

- المطور: [اسم المطور]
- البريد: [email@example.com]
- الهاتف: [+966XXXXXXXXX]
