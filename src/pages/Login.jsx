import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { signIn, setUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        if (from === "/") {
          Swal.fire({
            title: 'Login Successful',
            text: `Welcome back, ${user.displayName || 'User'}!`,
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: 'Go Home',
            denyButtonText: 'Stay Here',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/", { replace: true });
            }
            
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome back, ${user.displayName || 'User'}!`,
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);

        if (from === "/") {
          Swal.fire({
            title: 'Login Successful',
            text: `Welcome, ${user.displayName || 'User'}!`,
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: 'Go Home',
            denyButtonText: 'Stay Here',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/", { replace: true });
            }
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome, ${user.displayName || 'User'}!`,
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        toast.error(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FcGoogle className="text-xl" style={{ marginRight: '8px' }} />
            Google Login Failed
          </div>,
          { autoClose: 3000 }
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr  flex items-center justify-center px-4">
      
      <div className="dark:bg-green-300 rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold my-4 text-center text-gray-800">Login!</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-right mt-1">
                <Link
                  to={`/auth/forgot-password?email=${formData.email || ''}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="checkbox checkbox-sm mr-2" />
              <span className="text-sm">Remember me</span>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">or login with</div>

          <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="text-sm text-center mt-4">
            Need an account?{' '}
            <Link to="/auth/register" className="text-violet-600 hover:underline">
              Register
            </Link>
          </div>
        </div>

        {/* Right: Image/Illustration */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.ibb.co/VYR5Y7gP/Flux-Dev-A-user-interacting-with-a-simple-illustrated-plant-on-3.jpg')`,
            backgroundColor: '#fff',
          }}
        />
      </div>
    </div>
  );
};

export default Login;
