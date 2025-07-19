import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { FaCrown, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const FeaturedBlogs = () => {
  const { axiosSecure, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get('/blogs')
      .then(res => {
        const sorted = res.data
          .map(blog => ({
            ...blog,
            wordCount: blog?.long_description?.split(/\s+/).length || 0
          }))
          .sort((a, b) => b.wordCount - a.wordCount)
          .slice(0, 10);

        setBlogs(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [axiosSecure]);

  if (isLoading || loading) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-10">
        {/* Lottie on the left */}
        <div className="w-60">
          <DotLottieReact
            src="https://lottie.host/e3674a90-5276-4376-a115-13a299e1e072/DFWSk1JNhV.lottie"
            loop
            autoplay
          />
        </div>
        {/* DaisyUI loading dots */}
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Top 10 Featured Blogs
        </h2>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Word Count</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.authorName || 'N/A'}</td>
                <td>{blog.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="btn btn-outline btn-primary flex items-center gap-2">
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
