import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import ButtonPreviewComponent from './schemas/shared/buttonPreviewComponent'

export default defineConfig({
  name: 'default',
  title: 'sanity',

  projectId: 'lnrtwdfv',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
