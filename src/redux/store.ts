import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "../slices/bookListSlice";
import searchInputSlice from "../slices/searchSlice";

export const store = configureStore({
	reducer: {
		bookListSlice,
		searchInputSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
