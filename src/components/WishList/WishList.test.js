import { render, screen, waitFor } from "@testing-library/react";
import { WishList } from "./WishList";
import { configureStore } from "@reduxjs/toolkit";
import bookListSlice from "../../slices/bookListSlice";
import searchInputSlice from "../../slices/searchSlice";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "../../App";
import userEvent from "@testing-library/user-event";

const createMockStore = (
	preloadedState = {
		bookListSlice: {
			books: [],
			wishedbooks: [],
			isPending: false,
			itemsPerPage: 10,
			totalPages: 1,
			currentPage: 1,
		},
		searchInputSlice: {
			searchInput: "",
			suggestions: [],
			showSuggestion: false,
		},
	}
) => {
	return configureStore({
		reducer: {
			bookListSlice,
			searchInputSlice,
		},
		preloadedState,
	});
};

describe("wishlist component", () => {
	test("should be an empty ul element in the beginning", async () => {
		render(
			<Provider store={createMockStore()}>
				<WishList />
			</Provider>
		);

		await waitFor(() => {
			const wishList = screen.queryByRole("list");
			expect(wishList).toBeInTheDocument();
		});
	});
});

describe("react router", () => {
	test("full app rendering/navigating", async () => {
		render(<App />, { wrapper: BrowserRouter });

		// verify page content for default route
		expect(screen.getByTestId("nav-wrapper")).toBeInTheDocument();
		expect(screen.getByTestId("navbar")).toBeInTheDocument();

		// verify page content for expected route after navigating
		expect(screen.getByText(/Search/i)).toBeInTheDocument();
		userEvent.click(screen.getByText(/Search/i));
		expect(screen.getByTestId("nav-wrapper")).toBeInTheDocument();
		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});

	test("landing on wishlist page", () => {
		const route = "/wishlist";
		render(
			<MemoryRouter initialEntries={[route]}>
				<Provider store={createMockStore()}>
					<App />
				</Provider>
			</MemoryRouter>
		);

		expect(screen.getByTestId("wishlist")).toBeInTheDocument();
	});
});
