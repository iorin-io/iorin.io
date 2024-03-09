import Header from "../components/Header";
//import Works from "@/components/Works";
//import Pages from "@/components/Pages";
import { css } from '../../styled-system/css';
import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Top",
}

const pageStyle = css({
  width: "100dvw",
  height: "100dvh",
  backgroundColor: "#ededed",
})

const Page = () => {
  return (
    <div className={pageStyle}>
      <div>
        <Header/>
      </div>
    </div>
  );
};

export default Page;
