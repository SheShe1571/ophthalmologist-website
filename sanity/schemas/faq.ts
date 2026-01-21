import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'الأسئلة الشائعة',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'السؤال',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'الإجابة',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'التصنيف',
      type: 'string',
      options: {
        list: [
          { title: 'عام', value: 'general' },
          { title: 'المواعيد', value: 'appointments' },
          { title: 'العمليات', value: 'operations' },
          { title: 'الأسعار', value: 'pricing' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
    }),
  ],
});
