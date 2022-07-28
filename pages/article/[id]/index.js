
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Article = ({ article }) => {
    // const router = useRouter();
    // const {id} = router.query;

    return ( 
        <>
            <Head>
                <title>Article - { article.title }</title>
            </Head>
            <h1>{ article.title }</h1>
            <p>{ article.body }</p>
            <br />
            <Link href='/'>Go Back</Link>
        </>
     );
}

export const getStaticProps = async (context) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
        const article = await res.json();
        return {
            props: {
                article
            }
        }
    } catch (error) {
        const res = await fetch(`http://localhost:8000/data/${context.params.id}`);
        const article = await res.json();
        return {
            props: {
                article
            }
        }
    }
}

export const getStaticPaths = async () => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const articles = await res.json();

        const ids = articles.map(article => article.id);

        const paths = ids.map(id => ({params: {id: id.toString()}}))

        return {
            paths,
            fallback: false
        }
    } catch (error) {
        const res = await fetch(`http://localhost:8000/data`);
        const articles = await res.json();

        const ids = articles.map(article => article.id);

        const paths = ids.map(id => ({params: {id: id.toString()}}))

        return {
            paths,
            fallback: false
        }
    }
}
 
export default Article;