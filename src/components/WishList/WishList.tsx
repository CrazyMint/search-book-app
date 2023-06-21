import { useAppSelector } from "../../redux/hooks";
import Book, { BookProps } from "../Book/Book";
import { BookDetailProps, BookInfoProps } from "../BookList/BookList";
import "./WishList.css";

export const WishList: React.FC<{}> = (props) => {
	const wishList: BookProps[] = useAppSelector(
		(state) => state.bookListSlice.wishedbooks
	);

	const wishListItems =
		wishList === undefined || wishList.length === 0
			? []
			: wishList.map((book: BookProps) => {
					const bookId = book.bookId;
					const title = book.title;
					const authors = book.authors;
					const thumbnail = book.thumbnail;
					const bookInfo: BookInfoProps = {
						title,
						authors,
						thumbnail,
						bookId,
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
		<div className="wishlist" data-testid="wishlist">
			<ul>{wishListItems}</ul>
		</div>
	);
};
