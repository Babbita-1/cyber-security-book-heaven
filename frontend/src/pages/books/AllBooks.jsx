import React, { useState, useEffect } from 'react';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineHeart } from "react-icons/hi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addToFavorites } from "../../redux/features/favorite/favorites";
import Loading from '../../components/Loading';

// Custom BookGridCard component specifically for the grid layout
const BookGridCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(book));
  };

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="p-3 flex-1 flex flex-col">
        <div className="mb-3 flex justify-center">
          <Link to={`/books/${book._id}`} className="block w-32 h-44">
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title}
              className="w-full h-full object-contain hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-base font-semibold hover:text-blue-600 mb-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {book?.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-xs mb-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {book?.description}
          </p>
          
          <div className="mt-auto">
            <p className="font-medium mb-2 text-sm">
              <span className="text-black">Rs {book?.newPrice}</span>{" "}
              {book?.oldPrice !== null && book?.oldPrice !== undefined && (
                <span className="line-through font-normal text-gray-500 ml-1 text-xs">
                  Rs {book.oldPrice}
                </span>
              )}
            </p>
            
            <div className="flex gap-1">
              <button
                onClick={handleAddToCart}
                className="btn-primary px-2 py-1 text-xs flex items-center justify-center flex-1"
              >
                <FiShoppingCart className="mr-1" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleAddToFavorites}
                className="btn-primary px-1 py-1 text-xs flex items-center justify-center"
              >
                <HiOutlineHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllBooks = () => {
  const { data: books, isLoading, isError } = useFetchAllBooksQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const booksPerPage = 9; // 9 books per page (3 rows x 3 columns)

  // Initialize filteredBooks when books data is loaded
  useEffect(() => {
    if (books) {
      setFilteredBooks(books);
    }
  }, [books]);

  // Extract unique categories from books
  const categories = books ? ['all', ...new Set(books.map(book => book.category))] : ['all'];

  // Filter and sort books
  useEffect(() => {
    if (books) {
      // First filter by category
      let filtered = selectedCategory === 'all'
        ? [...books]
        : books.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());
      
      // Then sort based on selected option
      switch (sortOption) {
        case 'price-low-high':
          filtered.sort((a, b) => a.newPrice - b.newPrice);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.newPrice - a.newPrice);
          break;
        case 'title-a-z':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-z-a':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          // Default sorting (newest first based on createdAt)
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      setFilteredBooks(filtered);
      setCurrentPage(1); // Reset to first page when changing filters or sorting
    }
  }, [selectedCategory, sortOption, books]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Error</h2>
        <p className="text-red-500">An error occurred while fetching books</p>
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">All Books</h1>
      
      {/* Filters and Sorting */}
      <div className="mb-8 grid md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sorting Options */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="default">Newest First</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="title-a-z">Title: A to Z</option>
            <option value="title-z-a">Title: Z to A</option>
          </select>
        </div>
      </div>
      
      {filteredBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentBooks.map((book) => (
              <BookGridCard key={book._id} book={book} />
            ))}
          </div>
          
          {/* Book count */}
          <p className="text-gray-600 mt-8 mb-4">
            Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, filteredBooks.length)} of {filteredBooks.length} books
          </p>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 border-t border-b ${
                      currentPage === number + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-md border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No books available in this category</p>
      )}
    </div>
  );
};

export default AllBooks; 