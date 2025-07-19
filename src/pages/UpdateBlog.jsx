import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaEdit, FaHome } from 'react-icons/fa';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, axiosSecure } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);

  // Load the lottie web component script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosSecure.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBlog = {
      title: form.title.value,
      image: form.image.value,
      category: form.category.value,
      shortDesc: form.shortDesc.value,
      longDesc: form.longDesc.value,
    };

    try {
      const res = await axiosSecure.put(`/blogs/${id}`, updatedBlog);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Blog has been updated successfully.', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <div
          dangerouslySetInnerHTML={{
            __html: `<dotlottie-wc src="https://lottie.host/2191667b-ed38-48db-8614-f9b6fc2494c2/6hW97PG2qC.lottie" style="width: 300px;height: 300px" speed="1" autoplay loop></dotlottie-wc>`,
          }}
        />
        <p className="text-lg text-gray-500">Loading blog data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border flex flex-col lg:flex-row gap-8">
      {/* Lottie Left Side */}
      <div
        className="hidden lg:block"
        dangerouslySetInnerHTML={{
          __html: `<dotlottie-wc src="https://lottie.host/2191667b-ed38-48db-8614-f9b6fc2494c2/6hW97PG2qC.lottie" style="width: 300px;height: 300px" speed="1" autoplay loop></dotlottie-wc>`,
        }}
      />

      {/* Form Right Side */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Update Blog</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={blog.title}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={blog.image}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select name="category" defaultValue={blog.category} className="select select-bordered w-full">
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="tech">Tech</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Short Description</label>
            <textarea
              name="shortDesc"
              defaultValue={blog.shortDesc}
              className="textarea textarea-bordered w-full"
              rows="2"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Long Description</label>
            <textarea
              name="longDesc"
              defaultValue={blog.longDesc}
              className="textarea textarea-bordered w-full"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center items-center gap-2"
          >
            Update Blog <FaEdit />
          </button>

          <Link
            to="/"
            className="btn btn-outline w-full flex justify-center items-center gap-2"
          >
            Back to Home <FaHome />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
