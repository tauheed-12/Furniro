import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility to get token from localStorage
const getToken = () => localStorage.getItem("token") || "";
const getUserId = () => localStorage.getItem("userId") || "";
// --- Async Thunks ---

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const userId = getUserId();
        const response = await axios.post('http://localhost:8080/product/cartProduct', { userId }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, thunkAPI) => {
    try {
        const response = await axios.post('/api/cart', item, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
});

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (itemId, thunkAPI) => {
    try {
        await axios.delete(`/api/cart/${itemId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return itemId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete from cart');
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
    try {
        await axios.delete('/api/cart/clear', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return [];
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
});

// --- Initial State ---

const initialState = {
    items: [],
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// --- Slice ---

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // FETCH CART
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // ADD TO CART
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const item = action.payload;
                const existingItem = state.items.find(i => i.id === item.id);
                if (existingItem) {
                    existingItem.quantity = item.quantity;
                } else {
                    state.items.push(item);
                }
                state.status = 'succeeded';
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // DELETE FROM CART
            .addCase(deleteFromCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                const itemId = action.payload;
                state.items = state.items.filter(item => item.id !== itemId);
                state.status = 'succeeded';
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // CLEAR CART
            .addCase(clearCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.status = 'succeeded';
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// --- Export Reducer ---
export default cartSlice.reducer;
