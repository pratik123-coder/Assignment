

const Newsletter = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex items-center space-x-4">
      <img
        src="https://example.com/path-to-your-image.png"
        alt="Newsletter"
        className="w-20 h-20"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          Subscribe to our newsletter to get the latest updates and news
        </h2>
        <div className="flex mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered flex-1"
          />
          <button className="btn btn-primary ml-2">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
