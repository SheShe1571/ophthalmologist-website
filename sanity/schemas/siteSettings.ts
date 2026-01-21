import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'اسم الموقع',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'وصف الموقع',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'رقم الهاتف',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'رقم الواتساب',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'العنوان',
      type: 'text',
    }),
    defineField({
      name: 'mapCoordinates',
      title: 'إحداثيات الخريطة',
      type: 'object',
      fields: [
        { name: 'lat', title: 'خط العرض', type: 'number' },
        { name: 'lng', title: 'خط الطول', type: 'number' },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'وسائل التواصل',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'فيسبوك', type: 'url' },
        { name: 'instagram', title: 'انستغرام', type: 'url' },
        { name: 'twitter', title: 'تويتر', type: 'url' },
        { name: 'youtube', title: 'يوتيوب', type: 'url' },
        { name: 'snapchat', title: 'سناب شات', type: 'url' },
        { name: 'tiktok', title: 'تيك توك', type: 'url' },
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'ساعات العمل',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'أيام الأسبوع', type: 'string' },
        { name: 'friday', title: 'الجمعة', type: 'string' },
      ],
    }),
    defineField({
      name: 'defaultWhatsAppMessage',
      title: 'رسالة الواتساب الافتراضية',
      type: 'text',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'إعدادات الموقع' };
    },
  },
});
