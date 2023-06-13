import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

interface SearchState {
	searchInput: string;
}

const initialState: SearchState = {
	searchInput: "",
};

export const searchInputSlice: Slice = createSlice({
	name: "search",
	initialState,
	reducers: {
		updateSearchInput: (state, action: PayloadAction<SearchState>) => {
			state.searchInput = action.payload;
		},
	},
});

export const { updateSearchInput } = searchInputSlice.actions;

export const selectSearchInput = (state: RootState) =>
	state.searchInput.searchInput;

export default searchInputSlice.reducer;
