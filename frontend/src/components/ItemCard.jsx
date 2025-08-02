import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/features/favorite/favorites";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.find((fav) => fav.id === item.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.author}</p>

      <button
        onClick={handleToggleFavorite}
        className={`mt-2 text-sm px-4 py-1 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default ItemCard;
