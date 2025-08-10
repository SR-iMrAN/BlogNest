import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRegLightbulb,
  FaImage,
  FaUserFriends,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPlusCircle,
} from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination ,Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './../firebase/firebase.config';
 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let headers = {};

        if (user) {
          const token = await user.getIdToken();
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch('https://blog-nest-server-two.vercel.app/blogs', {
          headers,
        });

        if (!res.ok) throw new Error('Failed to fetch blogs');

        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, [user]);

  const handleAddToWishlist = async (blog) => {
    if (!user) {
      toast.error('You must be logged in to add to wishlist.');
      return;
    }

    try {
      const token = await user.getIdToken();

      const res = await fetch('https://blog-nest-server-two.vercel.app/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: user.email,
          blogId: blog._id,
          title: blog.title,
          author: blog.author || 'Unknown',
          category: blog.category || 'Uncategorized',
          date: blog.date || new Date().toISOString(),
          image: blog.image || '',
        }),
      });

      if (!res.ok) throw new Error('Failed to add to wishlist');

      toast.success('Added to wishlist');
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error('Failed to add to wishlist might be already in wishlist.');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left side Lottie animation */}
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <DotLottieReact
              src="https://lottie.host/43cd62ad-d59b-4d03-b075-7ed99cc08091/drK9RICI4Q.lottie"
              loop
              autoplay
              style={{ width: '300px', height: '300px' }}
            />
          </div>

          {/* Right side texts */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-left md:items-start px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 flex items-center whitespace-nowrap gap-2">
              <MdCampaign /> Welcome to BlogNest
            </h1>
            <p className="text-gray-600 max-w-md">
              Where ideas hatch and inspire. Discover, write, and share your thoughts freely.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Recent Blogs */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
          <FaRegLightbulb /> Recent Blogs
        </h2>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((blog, index) => (
              <div
                key={blog._id || index}
                className="border p-4 rounded-xl shadow-md bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={blog.image || `https://source.unsplash.com/400x250/?blog,tech,${index}`}
                  alt="Blog"
                  className="rounded-md mb-3 h-48 w-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {blog.shortDesc?.slice(0, 100) || 'No description'}...
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-info btn-sm text-white flex items-center gap-1"
                  >
                    <FaRegLightbulb /> Details
                  </Link>
                  <button
                    onClick={() => handleAddToWishlist(blog)}
                    className="btn btn-outline btn-sm btn-warning flex items-center gap-1"
                  >
                    <FaPlusCircle /> Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center">
              <DotLottieReact
                src="https://lottie.host/fa88d5f9-0d5c-43c6-bf2b-1a32e88c1700/BUB9irFCsJ.lottie"
                loop
                autoplay
                style={{ width: '300px', height: '300px' }}
              />
            </div>
            <p className="text-gray-500 mt-4 mb-4">No blogs found.</p>
            <Link to="/add-blog" className="btn btn-primary gap-2">
              <FaPlusCircle /> Add Blog
            </Link>
          </div>
        )}
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 px-4 text-center"
      >
        <h2 className="text-xl font-semibold mb-2 flex justify-center items-center gap-2">
          <FaUserFriends /> Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-4 max-w-xl mx-auto">
          Stay updated with the latest blogs, categories, and announcements.
        </p>

        {/* Lottie Animation */}
        <div className="flex justify-center mb-6">
          <DotLottieReact
            src="https://lottie.host/a8536afe-778a-4d2d-93da-85f7dc7db23f/JRjRoRWOq7.lottie"
            loop
            autoplay
            style={{ width: '200px', height: '200px' }}
          />
        </div>

        <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            placeholder="Your email"
            className="flex-1 px-4 py-2 border rounded"
          />
          <select required className="px-4 py-2 border rounded text-gray-500">
            <option value="">Select Category</option>
            <option value="tech">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </motion.section>

      {/* Tips Section with animations */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center flex justify-center items-center gap-2">
          <FaRegLightbulb /> Tips for Better Blogging
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm">
          {[
            {
              icon: <FaRegLightbulb className="text-yellow-500" />,
              text: 'Keep titles short and impactful.',
            },
            {
              icon: <FaImage className="text-blue-400" />,
              text: 'Use engaging visuals to boost attention.',
            },
            {
              icon: <FaUserFriends className="text-green-500" />,
              text: 'Write like you’re speaking to a friend.',
            },
          ].map(({ icon, text }, idx) => (
            <motion.div
              key={idx}
              className="p-4 border rounded flex items-center gap-3 cursor-pointer bg-white shadow-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl">{icon}</div>
              <span>{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Community + Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-22 px-4"
      >
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">
            <FaUserFriends /> Join Our Blogging Community
          </h2>
          <p className="text-gray-700 mb-6">
            Become part of a passionate group of writers and readers. Share stories, gain insights, and grow your influence.
          </p>
          <div className="flex justify-center gap-6 text-blue-600 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-800">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-800">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-800">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-800">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Horizontal Review Slideshow */}
        <div className="max-w-5xl mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
             autoplay={{ delay: 3000, disableOnInteraction: false }} 
  modules={[Pagination, Autoplay]}
          
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <SwiperSlide key={id}>
                <div className="bg-white border rounded-lg p-6 shadow-md text-center h-full flex flex-col justify-between">
                  <p className="text-gray-700 italic mb-4">
                    “BlogNest is the perfect platform for sharing your thoughts. The UI is smooth, and it's fun to write again!”
                  </p>
                  <div>
                    <h4 className="font-semibold text-blue-600">User {id}</h4>
                    <p className="text-xs text-gray-500">Verified Blogger</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
