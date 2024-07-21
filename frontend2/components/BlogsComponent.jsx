import BlogCard from './BlogCards'; // Correct import if necessary
import useBlogs from '../hooks/useBlogs';

const BlogsComponent = () => {
  const { loading, data: blogs, error, page, totalPages, setPage } = useBlogs();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!blogs || blogs.length === 0) {
    return <p>No blogs found.</p>;
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const trimDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="p-14">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            imageSrc={blog.image}
            title={blog.title}
            description={blog.body} // Adjust if needed
            author={blog.author.name}
            date={trimDate(blog.date)} 
            id={blog.id}
            // Adjust if needed
            // Include other props if required
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogsComponent;
