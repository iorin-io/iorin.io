import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';
import Works from '@/contents/Works';
import Pages from '@/contents/Pages';
import Image from 'next/image'

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
          <Image
            src="/photo/IMG_1910.jpg"
            layout={"intrinsic"}
            width={1500}
            height={1000}
            alt="" />
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