import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">BlogNest</h2>
          <p className="text-sm text-gray-600">
            Where ideas hatch and inspire. Explore blogs, share stories, and connect with creative minds.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/all-blogs" className="hover:text-blue-600">All Blogs</Link></li>
            <li><Link to="/featured" className="hover:text-blue-600">Featured</Link></li>
            <li><Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Contact</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Email: support@blognest.com</li>
            <li>Phone: +880-1234-567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
