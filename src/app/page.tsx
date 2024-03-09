import Header from "../components/Header";
//import Works from "@/components/Works";
//import Pages from "@/components/Pages";
import Image from "next/image";
import TopPhoto from "../../public/photo/mttsukuba.webp";
import { css } from '../../styled-system/css';
import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Top",
}

const pageStyle = css({
  display: "flex",
  position: "sticky",
  bottom: "0px",
  background: "#ebe7df",
  width: "100%",
  height: "300px",
  paddingLeft: "45px",
})

const fixStyle = css({
  position: "fixed",
})

const Page = () => {
  return (
    <div>
      現在改修中です！
    </div>
  );
};

export default Page;
