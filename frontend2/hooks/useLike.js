import { useState } from 'react';

const useLike = (initialLikes, id) => {
  const [likes, setLikes] = useState(initialLikes);

  const likeBlog = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/blogs/${id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error('Failed to like the blog');
      }
    } catch (error) {
      console.error('Failed to like the blog', error);
    }
  };

  return { likes, likeBlog };
};

export default useLike;
