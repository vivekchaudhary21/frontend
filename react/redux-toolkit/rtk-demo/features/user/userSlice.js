import pkg from '@reduxjs/toolkit';
import axios from 'axios';

const { createSlice, createAsyncThunk } = pkg;

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data.map((user) => user.id);
});

const usersSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users = [];
      state.error = action.error.message;
    });
  },
});

const usersReducer = usersSlice.reducer;

export { usersReducer as default, fetchUsers };
