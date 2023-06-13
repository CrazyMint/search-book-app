import {
	PayloadAction,
	Slice,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { getBooks } from "../apis/api";

interface BookListState {
	books: Object[];
	wishedbooks: Object[];
	isPending: boolean;
}

const initialState: BookListState = {
	books: [],
	wishedbooks: [],
	isPending: false,
};

export const searchBookList = createAsyncThunk(
	"bookListSlice/searchBookList",
	async (searchInput: string, thunkAPI) => {
		return await getBooks(searchInput)
			.then((data) => data.items)
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	}
);

export const bookListSlice: Slice = createSlice({
	name: "bookList",
	initialState,
	reducers: {
		updateBookList: (state, action) => {
			state.books = action.payload;
		},
		addToWishList: (state, action: PayloadAction<BookListState>) => {
			const id = action.payload;
			if (
				state.wishedbooks.some(
					(item: Object) => item["id" as keyof Object] + "" === id + ""
				)
			) {
				return;
			}
			const book = state.books.find(
				(item: Object) => item["id" as keyof Object] + "" === id + ""
			);

			state.wishedbooks.push(book);
		},
		removeFromWishList: (state, action: PayloadAction<BookListState>) => {
			const id = action.payload;
			const book = state.wishedbooks.find(
				(item: Object) => item["id" as keyof Object] + "" === id + ""
			);
			const index = state.wishedbooks.indexOf(book);
			if (index === -1) {
				throw Error("book not exist");
			}
			state.wishedbooks.splice(index, 1);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchBookList.pending, (state) => {
				state.isPending = true;
			})
			.addCase(searchBookList.fulfilled, (state, action) => {
				state.books = action.payload;
				state.isPending = false;
			})
			.addCase(searchBookList.rejected, (state) => {
				state.isPending = false;
			});
	},
});

export const { updateBookList, addToWishList, removeFromWishList } =
	bookListSlice.actions;

export const selectBookList = (state: RootState) => state.bookList.books;

export default bookListSlice.reducer;
