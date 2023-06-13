import { useAppSelector } from "../../redux/hooks";
import Book from "../Book/Book";
import { ThreeDots } from "react-loader-spinner";
import { SearchBar } from "../SearchBar/SearchBar";
import "./BookList.css";

export interface BookInfoProps {
	title: string;
	authors: string[];
	thumbnail: string;
	bookId?: string | undefined;
	selfLink?: string;
}

export interface BookDetailProps {
	bookId?: string | undefined;
	subtitle: string;
	publisher: string;
	publishedDate: string;
	description: string;
	pageCount: number;
	categories: string[];
	wished?: boolean;
}

export const BookList: React.FC<{}> = (props) => {
	const bookList: [] = useAppSelector((state) => state.bookList.books);
	const isPending: boolean = useAppSelector(
		(state) => state.bookList.isPending
	);
	console.log(isPending);

	const bookListItems =
		bookList === undefined || bookList.length === 0
			? []
			: bookList.map((book) => {
					console.log(book);
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

					const bookInfo: BookInfoProps = {
						title,
						authors,
						thumbnail,
						bookId,
						selfLink,
					};
					const bookDetailInfo: BookDetailProps = {
						subtitle,
						publisher,
						publishedDate,
						description,
						pageCount,
						categories,
					};

					return <Book key={bookId} {...bookInfo} {...bookDetailInfo} />;
			  });

	return (
		<div className="booklist">
			<SearchBar></SearchBar>
			{isPending ? <ThreeDots /> : <ul>{bookListItems}</ul>}
		</div>
	);
};
