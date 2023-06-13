import { useAppSelector } from "../../redux/hooks";
import Book from "../Book/Book";
import { BookDetailProps, BookInfoProps } from "../BookList/BookList";
import "./WaitList.css";

export const WishList: React.FC<{}> = (props) => {
	const wishList: Object[] = useAppSelector(
		(state) => state.bookList.wishedbooks
	);

	const wishListItems =
		wishList === undefined || wishList.length === 0
			? []
			: wishList.map((book: Object) => {
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
