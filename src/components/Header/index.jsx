import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import Link from 'next/link';
const Header = ({className}) => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}><Link href={'/'}>
        <a>
          Kyrill Kazak
        </a>
        </Link>
      </div>
      <nav style={{display: 'flex', justifyContent: 'space-between', maxWidth: '400px'}}>
        <Link href={'/interviews'}>
          <a>
            Interviews
          </a>
        </Link>
        <Link href={'/skin-care'}>
          <a>
            Skin Care
          </a>
        </Link>
        <Link href={'/culture'}>
          <a>
            Culture
          </a>
        </Link>
        <Link href={'/about'}>
          <a>
            About us
          </a>
        </Link>
      </nav>
    </div>
  )
}

export default Header;
