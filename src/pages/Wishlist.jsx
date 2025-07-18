import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { FaHome, FaPlusCircle, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const Wishlist = () => {
  const { user, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const fetchWishlist = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get("http://localhost:3007/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    if (user) fetchWishlist();
    else navigate("/login");
  }, [user, loading, navigate]);

  const removeFromWishlist = async (blogId) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:3007/wishlist/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error removing blog from wishlist:", error);
    }
  };

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link to={`/blogs/${row.original._id}`} className="btn btn-info btn-sm">
            <FaInfoCircle /> Details
          </Link>
          <button
            onClick={() => removeFromWishlist(row.original._id)}
            className="btn btn-error btn-sm"
          >
            <FaTrashAlt /> Remove
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="flex justify-center">
          <DotLottieReact
            src="https://lottie.host/fa88d5f9-0d5c-43c6-bf2b-1a32e88c1700/BUB9irFCsJ.lottie"
            loop
            autoplay
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <p className="text-gray-500 mt-4 mb-4">No blogs found.</p>
        <Link to="/add-blog" className="btn btn-primary gap-2">
          <FaPlusCircle /> Add Blog
        </Link>
        <Link to="/" className="btn btn-secondary gap-2 ml-2">
          <FaHome /> Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border rounded">
          <thead className="bg-base-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
