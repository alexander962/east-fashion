import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import favouritesPosts from './favouritesPosts'
import about from './about'
import tag from './tag'
import shared from './shared'
import sideBarPost from './sideBarPost'

export const schemaTypes = [
  post,
  author,
  category,
  blockContent,
  favouritesPosts,
  about,
  tag,
  sideBarPost,
  ...shared,
]
