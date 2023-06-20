import {
	PayloadAction,
	Slice,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../redux/store";
import { getBooks } from "../apis/api";
import { parseBookObject } from "./bookListSlice";
import { BookProps } from "../components/Book/Book";

interface SearchState {
	searchInput: string;
	suggestions: string[];
	showSuggestion: boolean;
}

const initialState: SearchState = {
	searchInput: "",
	suggestions: [],
	showSuggestion: false,
};

export const generateSuggestions = createAsyncThunk<
	any,
	undefined,
	{ state: RootState; dispatch: AppDispatch }
>("searchSlice/generateSuggestions", async (arg, thunkAPI) => {
	const searchInput = thunkAPI.getState().searchInput.searchInput;
	if (!searchInput) return;
	const books = await getBooks(searchInput, 0, 10);
	return books;
});

export const searchInputSlice: Slice = createSlice({
	name: "search",
	initialState,
	reducers: {
		updateSearchInput: (state, action: PayloadAction<SearchState>) => {
			state.searchInput = action.payload;
			if (!state.searchInput) {
				state.showSuggestion = false;
			}
		},
		setShowSuggestion: (state, action) => {
			state.showSuggestion = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(generateSuggestions.pending, () => {})
			.addCase(generateSuggestions.fulfilled, (state, action) => {
				if (!action.payload || !action.payload.items) return;
				state.suggestions = action.payload.items.map((bookObj: any) => {
					const book: BookProps = parseBookObject(bookObj);
					return book.title.length < 50 ? book.title : book.title.slice(0, 50);
				});
				state.showSuggestion = true;
			})
			.addCase(generateSuggestions.rejected, (state, action) => {
				console.log(action.error.message);
				alert(action.error.message);
			});
	},
});

export const { updateSearchInput, setShowSuggestion } =
	searchInputSlice.actions;

export const selectSearchInput = (state: RootState) =>
	state.searchInput.searchInput;

export default searchInputSlice.reducer;
