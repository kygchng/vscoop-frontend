// pages/_app.js
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}