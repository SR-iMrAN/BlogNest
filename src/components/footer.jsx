import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10  border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex gap-3 items-center">
            <div className="w-12">
              <img
                src="https://i.ibb.co/TD5R8z9R/Gemini-Generated-Image-iod9oiod9oiod9oi-removebg-preview-1.png"
                alt="BlogNest Logo"
                className="object-contain"
              />
            </div>
            <Link to="/" className="text-2xl font-bold text-blue-700 hover:underline">
              BlogNest
            </Link>
          </div>
          <p className="text-sm text-gray-600 max-w-xs">
            Where ideas hatch and inspire. Explore blogs, share stories, and connect with creative minds.
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 text-gray-600">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-blogs" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                All Blogs
              </Link>
            </li>
            <li>
              <Link to="/featured" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                Featured
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold mb-4">Contact</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Email: <a href="mailto:support@blognest.com" className="hover:underline">support@blognest.com</a></li>
            <li>Phone: <a href="tel:+8801234567890" className="hover:underline">+880-1234-567890</a></li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <hr className="max-w-7xl mx-auto my-8 border-gray-300" />

      <div className="text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
