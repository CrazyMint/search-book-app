import { useAppSelector } from "../../redux/hooks";
import Book, { BookProps } from "../Book/Book";
import { BookDetailProps, BookInfoProps } from "../BookList/BookList";
import "./WishList.css";

export const WishList: React.FC<{}> = (props) => {
	const wishList: BookProps[] = useAppSelector(
		(state) => state.bookList.wishedbooks
	);

	const wishListItems =
		wishList === undefined || wishList.length === 0
			? []
			: wishList.map((book: BookProps) => {
					// const volumeInfo = book.volumeInfo;
					const bookId = book.bookId;
					const title = book.title;
					const authors = book.authors;
					// const imageLinks: Object | undefined = book.thumbnail;
					const thumbnail = book.thumbnail;
					// const selfLink: any
					const bookInfo: BookInfoProps = {
						title,
						authors,
						thumbnail,
						bookId,
						// selfLink,
					};

					const subtitle = book.subtitle;
					const publisher = book.publisher;
					const publishedDate = book.publishedDate;
					const description = book.description;
					const pageCount = book.pageCount;
					const categories = book.categories;
					const bookDetailInfo: BookDetailProps = {
						subtitle,
						publisher,
						publishedDate,
						description,
						pageCount,
						categories,
						wished: true,
					};
					return <Book key={bookId} {...bookInfo} {...bookDetailInfo} />;
			  });

	return (
		<div className="booklist">
			<ul>{wishListItems}</ul>
		</div>
	);
};
