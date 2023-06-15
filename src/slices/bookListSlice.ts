import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../redux/store";
import { getBooks } from "../apis/api";
import { BookProps } from "../components/Book/Book";

interface BookListState {
	books: BookProps[];
	wishedbooks: BookProps[];
	isPending: boolean;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}

const initialState: BookListState = {
	books: [],
	wishedbooks: [],
	isPending: false,
	itemsPerPage: 10,
	totalPages: 1,
	currentPage: 1,
};

const parseBookObject = (book: any): BookProps => {
	const {
		id: bookId,
		volumeInfo: {
			title,
			publishedDate,
			publisher,
			authors,
			description,
			subtitle,
			pageCount,
			categories,
			imageLinks: { thumbnail } = { thumbnail: "" },
		},
		selfLink,
	} = book;
	return {
		bookId,
		title,
		publishedDate,
		publisher,
		authors,
		description,
		subtitle,
		pageCount,
		categories,
		thumbnail,
		selfLink,
	};
};

export const searchBookList = createAsyncThunk<
	any,
	string,
	{ state: RootState; dispatch: AppDispatch }
>("bookListSlice/searchBookList", async (searchInput: string, thunkAPI) => {
	const { currentPage, itemsPerPage } = thunkAPI.getState().bookList;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const maxResults = itemsPerPage;
	return await getBooks(searchInput, startIndex, maxResults);
});

export const bookListSlice: Slice = createSlice({
	name: "bookList",
	initialState,
	reducers: {
		addToWishList: (state, action) => {
			const id = action.payload;
			if (state.wishedbooks.some((item: BookProps) => item.bookId === id)) {
				return;
			}
			const book = state.books.find((item: BookProps) => item.bookId === id);

			state.wishedbooks.push(book);
		},
		removeFromWishList: (state, action) => {
			const id = action.payload;
			const book = state.wishedbooks.find(
				(item: BookProps) => item.bookId === id
			);
			const index = state.wishedbooks.indexOf(book);
			if (index === -1) {
				throw Error("book not exist");
			}
			state.wishedbooks.splice(index, 1);
		},
		updateCurrentPage: (state, action) => {
			const newPage = action.payload;
			if (newPage >= 1 && newPage <= state.totalPages) {
				state.currentPage = newPage;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchBookList.pending, (state) => {
				state.isPending = true;
			})
			.addCase(searchBookList.fulfilled, (state, action) => {
				if (!action.payload || !action.payload.items) {
					state.isPending = false;
					return;
				}
				state.books = action.payload.items.map((bookObj: any) =>
					parseBookObject(bookObj)
				);
				state.isPending = false;
				state.totalPages = Math.min(
					20,
					Math.ceil(action.payload.totalItems / state.itemsPerPage)
				);
			})
			.addCase(searchBookList.rejected, (state, action) => {
				state.isPending = false;
				console.log(action.error.message);
				alert(action.error.message);
			});
	},
});

export const { addToWishList, removeFromWishList, updateCurrentPage } =
	bookListSlice.actions;

export const selectBookList = (state: RootState) => state.bookList.books;

export default bookListSlice.reducer;
