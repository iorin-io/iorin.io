import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';
import Works from '@/contents/Works';
import Pages from '@/contents/Pages';
import TopPhoto from '@/components/Sakura2';



const Hdiv = styled.div`
  display: flex;
  position: sticky;
  bottom: 0px;
  background-color: #ebe7df;
  width: 100%;
  height: 300px;
  padding-left: 45px;
`;
const ImageDiv = styled.div`
  position: fixed;
`
const Bodydiv = styled.div`
  padding-top: 40px;
  h1 {
    text-align: center;
    font-size: 30px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
    padding-top: 20px
  }
  h2 {
    text-align: center;
    font-size: 20px;
    color: #897e6d;
    font-family: Courier;
    margin: 0px;
  }
  hr{
    border: 0;
    height: 1px;
    background: #897e6d;
    background-image: linear-gradient(to right, #ccc, #897e6d, #ccc);
    width: 80%;
  }
`

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
        <Bodydiv>
          <h1>iorin.io/blog</h1>
          <h2>まわりみち</h2>
          <hr />
        </Bodydiv>

      </main>
    </div>
  )
}

export default Index