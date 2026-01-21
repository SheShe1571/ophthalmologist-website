import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'الخدمات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان الخدمة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'العنوان الفرعي',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'icon',
      title: 'الأيقونة',
      type: 'string',
      options: {
        list: [
          { title: 'عين', value: 'eye' },
          { title: 'نظارة', value: 'lens' },
          { title: 'نشاط', value: 'activity' },
          { title: 'مسح', value: 'scan' },
          { title: 'طفل', value: 'baby' },
          { title: 'تجميل', value: 'sparkles' },
        ],
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'صورة الخدمة',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'benefits',
      title: 'المميزات',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'process',
      title: 'خطوات العلاج',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'العنوان', type: 'string' },
            { name: 'description', title: 'الوصف', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'الأسئلة الشائعة',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'السؤال', type: 'string' },
            { name: 'answer', title: 'الإجابة', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'مدة العملية',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'ترتيب العرض',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
