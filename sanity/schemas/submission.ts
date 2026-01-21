import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'submission',
  title: 'طلبات الحجز',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'رقم الجوال',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'service',
      title: 'الخدمة',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'الرسالة',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'الحالة',
      type: 'string',
      options: {
        list: [
          { title: 'جديد', value: 'new' },
          { title: 'تم التواصل', value: 'contacted' },
          { title: 'تم الحجز', value: 'booked' },
          { title: 'مكتمل', value: 'completed' },
          { title: 'ملغي', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'ملاحظات',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'تاريخ الإنشاء',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const statusEmoji: Record<string, string> = {
        new: '🆕',
        contacted: '📞',
        booked: '📅',
        completed: '✅',
        cancelled: '❌',
      };
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'الأحدث',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
});
