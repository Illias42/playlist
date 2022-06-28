import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import initStore from '../redux/store'
import withReduxSaga from 'next-redux-saga';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../styles/theme';

function MyApp({Component, pageProps}: AppProps) 
{
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
    })

    return (
        <>
        <Head>
            <title>Musicservice</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Provider store={initStore}>
            <ThemeProvider theme={theme}> 
                <CssBaseline />       
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>    
        </>
    );
}

export default (withReduxSaga(MyApp))