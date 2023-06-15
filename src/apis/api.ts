import axios from "axios";
import { URL } from "./constants";

const getBooks = async (
	title: string,
	startIndex: number,
	maxResults: number = 10
) => {
	try {
		const res = await axios.get(
			URL + `?q=${title}&startIndex=${startIndex}&maxResults=${maxResults}`
		);
		return res.data;
	} catch (err) {
		console.log(err);
		return alert(err);
	}
};

const getBook = async (id: string | null) => {
	try {
		const res = await axios.get(URL + "/" + id);
		return res.data;
	} catch (err) {
		console.log(err);
		return alert(err);
	}
};

export { getBooks, getBook };
