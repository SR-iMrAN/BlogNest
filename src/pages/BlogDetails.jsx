import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaPaperPlane, FaEdit, FaHome } from 'react-icons/fa';

const BlogDetails = () => {
  const { id } = useParams();
  const { axiosSecure, user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axiosSecure.get(`/blogs/${id}`);
        setBlog(blogRes.data);

        const commentRes = await axiosSecure.get(`/comments?blogId=${id}`);
        setComments(commentRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, [axiosSecure, id]);

  const handleComment = async () => {
    if (!comment.trim()) return;

    const commentData = {
      blogId: id,
      comment,
      name: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      date: new Date(),
    };

    try {
      const res = await axiosSecure.post('/comments', commentData);
      if (res.data.insertedId) {
        setComments([...comments, commentData]);
        setComment('');
      }
    } catch (error) {
      console.error('Comment post failed:', error);
    }
  };

  const isBlogOwner = blog?.userEmail === user?.email;

  if (!blog) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-ring loading-lg"></span>
        <p className="text-gray-500 mt-4 mb-4">No blogs found.</p>
        <Link to="/" className="btn btn-primary gap-2">
          <FaHome /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
        <img src={blog.image} alt={blog.title} className="w-full rounded-xl" />
        <h2 className="text-3xl font-bold">{blog.title}</h2>
        <p className="text-sm text-gray-500">By {blog.author}</p>
        <p className="text-gray-700">Category: {blog.category}</p>
        <p className="text-gray-600">{new Date(blog.date).toLocaleString()}</p>
        <p className="text-base text-gray-800">{blog.description}</p>

        {isBlogOwner && (
          <button
            onClick={() => navigate(`/update/${blog._id}`)}
            className="btn btn-outline btn-primary mt-4 flex items-center gap-2"
          >
            <FaEdit /> Update Blog
          </button>
        )}
      </div>

      <div className="bg-base-100 mt-10 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        {isBlogOwner ? (
          <p className="text-warning">You cannot comment on your own blog.</p>
        ) : (
          <div className="space-y-4">
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Write your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={handleComment}
              className="btn btn-success flex items-center gap-2"
            >
              <FaPaperPlane /> Post Comment
            </button>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-4 items-start">
              <img
                src={c.photoURL}
                alt={c.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-gray-700">{c.comment}</p>
                <p className="text-xs text-gray-400">
                  {new Date(c.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
