import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* ---------------- Cookie Helper ---------------- */
const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

/* ---------------- Thunks ---------------- */

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const userId = getCookie('userId');
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/product/cartProduct`,
                { userId },
                { headers: { Authorization: `Bearer ${getCookie('token')}` } }
            );
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch cart'
            );
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (item, thunkAPI) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/product/addCart`,
                { userId: getCookie('userId'), ...item },
                { headers: { Authorization: `Bearer ${getCookie('token')}` } }
            );
            return res.data; // backend message
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to add to cart'
            );
        }
    }
);

export const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async (cartId, thunkAPI) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/product/removeCart`,
                { cartId },
                { headers: { Authorization: `Bearer ${getCookie('token')}` } }
            );
            return cartId;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to delete item'
            );
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, thunkAPI) => {
        try {
            const userId = getCookie('userId');
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/product/clearCart`,
                { userId },
                { headers: { Authorization: `Bearer ${getCookie('token')}` } }
            );
            return true;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to clear cart'
            );
        }
    }
);

/* ---------------- Initial State ---------------- */

const initialState = {
    items: [],
    fetchStatus: 'idle',
    addStatus: 'idle',
    deleteStatus: 'idle',
    clearStatus: 'idle',
    error: null,
};

/* ---------------- Slice ---------------- */

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetAddStatus: (state) => {
            state.addStatus = 'idle';
        },
        resetDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        },
        resetClearStatus: (state) => {
            state.clearStatus = 'idle';
        },
        resetFetchStatus: (state) => {
            state.fetchStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder

            /* FETCH CART */
            .addCase(fetchCart.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload;
            })

            /* ADD TO CART */
            .addCase(addToCart.pending, (state) => {
                state.addStatus = 'loading';
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.addStatus = 'succeeded';
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.payload;
            })

            /* DELETE FROM CART */
            .addCase(deleteFromCart.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.items = state.items.filter(
                    (item) => item.cart_id !== action.payload
                );
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload;
            })

            /* CLEAR CART */
            .addCase(clearCart.pending, (state) => {
                state.clearStatus = 'loading';
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.clearStatus = 'succeeded';
                state.items = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.clearStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetAddStatus } = cartSlice.actions;
export default cartSlice.reducer;
