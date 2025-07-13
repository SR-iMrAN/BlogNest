import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthProvider';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const { user, logOut } = useContext(AuthContext);
  const user = null;

  const handleLogout = () => {
    // logOut().then(() => {}).catch(() => {});
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

        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src="https://i.ibb.co/8d8hKt3/default-avatar.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50"
              >
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
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {navLinks}
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src="https://i.ibb.co/8d8hKt3/default-avatar.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
