import React from 'react'
import cl from 'classnames'

import styles from './index.module.scss'
import Link from 'next/link';
const Header = ({className}) => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}><Link href={'/'}>East fashion</Link></div>
      <nav style={{display: 'flex', justifyContent: 'space-between', maxWidth: '400px'}}>
        <Link href={'/interviews'}>Interviews</Link>
        <Link href={'/skin-care'}>Skin Care</Link>
        <Link href={'/culture'}>Culture</Link>
        <Link href={'/about'}>About us</Link>
      </nav>
    </div>
  )
}

export default Header;
