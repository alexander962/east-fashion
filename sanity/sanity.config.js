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

  plugins: [
    '@sanity/base',
    '@sanity/components',
    '@sanity/default-layout',
    '@sanity/default-login',
    '@sanity/desk-tool',
    'comment-moderation',
    '@sanity/form-builder',
    deskTool(),
    visionTool(),
  ],

  env: {
    development: {
      plugins: ['@sanity/vision'],
    },
  },

  schema: {
    types: schemaTypes,
  },
})
