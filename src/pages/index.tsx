import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';

const Index = () => {
  return (
    <div>
      <Head>
        <title>iorin.io</title>
        <meta name="description" content="行間への憧れ" />
      </Head>
      <main>
        <Header />
        iorin.io
      </main>
    </div>
  )
}

export default Index