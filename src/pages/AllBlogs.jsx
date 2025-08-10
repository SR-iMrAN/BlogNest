import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { Metronome } from 'ldrs/react';
import 'ldrs/react/Metronome.css';

const AllBlogs = () => {
  const { user, axiosSecure } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        Swal.fire('Error', 'Failed to fetch categories', 'error');
      });
  }, [axiosSecure]);

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm.trim() !== '') params.append('search', searchTerm.trim());
      if (category.trim() !== '') params.append('category', category.trim());
      const url = `/blogs?${params.toString()}`;

      axiosSecure.get(url)
        .then(res => {
          setBlogs(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch blogs:', err);
          Swal.fire('Error', 'Failed to fetch blogs', 'error');
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, category, axiosSecure]);

  const handleWishlist = async (blog) => {
    if (!user) {
      return Swal.fire('Login Required', 'Please log in to add to wishlist', 'info');
    }

    const wishItem = {
      blogId: blog._id,
      title: blog.title,
      author: blog.author || 'Anonymous',
      image: blog.image,
        category: blog.category,
         date: blog.date || new Date().toISOString(),
      userEmail: user.email
    };

    try {
      const res = await axiosSecure.post('/wishlist', wishItem);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Blog added to wishlist!', 'success');
      }
    } catch (err) {
      Swal.fire('Oops', err.response?.data?.message || 'Failed to add to wishlist', 'error');
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">All Blogs</h2>

      <div className="flex gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <Metronome size="40" speed="1.6" color="#2563eb" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="border rounded-xl p-4 shadow-md flex flex-col justify-between">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 object-cover w-full rounded-xl mb-3"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 my-2">{blog.shortDesc}</p>
              <span className="text-xs btn btn-sm btn-soft btn-primary my-1">{blog.category}</span>
              <div className="flex justify-between mt-4">
                <Link to={`/blog/${blog._id}`} className="btn btn-dash btn-secondary">Details</Link>
                <button
                  className="btn btn-outline btn-warning"
                  onClick={() => handleWishlist(blog)}
                  disabled={!user}
                  title={!user ? 'Log in to add wishlist' : undefined}
                >
                  <FaHeart className="text-red-500 mr-1" /> Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
