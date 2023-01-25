import ButtonPreviewComponent from './buttonPreviewComponent'

export default {
  type: 'object',
  name: 'buttonUploadArray',
  title: 'Client Button Upload',
  fields: [
    {
      type: 'string',
      name: 'source',
      title: 'Client Button',
    },
  ],
  preview: {
    // select: {
    //   svgHtml: 'source',
    // },
    source: ButtonPreviewComponent,
    component: ButtonPreviewComponent,
  },
}
