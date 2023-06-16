// import {defineType, defineArrayMember} from 'sanity'
//
// export default defineType({
//   title: 'Block Content',
//   name: 'blockContent',
//   type: 'array',
//   of: [
//     defineArrayMember({
//       title: 'Block',
//       type: 'block',
//       styles: [
//         {title: 'Normal', value: 'normal'},
//         {title: 'H1', value: 'h1'},
//         {title: 'H2', value: 'h2'},
//         {title: 'H3', value: 'h3'},
//         {title: 'H4', value: 'h4'},
//         {title: 'Quote', value: 'blockquote'},
//       ],
//       lists: [{title: 'Bullet', value: 'bullet'}],
//       marks: {
//         decorators: [
//           {title: 'Strong', value: 'strong'},
//           {title: 'Emphasis', value: 'em'},
//         ],
//         annotations: [
//           {
//             title: 'URL',
//             name: 'link',
//             type: 'object',
//             fields: [
//               {
//                 title: 'URL',
//                 name: 'href',
//                 type: 'url',
//               },
//               {
//                 title: 'Open in new window',
//                 name: 'options',
//                 type: 'object',
//                 fields: [
//                   {
//                     title: 'Target',
//                     name: 'target',
//                     type: 'string',
//                     options: {
//                       list: [
//                         {title: 'Same window', value: '_self'},
//                         {title: 'New window', value: '_blank'},
//                       ],
//                       layout: 'radio',
//                     },
//                     initialValue: '_self',
//                   },
//                   {
//                     title: 'Rel',
//                     name: 'rel',
//                     type: 'string',
//                     initialValue: '_blank',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     }),
//     defineArrayMember({
//       type: 'image',
//       options: {hotspot: true},
//     }),
//   ],
// })
