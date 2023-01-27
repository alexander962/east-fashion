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
      inputComponent: ButtonPreviewComponent,

      form: {
        components: {
          input: ButtonPreviewComponent,
        },
      },
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
