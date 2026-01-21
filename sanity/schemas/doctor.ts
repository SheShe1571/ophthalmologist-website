import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'doctor',
  title: 'الطبيب',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'اللقب',
      type: 'string',
      description: 'مثال: استشاري طب وجراحة العيون',
    }),
    defineField({
      name: 'image',
      title: 'الصورة',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'نبذة',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'credentials',
      title: 'المؤهلات',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'العنوان', type: 'string' },
            { name: 'description', title: 'الوصف', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'سنوات الخبرة',
      type: 'number',
    }),
    defineField({
      name: 'operations',
      title: 'عدد العمليات',
      type: 'number',
    }),
    defineField({
      name: 'patients',
      title: 'عدد المرضى',
      type: 'number',
    }),
  ],
});
