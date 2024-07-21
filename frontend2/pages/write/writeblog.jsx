import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubmitBlog from '../../hooks/useSubmit'; // Correct hook import

const BlogSubmission = () => {
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
    coverImage: null,
  });
  const { submitBlog, loading, error } = useSubmitBlog(); // Use the custom hook
  const navigate = useNavigate();

  // Retrieve user from local storage
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const handleFileChange = (e) => {
    setInputs({ ...inputs, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a blog.');
      navigate('/login');
      return;
    }

    try {
      await submitBlog(inputs);
      alert('Blog submitted successfully!');
      setInputs({
        title: '',
        body: '',
        coverImage: null,
      });
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center max-w-5xl mx-auto p-6'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-black'>Submit a Blog</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Title</span>
            </label>
            <input
              type='text'
              placeholder='Blog Title'
              className='w-full input input-bordered bg-slate-200 h-10'
              value={inputs.title}
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Body</span>
            </label>
            <textarea
              placeholder='Write your blog content here...'
              className='w-full textarea textarea-bordered bg-slate-200'
              rows='6'
              value={inputs.body}
              onChange={(e) => setInputs({ ...inputs, body: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Cover Image</span>
            </label>
            <input
              type='file'
              accept='image/*'
              className='file-input file-input-bordered bg-slate-200'
              onChange={handleFileChange}
            />
          </div>

          {error && <p className='text-red-500 mt-2'>{error}</p>}

          <div className='mt-2'>
            <button
              type='submit'
              className='btn btn-block btn-sm border border-slate-700'
              disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogSubmission;
