import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';
import Works from '@/contents/Works';
import Pages from '@/contents/Pages';
import Image from "next/legacy/image"
import { TopPhoto } from '@/components/Photo';

const Hdiv = styled.div`
  display: flex;
  position: sticky;
  bottom: 0px;
  background-color: white;
  width: 100%;
  height: 300px;
`;
const ImageDiv = styled.div`
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