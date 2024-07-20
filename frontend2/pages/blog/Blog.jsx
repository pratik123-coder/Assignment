// src/pages/blog/Blog.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Blog = () => {
	const { id } = useParams(); // Get the id from the URL
	const [blog, setBlog] = useState(null);
  const { loading, data } = useBlogById(id);
  setBlog(data);
	if (loading) return <div>Loading...</div>;

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>{blog.title}</h1>
			<p className='mt-2'>{blog.content}</p>
		</div>
	);
};

export default Blog;
