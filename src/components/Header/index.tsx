import Head from 'next/head';
import Link from 'next/link'
import styled from 'styled-components';

const Header = () => {
    return (
        <header className="border-b flex items-center h-14 px-4">
            <h1>
                <Link href="/" legacyBehavior>
                  <a className="text-2xl font-logo">iam</a>
                </Link>
              </h1>
            </header>
    )

}

export default Header;