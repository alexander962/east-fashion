import {defineCliConfig} from 'sanity/cli'
import ButtonPreviewComponent from '~/sanity/schemas/shared/buttonPreviewComponent'

export default defineCliConfig({
  api: {
    projectId: 'lnrtwdfv',
    dataset: 'production',
  },
})
