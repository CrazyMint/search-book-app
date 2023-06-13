import axios from "axios";
import { URL } from "./constants";

const getBooks = async (title: string) => {
	try {
		const res = await axios.get(URL + "?q=" + title + "&maxResults=10");
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
