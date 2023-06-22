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
			wishedbooks: [
				{
					bookId: 1,
					title: "book1",
					publishedDate: "2023-1-1",
					publisher: "publisher1",
					authors: ["Bob"],
					description: "hello!",
					subtitle: "",
					pageCount: 20,
					categories: ["fiction"],
					thumbnail:
						"http://books.google.com/books/content?id=AEO7bwAAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api",
					selfLink: "",
				},
				{
					bookId: 2,
					title: "book2",
					publishedDate: "2023-2-2",
					publisher: "publisher2",
					authors: ["Sam"],
					description: "morning!",
					subtitle: "",
					pageCount: 10,
					categories: [""],
					thumbnail:
						"http://books.google.com/books/content?id=DH2MEAAAQ…J&printsec=frontcover&img=1&zoom=1&source=gbs_api",
					selfLink: "",
				},
			],
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
	test("should be an ul element with 2 items in the beginning", async () => {
		render(
			<Provider store={createMockStore()}>
				<WishList />
			</Provider>
		);
		const wishList = screen.queryByRole("list");
		expect(wishList).toBeInTheDocument();

		await waitFor(() => {
			const listItems = screen.queryAllByRole("listitem");
			expect(listItems).toHaveLength(2);
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

	test("landing on wishlist page", async () => {
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

	test("landing on booklist page", async () => {
		const route = "/";
		render(
			<MemoryRouter initialEntries={[route]}>
				<Provider store={createMockStore()}>
					<App />
				</Provider>
			</MemoryRouter>
		);
		expect(screen.getByTestId("nav-wrapper")).toBeInTheDocument();

		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});
});
