import {defineField, defineType} from 'sanity'
import ButtonPreviewComponent from '../schemas/shared/buttonPreviewComponent'

export default defineType({
  name: 'emails',
  title: 'Emails',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'text',
    },
    {
      name: 'btn',
      type: 'buttonUploadArray',

      form: {
        components: {
          input: ButtonPreviewComponent,
        },
      },
    },
    {
      name: 'emailList',
      title: 'Email List',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
