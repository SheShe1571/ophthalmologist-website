import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'video',
  title: 'الفيديوهات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان الفيديو',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'معرف يوتيوب',
      type: 'string',
      description: 'مثال: dQw4w9WgXcQ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'صورة مصغرة',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'duration',
      title: 'المدة',
      type: 'string',
      description: 'مثال: 5:30',
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
    }),
    defineField({
      name: 'isVisible',
      title: 'ظاهر',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
