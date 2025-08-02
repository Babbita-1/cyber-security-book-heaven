import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Migrate existing items to have quantity
      return {
        cartItems: parsedCart.map(item => ({
          ...item,
          quantity: item.quantity || 1
        }))
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return { cartItems: [] };
};

const initialState = loadCartFromStorage();

// Save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1
        });
        saveCartToStorage(state.cartItems);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added to the Cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else
        Swal.fire({
          title: "Already Added to the Cart",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK!",
        });
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.cartItems);
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      saveCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
  },
});

// export the actions
export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  incrementQuantity, 
  decrementQuantity 
} = cartSlice.actions;
export default cartSlice.reducer;
