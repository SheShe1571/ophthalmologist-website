import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'آراء المرضى',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'اسم المريض',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'التقييم',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'نص التقييم',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'الخدمة',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'date',
      title: 'التاريخ',
      type: 'date',
    }),
    defineField({
      name: 'isVisible',
      title: 'ظاهر',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: `${title} - ${'⭐'.repeat(rating || 0)}`,
        subtitle: subtitle?.slice(0, 50) + '...',
      };
    },
  },
});
