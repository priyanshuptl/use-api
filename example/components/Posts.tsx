import * as React from 'react';
import useApi from '../..';
import { getPosts } from '../api';
import Post from './Post';

const Posts: React.FC = () => {
  const { response: posts, error, loading, refetch } = useApi(getPosts);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <p color="red">Error occured: {new String(error)}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      <section
        style={{
          height: '80vh',
          overflowY: 'auto',
          boxShadow: '1px 1px 4px',
        }}
      >
        {posts?.map(post => <Post key={post.title} post={post} />) || null}
      </section>
      <button
        style={{
          height: 'fit-content',
          padding: '8px',
          marginInline: '16px',
        }}
        onClick={refetch}
      >
        Refetch
      </button>
    </div>
  );
};

export default Posts;
