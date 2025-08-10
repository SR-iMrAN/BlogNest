import { NavLink, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch(() => {});
  };

  const activeLink = 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1';
  const normalLink = 'hover:text-blue-600';

  const loggedOutLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
      <NavLink to="/all-blogs" className={({ isActive }) => isActive ? activeLink : normalLink}>All Blogs</NavLink>
      <NavLink to="/featured" className={({ isActive }) => isActive ? activeLink : normalLink}>Featured</NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
      <NavLink to="/all-blogs" className={({ isActive }) => isActive ? activeLink : normalLink}>All Blogs</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => isActive ? activeLink : normalLink}>Wishlist</NavLink>

      <div className="dropdown dropdown-hover">
  <label tabIndex={0} className="btn m-1">
    More <FiChevronDown size={14} />
  </label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><NavLink to="/add-blog">Add Blog</NavLink></li>
    <li><NavLink to="/featured">Featured</NavLink></li>
  </ul>
</div>

    </>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <div className='w-12 h-auto'>
            <img src="https://i.ibb.co/TD5R8z9R/Gemini-Generated-Image-iod9oiod9oiod9oi-removebg-preview-1.png" alt="Logo" />
          </div>
          <Link to="/" className="text-xl font-bold text-blue-700">BlogNest</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {user ? loggedInLinks : loggedOutLinks}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.photoURL || 'https://i.ibb.co/8d8hKt3/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-blue-500"
              />
              <button
                onClick={handleLogout}
                className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 gap-1"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 gap-1"
              >
                <FiLogIn />
                Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 gap-1"
              >
                <FiUserPlus />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow">
          <div className="flex flex-col gap-2">
            {user ? loggedInLinks : loggedOutLinks}
          </div>

          {user ? (
            <div className="flex items-center gap-2 mt-3">
              <img
                src={user.photoURL || 'https://i.ibb.co/8d8hKt3/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-blue-500"
              />
              <button
                onClick={handleLogout}
                className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 gap-1"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mt-3">
              <Link
                to="/auth/login"
                className="flex items-center text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 gap-1"
              >
                <FiLogIn />
                Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 gap-1"
              >
                <FiUserPlus />
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
