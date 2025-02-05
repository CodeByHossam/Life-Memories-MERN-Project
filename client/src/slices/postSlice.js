import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch data
export const fetchData = createAsyncThunk("post/fetchData", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/posts");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Ensures Redux handles it as a rejected state
  }
});

// Async thunk to create a new post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (newPostData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData), // Use newPostData here
      });

      if (!response.ok) {
        throw new Error(`Failed to create post. Status: ${response.status}`);
      }

      return await response.json(); // Return the created post
    } catch (error) {
      console.error("Error creating post:", error);
      return rejectWithValue(error.message); // Use rejectWithValue to pass custom error message
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    status: "idle", // loading, succeeded, failed
    error: null, // for error handling
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle createPost async actions
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload); // Add new post to the state
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Error message from rejectWithValue
      });
  },
});

export default postSlice.reducer;
