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
const Works = () => {
    return (
        <Margin>
            <H1>Works</H1>
            <StyledDiv>
                <p><A href='/'>Photo</A></p>
                <p><A href='/'>Movie</A></p>
                <p><A href='/'>Repository</A></p>
            </StyledDiv>
        </Margin>
    )
}

export default Works;