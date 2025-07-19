import { useEffect, useMemo, useState, useContext } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { AuthContext } from '../provider/AuthProvider';
import { FaSort, FaSortUp, FaSortDown, FaCrown, FaHome } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const FeaturedBlogs = () => {
  const { axiosSecure, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    axiosSecure.get('/blogs')
      .then(res => {
        const sorted = res.data
          .map(blog => ({
            ...blog,
            wordCount: blog?.long_description?.split(/\s+/).length || 0
          }))
          .sort((a, b) => b.wordCount - a.wordCount)
          .slice(0, 10);

        setBlogs(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [axiosSecure]);

  const columns = useMemo(() => [
    {
      header: '#',
      accessorFn: (_row, i) => i + 1,
      id: 'index',
      cell: info => info.getValue()
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Author',
      accessorKey: 'authorName',
    },
    {
      header: 'Word Count',
      accessorKey: 'wordCount',
    }
  ], []);

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  if (isLoading || loading) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-10">
        <div className="w-60">
          <DotLottieReact
            src="https://lottie.host/e3674a90-5276-4376-a115-13a299e1e072/DFWSk1JNhV.lottie"
            loop
            autoplay
          />
        </div>
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Top 10 Featured Blogs
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-base-200 text-base font-semibold">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-1 inline-block">
                        {isSorted === 'asc' ? <FaSortUp /> : isSorted === 'desc' ? <FaSortDown /> : <FaSort />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="btn btn-outline btn-primary flex items-center gap-2">
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
