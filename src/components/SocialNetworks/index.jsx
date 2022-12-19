import React from 'react'
import cl from 'classnames'
import {
  AiFillYoutube,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillFacebook
} from 'react-icons/ai'

import styles from './index.module.scss'

const socialNetworks = [
  {
    id: 1,
    href: '#',
    icon: AiFillYoutube
  },
  {
    id: 2,
    href: '#',
    icon: AiFillTwitterCircle
  },
  {
    id: 3,
    href: '#',
    icon: AiFillInstagram
  },
  {
    id: 4,
    href: '#',
    icon: AiFillFacebook
  }
]
const SocialNetworks = ({className = ''}) => {
  return (
    <ul className={cl(className, styles.list)}>
      {socialNetworks.map(socialNetwork => (
        <li key={socialNetwork.id} className={styles.listItem}>
          <a href={socialNetwork.href} target='_blank' className={styles.listLink}>
            {React.createElement(
              socialNetwork.icon,
              {
                color: 'black',
                size: 50
              }
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialNetworks;
