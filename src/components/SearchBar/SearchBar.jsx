import React, { useRef, useEffect, useState } from 'react';

// Components
import NextLink from 'next/link';

// Styles
import classnames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { client } from '~/lib/client';

const cn = classnames.bind(styles);

function SearchBar() {
  const inputRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchResult, setIsSearchResult] = useState('');
  const buttonRef = useRef(null);
  const backLink = '';

  const onSearchInput = async (event) => {
    const inputText = event.target.value;
    setSearchInput(inputText);
  };

  const viewAllSearchResults = () => {
    console.log('viewAllSearchResults');
  }

  // autofocus on input on search open
  useEffect(() => {
    inputRef.current.focus();
  }, [isSearchActive]);

  const onSearchOpenClick = () => {
    // console.log('valera');
    // const id = 'd674cb9c-e335-4f31-a3b4-49a4ee894de0';
    // const newpatch = client
    //   .patch(id, {"set": {'description': 'generated Valera'}})
    setIsSearchActive(true);
    setSearchInput('');

    if (window) {
      window.scrollTo(0, 0);
    }
    // const mutations = [
    //   {
    //     patch: {
    //       id: "d674cb9c-e335-4f31-a3b4-49a4ee894de0",
    //       set: {
    //         'description':
    //           "enerated Valera3",
    //       },
    //     },
    //   },
    //   {
    //     create: {
    //       '_type': 'category',
    //       title: 'omagad',
    //       description: 'omagad'
    //     }
    //   }
    // ]
    //
    // client.mutate(mutations[1]);

  };

  const handleKeyDown = (ev) => {
    if (ev.code === 'Escape') {
      setIsSearchActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onSearchKeyUp = (ev) => {
    if (ev.code === 'Enter') {
      if (!isSearchResult) {
        viewAllSearchResults();
      } else if (buttonRef?.current) {
        buttonRef.current.click();
      }
    }
  };

  return (
    <div>
      {backLink && (
        <NextLink href={`${backLink}`}>
          <a className={cn('article-search__back', { 'article-search__back_show': isSearchActive })}>
            <div className={cn('article-search__back-text')}>{'Back to All Articles'}</div>
          </a>
        </NextLink>
      )}

      <button
        type="button"
        className={cn('article-search__search-block', { 'article-search__search-block_hide': isSearchActive })}
        onClick={onSearchOpenClick}
      >
        <div className={cn('article-search__text')}>
          {'Search'}
        </div>
      </button>

      <div className={cn('article-search__container')}>
        <input
          className={cn('article-search__input')}
          onChange={onSearchInput}
          onKeyUp={onSearchKeyUp}
          value={searchInput}
          maxLength="80"
          ref={inputRef}
        />
      </div>
    </div>
  );
}

export default SearchBar;
