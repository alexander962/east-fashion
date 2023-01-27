import {defineField, defineType} from 'sanity'

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
    // {
    //   name: 'btn',
    //   type: 'buttonUploadArray',
    //   title: 'Btn Upload',
    // },
    // {
    //   name: 'UrlTwitter',
    //   type: 'url',
    //   title: 'Twitter',
    //   inputComponent: TwitterUrl,
    // },
    // {
    //   name: 'emailList',
    //   title: 'Email List',
    //   type: 'array',
    //   validation: (Rule) => Rule.required().min(1),
    //   of: [
    //     {
    //       type: 'string',
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
