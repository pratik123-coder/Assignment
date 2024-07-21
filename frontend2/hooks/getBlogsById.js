import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const useBlogById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch blog data
  const fetchBlog = useCallback(async () => {
    setLoading(true);
    toast.loading('Loading...');
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${id}`);
      if (!response.ok) throw new Error('Blog not found');
      const result = await response.json();
      setData(result);
      toast.success('Blog loaded successfully!');
    } catch (error) {
      console.error(error);
      setData(null);
      toast.error('Error loading blog');
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { data, loading, refetch: fetchBlog };
};

export default useBlogById;
