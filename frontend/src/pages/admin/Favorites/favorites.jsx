import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearItem,
  removeFromFavorites,
} from "../../../redux/features/favorite/favorites";
import { getImgUrl } from "../../../utils/getImgUrl";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemove = (bookId) => {
    dispatch(removeFromFavorites({ _id: bookId }));
  };

  const handleClear = () => {
    dispatch(clearItem());
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Favorites</h2>
          {favorites.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200"
            >
              Clear Favorites
            </button>
          )}
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((book) => (
              <div
                key={book?._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                <Link to={`/books/${book._id}`} className="block">
                  <img
                    alt={book?.title}
                    src={getImgUrl(book?.coverImage)}
                    className="w-full h-56 object-cover object-center hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/books/${book._id}`} className="text-lg font-bold text-gray-800 hover:text-blue-600 line-clamp-1">
                      {book?.title}
                    </Link>
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ml-2">
                      {book?.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{book?.description}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-black font-bold text-lg">Rs {book?.newPrice}</span>
                    {book.oldPrice && book.oldPrice > book.newPrice && (
                      <span className="text-gray-400 line-through text-base">Rs {book.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(book._id)}
                    type="button"
                    className="mt-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No favorites" className="w-32 h-32 mb-6 opacity-70" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites found!</h3>
            <p className="text-gray-500 mb-4">Browse books and add your favorites here.</p>
            <Link to="/books" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200">
              Browse Books
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
