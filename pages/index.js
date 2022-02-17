import Head from 'next/head'
import { PostCard, PostWidget } from '../components';
import { getPosts } from '../services'
import Helmet from 'react-helmet'

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Helmet>
        <title>HomePage</title>
        <meta content="Embed Title" property="og:title" />
        <meta content="Site Description" property="og:description" />
        <meta content="https://blog-graph.vercel.app" property="og:url" />
        <meta content="https://cdn.donmai.us/sample/5d/2f/__kitagawa_marin_sono_bisque_doll_wa_koi_wo_suru_drawn_by_nonbire__sample-5d2f62793c8328d6e94e12a1a0cdc679.jpg" property="og:image" />
        <meta content="#43B581" data-react-helmet="true" name="theme-color" />
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget /> 
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}