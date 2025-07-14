import { useEffect } from 'react';
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
} from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        className="bg-blue-50 py-16 px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
          <MdCampaign /> Welcome to BlogNest
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Where ideas hatch and inspire. Discover, write, and share your thoughts freely.
        </p>
      </motion.section>

      {/* Recent Blogs */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Recent Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="border p-4 rounded-lg shadow-sm">
              <img src={`https://source.unsplash.com/400x250/?blog,tech,${id}`} alt="Blog" className="rounded-md mb-3" />
              <h3 className="text-lg font-bold">Sample Blog Title {id}</h3>
              <p className="text-sm text-gray-600 mt-1">This is a short description of the blog post...</p>
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/blog/${id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Details
                </Link>
                <button className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200">Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-100 py-12 px-4 text-center"
      >
        <h2 className="text-xl font-semibold mb-2 flex justify-center items-center gap-2">
          <FaUserFriends /> Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-4">Stay updated with the latest blogs, categories, and announcements.</p>
        <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col md:flex-row gap-2">
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

      {/* Tips Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Tips for Better Blogging</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm">
          <div className="p-4 border rounded flex items-center gap-2">
            <FaRegLightbulb className="text-yellow-500" /> Keep titles short and impactful.
          </div>
          <div className="p-4 border rounded flex items-center gap-2">
            <FaImage className="text-blue-400" /> Use engaging visuals to boost attention.
          </div>
          <div className="p-4 border rounded flex items-center gap-2">
            <FaUserFriends className="text-green-500" /> Write like you’re speaking to a friend.
          </div>
        </div>
      </motion.section>

      {/* Community + Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-16 px-4"
      >
        {/* Community Join CTA */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2 flex justify-center items-center gap-2">
            <FaUserFriends /> Join Our Blogging Community
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-4">
            Become part of a passionate group of writers and readers. Share stories, gain insights, and grow your influence.
          </p>
          <div className="flex justify-center gap-4 text-blue-600 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-800"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-800"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-800"><FaLinkedinIn /></a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-800"><FaInstagram /></a>
          </div>
        </div>

        {/* Horizontal Review Slideshow */}
        <div className="max-w-4xl mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
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
