import Header from '@/components/Header';
import Head from 'next/head';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: relative;
    padding-left: 20px
`
const Margin = styled.div`
    margin-left: 20px;
    margin-right: 20px;
`
const H1 =styled.h1`
    color: #5d6869;
`
const A = styled.a`
    color: #97AAAB;
`

const Pages = () => {
    return (
        <Margin>
            <H1>Pages</H1>
            <StyledDiv>
                <p><A href='blog.iorin.io' target="_blank">Blog</A></p>
                <p><s><A href='/'>link2</A></s></p>
                <p><s><A href='/'>link3</A></s></p>
            </StyledDiv>
        </Margin>
    )
}

export default Pages;