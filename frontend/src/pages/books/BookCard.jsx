import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineHeart } from "react-icons/hi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addToFavorites } from "../../redux/features/favorite/favorites";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(book));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <Link to={`/books/${book._id}`} className="block">
        <img
          src={getImgUrl(book?.coverImage)}
          alt={book?.title}
          className="w-full h-56 object-cover object-center rounded-t-xl hover:scale-105 transition-transform duration-200"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link
          to={`/books/${book._id}`}
          className="text-lg font-bold text-gray-800 hover:text-blue-600 line-clamp-1 mb-1"
        >
          {book?.title}
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {book?.description}
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-black font-bold text-lg">
            Rs {book?.newPrice}
          </span>
          {book?.oldPrice !== null && book?.oldPrice !== undefined && (
            <span className="text-gray-400 line-through text-base">
              Rs {book.oldPrice}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleAddToFavorites}
            className="flex-1 btn-primary hover:bg-indigo-200 font-semibold px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <HiOutlineHeart />
            <span>Favorite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
