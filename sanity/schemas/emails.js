import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'emails',
  title: 'Emails',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
