import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';
import Works from '@/components/Works';
import Pages from '@/components/Pages';
import TopPhoto from '@/components/Sakura2';



const Index = () => {
  return (
    <div>
      <Head>
        <title>iorin.io</title>
        <meta name="description" content="行間への憧れ" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="32x32" />
      </Head>
      <main>
        <div>
          <Header />
        </div>


      </main>
    </div>
  )
}

export default Index