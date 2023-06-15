import { useAppSelector } from "../../redux/hooks";
import Book, { BookProps } from "../Book/Book";
import { ThreeDots } from "react-loader-spinner";
import { SearchBar } from "../SearchBar/SearchBar";
import "./BookList.css";
import MyPagination from "../Pagination/MyPagination";

export interface BookInfoProps {
	title: string;
	authors: string[];
	thumbnail: string;
	bookId?: string;
	selfLink?: string;
}

export interface BookDetailProps {
	subtitle: string;
	publisher: string;
	publishedDate: string;
	description: string;
	pageCount: number;
	categories: string[];
	wished?: boolean;
}

export const BookList: React.FC<{}> = (props) => {
	const bookList: BookProps[] = useAppSelector((state) => state.bookList.books);
	const isPending: boolean = useAppSelector(
		(state) => state.bookList.isPending
	);
	const bookListItems =
		bookList === undefined || bookList.length === 0
			? []
			: bookList.map((book: BookProps) => {
					return <Book key={book.bookId} {...book} />;
			  });

	return (
		<div className="booklist-container">
			<SearchBar></SearchBar>
			{isPending ? (
				<ThreeDots />
			) : bookListItems.length === 0 ? (
				"No Result"
			) : (
				<div className="booklist">
					<ul>{bookListItems}</ul>
					<MyPagination></MyPagination>
				</div>
			)}
		</div>
	);
};
