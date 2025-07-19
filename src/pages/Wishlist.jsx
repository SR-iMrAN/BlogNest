import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { FaHome, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Wishlist = () => {
  const { user, loading, axiosSecure } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);
  const [sorting, setSorting] = useState([]);

  // Fetch wishlist with enriched blog data
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
          setWishlist(res.data);
        } catch (error) {
          console.error('Failed to fetch wishlist:', error);
        }
      }
    };

    fetchWishlist();
  }, [user, axiosSecure]);

  // Remove item from wishlist
  const handleRemove = async (wishlistId) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${wishlistId}`);
      if (res.data.deletedCount > 0) {
        setWishlist((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
        Swal.fire('Deleted!', 'Blog removed from wishlist.', 'success');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire('Error', 'Failed to remove from wishlist.', 'error');
    }
  };

  // Table columns
  const columns = useMemo(() => [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Date', accessorKey: 'date' },
    {
      header: 'Actions',
      accessorKey: 'wishlistId',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/blog/${row.original.blogId}`} className="btn btn-sm btn-secondary">
            Details
          </Link>
          <button
            onClick={() => handleRemove(row.original._id)}
            className="btn btn-sm btn-outline btn-error flex items-center gap-1"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ], []);

  // Create table instance
  const table = useReactTable({
    data: wishlist,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading... <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Please log in to view your wishlist.
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center mt-10">
        <div className="flex justify-center">
          <DotLottieReact
            src="https://lottie.host/fa88d5f9-0d5c-43c6-bf2b-1a32e88c1700/BUB9irFCsJ.lottie"
            loop
            autoplay
            style={{ width: '300px', height: '300px' }}
          />
        </div>
        <p className="text-gray-500 mt-4 mb-4">No blogs found.</p>
        <Link to="/" className="btn btn-primary gap-2">
          <FaHome /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="py-2 px-4 text-left border-b border-gray-300 cursor-pointer"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : ''}
                    {header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 border-b border-gray-200">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
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
