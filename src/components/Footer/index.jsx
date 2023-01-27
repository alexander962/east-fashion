import React, { useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast';

import { client } from '~/lib/client';
import facebook from '@/assets/images/facebook.svg';
import twitter from '@/assets/images/instagram.svg';
import youtube from '@/assets/images/youtube.svg';
import styles from './index.module.scss';
import cl from 'classnames';
const Footer = ({ classname, subscribe = true, icons = true }) => {
  const [inputText, setInputText] = useState('');

  const handleSignUp = async () => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(inputText)) {
      toast.notify('Subscribed successfully!', {
        duration: 5,
        type: 'success',
        title: '',
      });
      // const mutations = [
      //   {
      //     patch: {
      //       id: 'd674cb9c-e335-4f31-a3b4-49a4ee894de0',
      //       set: {
      //         description: 'Emails',
      //       },
      //     },
      //   },
      //   {
      //     create: {
      //       _type: 'emails',
      //       title: inputText,
      //     },
      //   },
      // ];
      // client.mutate(mutations[1]);

      // const mutation = `mutation {
      //   createOrReplace(input: { _id: "e5f88fe5-f276-4cbe-bfd3-f25cdc1d633b", patch: { set: { text: "New text" } } }) { document { _id } }
      // }`;
      // client.fetch(mutation).then(res => console.log(res));

      // const mutation = {
      //   createOrReplace(input: {
      //     id: "e5f88fe5-f276-4cbe-bfd3-f25cdc1d633b"
      //     patch: {
      //       set: {
      //         textFieldName: "New Text"
      //       }
      //     }
      //   }) {}
      // }

      // const mutations = [
      //   {
      //     patch: {
      //       id: 'e5f88fe5-f276-4cbe-bfd3-f25cdc1d633b',
      //       insert: {
      //         after: 'emailList[-1]',
      //         items: [inputText],
      //       },
      //       // set: {
      //       //   emailList: [inputText],
      //       // },
      //     },
      //   },
      // ];
      //
      // client.mutate(mutations[0]);
      // const query = `{
      //   "emailText": *[_type == "emails"]
      // }`;
      // const { emailText } = await client.fetch(query);
      // console.log(emailText);
      // let newText = emailText[0].email ? emailText[0].email + ' ' + inputText : inputText;
      // console.log(newText);
      //
      // const mutationAddEmails = [
      //   {
      //     patch: {
      //       id: 'e5f88fe5-f276-4cbe-bfd3-f25cdc1d633b',
      //       set: {
      //         email: newText,
      //       },
      //     },
      //   },
      // ];
      //
      // client.mutate(mutationAddEmails[0]);
      // client.update('email', existingText => {
      //   return existingText + 'New Text';
      // });
      try {
        const url =
          'https://script.google.com/macros/s/AKfycbyujzcrUoYWgbN8XSyTREcHxts917QABltBmOLZUjUcehVkq_m3uonqc3xKU4xkgzkIvw/exec';
        fetch(`${url}?email=${inputText}`);
      } catch (err) {
        console.log(err);
      }
      setInputText('');
    } else {
      toast.notify('Enter a valid email, for example: example@mail.com', {
        duration: 5,
        type: 'error',
        title: '',
      });
    }
  };

  return (
    <div>
      <ToastContainer align={'right'} position={'bottom'} />
      {subscribe && (
        <div className={cl(classname, styles.footer__form)}>
          <label className={styles.footer__form_text} htmlFor="text">
            Sign up for news delivered right to your inbox. Unsubscribe anytime.
          </label>
          <div className={styles.footer__formBlock}>
            <input
              id="text"
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="YOUR EMAIL ADDRESS"
              required
            />
            <button onClick={handleSignUp}>SIGN UP</button>
          </div>
        </div>
      )}
      {icons && (
        <>
          <hr className={styles.hr} />
          <footer className={styles.footer}>
            <nav className={styles.footer__nav}>
              <div className={styles.footer__menu}>
                <Link href={'/skin-care'}>
                  <a>Soins de Beauté</a>
                </Link>
                <Link href={'/interviews'}>
                  <a>Entretiens</a>
                </Link>
                <Link href={'/culture'}>
                  <a>Art &amp; Culture</a>
                </Link>
                <Link href={'/about'}>
                  <a>A Propos</a>
                </Link>
              </div>
              <div className={styles.footer__icons}>
                <a href="#" target="_blank">
                  <img src={facebook.src} alt="" />
                </a>
                <a href="#" target="_blank">
                  <img src={twitter.src} alt="" />
                </a>
                <a href="#" target="_blank">
                  <img src={youtube.src} alt="" />
                </a>
              </div>
            </nav>
          </footer>
          <hr className={styles.hr} />
        </>
      )}
    </div>
  );
};

export default Footer;
