import * as React from 'react';
import { Post as PostType } from '../api';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({
  post: { id, title, body, userId: _ },
}) => {
  return (
    <div
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 8px 0px',
        padding: '8px',
        marginBlock: '12px',
      }}
    >
      <h4>
        {id}: {title}
      </h4>
      <p>{body}</p>
    </div>
  );
};

export default Post;
