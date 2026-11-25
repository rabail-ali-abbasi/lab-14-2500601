
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: []
  },

  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1
        });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    setQty(state, action) {
      const { id, qty } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (!item) return;

      if (qty <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        item.qty = qty;
      }
    },

    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  setQty,
  clearCart
} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export const selectCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.qty,
    0
  );

export const selectTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

export default cartSlice.reducer;

