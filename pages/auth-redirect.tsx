import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import { callAccessAPI } from './api/callApi';

export default function AuthRedirect() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('');
  const [incomingWebhookUrl, setIncomingWebhookUrl] = useState();
  const [incomingWebhookChannel, setIncomingWebhookChannel] = useState();
  const verifierCode = router.query.code as string;

  useEffect(() => {
    if (verifierCode) {
      callAccessAPI(verifierCode)
        .then((response) => {
          const { access_token: accessToken, incoming_webhook: incomingWebhook } = response;
          setAccessToken(accessToken);
          setIncomingWebhookUrl(incomingWebhook.url);
          setIncomingWebhookChannel(incomingWebhook.channel)
        })
        .catch(console.error);
    }
  }, [verifierCode])

  const shouldDisplayWebhookDetails = (
    accessToken
    && incomingWebhookChannel
    && incomingWebhookUrl
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.description}>
          <Link type='button' href="/">Go back home</Link>
        </p>

        {
          shouldDisplayWebhookDetails &&
          (<p className={styles.description}>
            Access token: {accessToken}
            <br />
            Connected Channel: {incomingWebhookChannel}
            <br />
            Webhook URL: {incomingWebhookUrl}
          </p>)
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}