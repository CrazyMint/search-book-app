import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BookList } from "./components/BookList/BookList";
import { WishList } from "./components/WaitList/WaitList";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	// useEffect(() => {
	// 	getBooks().then((data) => {
	// 		const books = data.items;
	// 		console.log("b", books);
	// 	});
	// }, []);

	return (
		<BrowserRouter>
			<Provider store={store}>
				<Layout>
					<Routes>
						<Route path="/" element={<BookList />} />
						<Route path="/wishlist" element={<WishList />} />
					</Routes>
				</Layout>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
