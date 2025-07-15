import { NavLink, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then(() => {}).catch(() => {});
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-blue-600'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/add-blog"
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-blue-600'
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/all-blogs"
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-blue-600'
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featured"
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-blue-600'
        }
      >
        Featured
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'hover:text-blue-600'
        }
      >
        Wishlist
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">BlogNest</Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.photoURL || 'https://i.ibb.co/8d8hKt3/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
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

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow">
          <div className="flex flex-col gap-2">{navLinks}</div>

          {user ? (
            <div className="flex items-center gap-2 mt-3">
              <img
                src={user.photoURL || 'https://i.ibb.co/8d8hKt3/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
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
