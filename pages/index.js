import Head from 'next/head'
import ArticleList from '../components/ArticleList';


export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>WebDev Newz</title>
        <meta name='keywords' content='web development, programming' />
      </Head>

      <ArticleList articles={articles} />
    </div>
  )
}


export const getStaticProps = async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
    const articles = await res.json();
    return {
      props: {
        articles
      }
    }
  } catch (error) {
    const res = await fetch(`http://localhost:8000/data`);
    const articles = await res.json();
    return {
      props: {
        articles
      }
    }
  }
}