import Head from 'next/head'
import { PostCard, PostWidget } from '../components';
import { getPosts } from '../services'
import MetaTags from 'react-meta-tags'; 

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <MetaTags>
        <title>Home</title>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="Home" />
        <meta property="og:image" content="https://cdn.donmai.us/sample/5d/2f/__kitagawa_marin_sono_bisque_doll_wa_koi_wo_suru_drawn_by_nonbire__sample-5d2f62793c8328d6e94e12a1a0cdc679.jpg" />
      </MetaTags>
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