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
	const bookList: Object[] = useAppSelector((state) => state.bookList.books);
	const isPending: boolean = useAppSelector(
		(state) => state.bookList.isPending
	);
	console.log(isPending);

	const bookListItems =
		bookList === undefined || bookList.length === 0
			? []
			: bookList.map((book: Object) => {
					const volumeInfo = book["volumeInfo" as keyof typeof book];
					const bookId: any = book["id" as keyof Object];
					const title = volumeInfo["title" as keyof typeof volumeInfo];
					const authors = volumeInfo["authors" as keyof typeof volumeInfo];
					const imageLinks: Object | undefined =
						volumeInfo["imageLinks" as keyof typeof volumeInfo];
					let thumbnail = "";
					if (imageLinks !== undefined) {
						thumbnail = imageLinks["thumbnail" as keyof typeof imageLinks];
					}
					const selfLink: any = book["selfLink" as keyof typeof book];
					const bookInfo: BookInfoProps = {
						title,
						authors,
						thumbnail,
						bookId,
						selfLink,
					};

					const subtitle = volumeInfo["subtitle" as keyof typeof volumeInfo];
					const publisher = volumeInfo["publisher" as keyof typeof volumeInfo];
					const publishedDate =
						volumeInfo["publishedDate" as keyof typeof volumeInfo];
					const description =
						volumeInfo["description" as keyof typeof volumeInfo];
					const pageCount = volumeInfo["pageCount" as keyof typeof volumeInfo];
					const categories =
						volumeInfo["categories" as keyof typeof volumeInfo];
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
