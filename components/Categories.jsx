import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services';
import { getTags } from '../services';

const Categories = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories </h3>
      {relatedPosts.map((post, index) => (
        <span>{post.tags}</span>
        ))}
    </div>
  )
}

export default Categories