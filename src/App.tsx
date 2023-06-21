import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BookList } from "./components/BookList/BookList";
import { WishList } from "./components/WishList/WishList";
import { Layout } from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<Provider store={store}>
			<Layout>
				<Routes>
					<Route path="/" element={<BookList />} />
					<Route path="/wishlist" element={<WishList />} />
				</Routes>
			</Layout>
		</Provider>
	);
}

export default App;
