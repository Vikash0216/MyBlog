import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/configure";



export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
    try {
        const posts = await service.getPosts()
        return posts

    } catch (error) {
        console.log("Posts fetched failed", error);
    }
})

export const fetchPost = createAsyncThunk("fetchPost", async (postId) => {
    try {
        const post = await service.getPost(postId)
        return post
    } catch (error) {
        console.log("Post fetched failed ", error);

    }
})
export const postSlice = createSlice({
    name: "posts",
    initialState: {
        isLoading: false,
        data: [],
        error: null,
        post: {}
    },
    reducers: {
        resetPost: (state) => {
            state.post = {}; // Reset post before fetching new data
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.error = null
        })
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.post = action.payload
            state.isLoading = false
            state.error = null
        })
        builder.addCase(fetchPost.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchPost.rejected, () => {
            state.error = action.error.message
        })
    }

}
)
export const {resetPost} = postSlice.actions
export default postSlice.reducer
