import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineHeart } from "react-icons/hi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addToFavorites } from "../../redux/features/favorite/favorites";

const SliderBookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(book));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 p-2 h-full flex flex-col">
      {/* Image section */}
      <div className="flex justify-center mb-3">
        <Link to={`/books/${book._id}`} className="block w-32 h-44">
          <img
            src={getImgUrl(book?.coverImage)}
            alt={book?.title}
            className="w-full h-full object-contain rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col">
        <Link to={`/books/${book._id}`}>
          <h3
            className="text-base font-semibold hover:text-blue-600 mb-2 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.5rem",
            }}
          >
            {book?.title}
          </h3>
        </Link>

        <p
          className="text-gray-600 text-xs mb-2 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2rem",
          }}
        >
          {book?.description}
        </p>

        <div className="mt-auto">
          <p className="font-medium mb-2 text-sm">
            <span className="text-black">Rs {book?.newPrice}</span>{" "}
            {book?.oldPrice !== null && book?.oldPrice !== undefined && (
              <span className="line-through font-normal ml-2 text-xs text-gray-500">
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
              className="btn-primary px-2 py-1 text-xs flex items-center justify-center"
            >
              <HiOutlineHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBookCard;
