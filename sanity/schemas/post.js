import {defineField, defineType} from 'sanity'

const textEditorStyles = [
  {title: 'Paragraph', value: 'normal'},
  {title: 'Heading 1', value: 'h1'},
  {title: 'Heading 2', value: 'h2'},
  {title: 'Heading 3', value: 'h3'},
  {title: 'Quote', value: 'blockquote'},
  {title: 'cardItem', value: 'div'},
]

export default defineType({
  name: 'post',
  title: 'Posts',
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
      title: 'Popular',
      name: 'popular',
      type: 'boolean',
    }),
    defineField({
      title: 'Favourite',
      name: 'favourite',
      type: 'boolean',
    }),
    defineField({
      title: 'Sidebar',
      name: 'sidebar',
      type: 'boolean',
    }),
    defineField({
      name: 'displayTypes',
      title: 'Post layout type',
      type: 'string',
      options: {
        list: [
          {title: 'One small image type', value: 'type1'},
          {title: 'One medium image type', value: 'type2'},
          {title: 'One big image type', value: 'type3'},
          {title: 'Two small images type', value: 'type4'},
          {title: 'Two big images type', value: 'type5'},
          {title: 'Three images type', value: 'type6'},
        ],
        layout: 'dropdown',
      },
      default: 'type1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta_title',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      validation: (Rule) => Rule.required(),
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
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'thirdImage',
      title: 'Third image',
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
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'sliderImages',
      title: 'Slider images',
      type: 'array',
      group: 'content',
      maxItems: 10,
      of: [
        {
          name: 'sliderImage',
          title: 'Slider image',
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'video',
      type: 'document',
      title: 'Video YouTube',
      fields: [
        {
          name: 'videoId',
          type: 'string',
          title: 'Enter videoId',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'string',
      options: {
        list: [
          {title: 'Favourites', value: 'favourites'},
          {title: 'Culture', value: 'culture'},
          {title: 'Skin-care', value: 'skin-care'},
          {title: 'Interviews', value: 'interviews'},
        ],
        layout: 'dropdown',
      },
      default: 'culture',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'reference',
      to: {type: 'tag'},
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body content',
      type: 'array',
      group: 'content',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: textEditorStyles,
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  },
                  {
                    name: 'target',
                    title: 'Open link in new tab',
                    type: 'boolean',
                    options: {
                      layout: 'checkbox',
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
        },
        {
          name: 'video',
          type: 'document',
          title: 'Video YouTube',
          fields: [
            {
              name: 'videoId',
              type: 'string',
              title: 'Enter videoId',
            },
          ],
        },
        {
          name: 'cardItem',
          title: 'Card Item',
          type: 'document',
          styles: textEditorStyles,
          fields: [
            {
              name: 'href',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'imageCard',
              type: 'image',
              title: 'Image Card',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'btnText',
              type: 'string',
              title: 'Button Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'comments',
      title: 'comments',
      type: 'array',
      group: 'content',
      of: [
        {
          name: 'commentary',
          title: 'Commentary',
          type: 'document',
          fields: [
            {
              name: 'showComment',
              title: 'Show comment',
              type: 'boolean',
              initialValue: false,
            },
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
    defineField({
      name: 'popularity',
      title: 'Popularity',
      type: 'number',
      group: 'content',
    }),
  ],
  initialValue: {
    popularity: 1,
    comments: [{}],
    popular: false,
    favourite: false,
    sidebar: false,
  },
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
