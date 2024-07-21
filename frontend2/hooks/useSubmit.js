import { useState } from 'react';

const useSubmitBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitBlog = async (inputs) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('body', inputs.body);
    if (inputs.coverImage) {
      formData.append('coverImage', inputs.coverImage);
    }

    try {
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Response text: ${text}`);
      }

      await response.json();
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message);
      throw error; // Re-throw error for handling in component
    } finally {
      setLoading(false);
    }
  };

  return { submitBlog, loading, error };
};

export default useSubmitBlog;
