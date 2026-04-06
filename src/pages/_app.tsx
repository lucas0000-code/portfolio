import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import {
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/carbon.css';
import '@/styles/mdx.css';

import { getFromLocalStorage } from '@/lib/helper.client';

import { blockDomainMeta } from '@/constants/env';

const icons = [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiGit];

const queryClient = new QueryClient();

function RouteLoadingOverlay() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => setLoading(true);
    const done = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', done);
    Router.events.on('routeChangeError', done);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', done);
      Router.events.off('routeChangeError', done);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark'>
      <div className='flex gap-4'>
        {icons.map((Icon, i) => (
          <div
            key={i}
            className='text-gray-700 dark:text-gray-200'
            style={{
              animation: 'roll 1s linear infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <Icon size={36} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (
      window.location.host !==
      (process.env.NEXT_PUBLIC_BLOCK_DOMAIN_WHITELIST ||
        'theodorusclarence.com') &&
      blockDomainMeta
    ) {
      if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
        localStorage.setItem('incrementMetaFlag', 'false');
        window.location.reload();
      }
    }
  }, []);

  useRemoteRefresh();

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouteLoadingOverlay />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
