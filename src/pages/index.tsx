import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';
import Works from '@/contents/Works';
import Pages from '@/contents/Pages';
import TopPhoto from '@/components/Sakura2';

const Hdiv = styled.div`
  display: flex;
  position: sticky;
  background-color: white;
  width: 100%;

`;
const ImageDiv = styled.div`
  position: fixed;
`

const Index = () => {
  return (
    <div>
      <Head>
        <title>iorin.io</title>
        <meta name="description" content="行間への憧れ" />
      </Head>
      <main>
        <div>
          <Header />
        </div>
        <ImageDiv>
          <TopPhoto />
        </ImageDiv>
        <Hdiv>
          <Pages />
          <Works />
        </Hdiv>
      </main>
    </div>
  )
}

export default Index