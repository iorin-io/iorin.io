import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>My Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <h1>Welcome to my website!</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Check out my latest blog post</h2>
        <article>
          <h3>My first blog post</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </article>
      </main>
      <footer>
        <p>&copy; 2023 My Website</p>
      </footer>
    </>
  );
}

export default HomePage;
