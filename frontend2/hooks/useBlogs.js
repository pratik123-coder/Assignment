import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, ] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/blogs?page=${page}&pageSize=${pageSize}`);
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}. Response text: ${text}`);
      }

      const responseData = await res.json();
      setData(responseData.blogs);
      setTotalPages(Math.ceil(responseData.total / pageSize));
      setError(null);  
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      toast.error(`Error fetching blogs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return { loading, data, error, page, totalPages, setPage };
};

export default useBlogs;
