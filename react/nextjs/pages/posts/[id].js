import React from 'react';
import { useRouter } from 'next/router';

const Post = ({ post }) => {
  // line number 7-9 is required if fallback is true in getStaticPaths
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>Post By User: {post.id}</h1>
      <h2>{post.title}</h2>
      <h3>{post.body}</h3>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await response.json();

  const paths = posts.slice(0, 5).map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  if (!post.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
}
