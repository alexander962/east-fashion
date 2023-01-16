import {defineField, defineType} from 'sanity'

const textEditorStyles = [
  {title: 'Paragraph', value: 'normal'},
  {title: 'Heading 1', value: 'h1'},
  {title: 'Heading 2', value: 'h2'},
  {title: 'Heading 3', value: 'h3'},
  {title: 'Bullet', value: 'bullet'},
  {title: 'Numbered', value: 'number'},
  {title: 'Quote', value: 'blockquote'},
]

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'meta',
      title: 'Meta',
    },
  ],
  fields: [
    defineField({
      title: 'Make a post popular?',
      name: 'popular',
      type: 'boolean'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta_title',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          group: 'content',
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
    }),
    defineField({
      name: 'additionalImage',
      title: 'Additional image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          group: 'content',
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    // defineField({
    //   name: 'body',
    //   title: 'Body content',
    //   type: 'blockContent',
    //   styles: textEditorStyles,
    // }),
    defineField({
      name: 'body',
      title: 'Body content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: textEditorStyles,
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'commentaries',
      title: 'Commentaries',
      type: 'array',
      group: 'content',
      of: [
        {
          name: 'commentary',
          title: 'Commentary',
          type: 'document',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'publishedComment',
              title: 'Published Comment',
              type: 'datetime',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      group: 'content',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
