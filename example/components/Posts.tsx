import * as React from 'react';
import useApi from '../..';
import { getPosts } from '../api';
import Post from './Post';

const Posts: React.FC = () => {
  const { response: posts, error, loading } = useApi(getPosts);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <p color="red">Error occured: {new String(error)}</p>;
  }

  return (
    <section>
      {posts?.map(post => <Post key={post.title} post={post} />) || null}
    </section>
  );
};

export default Posts;
