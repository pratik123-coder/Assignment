import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useBlogById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      toast.loading('Loading...');
      try {
        const response = await fetch(`/api/blogs/${id}`);
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
    };

    fetchBlog();
  }, [id]);  // Dependency array to re-fetch if id changes 

  return { data, loading };
};

export default useBlogById;
