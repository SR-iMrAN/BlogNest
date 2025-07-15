import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiFileText, FiImage, FiList, FiEdit3 } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

const AddBlog = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Blog Data:", data);
    toast.success("Blog added (mock) — ready for backend!");
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-10 px-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
        <FiFileText /> Add a New Blog
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 shadow-md rounded-lg">

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FiEdit3 /> Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter blog title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FiImage /> Image URL
          </label>
          <input
            {...register("image", { required: "Image URL is required" })}
            className="w-full border px-4 py-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <BiCategory /> Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border px-4 py-2 rounded text-gray-500"
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FiList /> Short Description
          </label>
          <textarea
            {...register("shortDesc", { required: "Short description is required" })}
            className="w-full border px-4 py-2 rounded"
            rows={2}
            placeholder="A short summary of your blog..."
          ></textarea>
          {errors.shortDesc && <p className="text-red-500 text-sm">{errors.shortDesc.message}</p>}
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FiList /> Long Description
          </label>
          <textarea
            {...register("longDesc", { required: "Long description is required" })}
            className="w-full border px-4 py-2 rounded"
            rows={5}
            placeholder="Full content of your blog..."
          ></textarea>
          {errors.longDesc && <p className="text-red-500 text-sm">{errors.longDesc.message}</p>}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-outline btn-primary px-6">
            <FiFileText className="mr-2" /> Submit Blog
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default AddBlog;
