import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Cookie Helpers ---
const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};
// --- Async Thunks ---

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const userId = getCookie("userId");
        console.log("Fetching cart for userId:", getCookie('token'), userId);
        const response = await axios.post('http://localhost:8080/product/cartProduct', { userId }, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8080/product/addCart', { userId: getCookie("userId"), ...item }, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
});

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (productId, thunkAPI) => {
    try {
        await axios.post(`http://localhost:8080/product/removeCart`, { userId: getCookie("userId"), productId }, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        });
        return productId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete from cart');
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
    try {
        await axios.delete('/api/cart/clear', {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
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
