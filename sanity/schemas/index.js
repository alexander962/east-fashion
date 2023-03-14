// import blockContent from './blockContent'
import post from './post'
import author from './author'
// import favouritesPosts from './favouritesPosts'
import about from './about'
import tag from './tag'
import shared from './shared'
// import sideBarPost from './sideBarPost'

export const schemaTypes = [
  post,
  author,
  // blockContent,
  // favouritesPosts,
  about,
  tag,
  // sideBarPost,
  ...shared,
]
