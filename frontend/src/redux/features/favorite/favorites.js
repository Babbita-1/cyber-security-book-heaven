import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added to Favorites",
          showConfirmButton: false,
          timer: 1500,
        });
      } else
        Swal.fire({
          title: "Already Added to the Favorites",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK!",
        });
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearItem: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearItem } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
