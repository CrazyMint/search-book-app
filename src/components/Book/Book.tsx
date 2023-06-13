import React, { MouseEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { BookDetailProps, BookInfoProps } from "../BookList/BookList";
import { addToWishList, removeFromWishList } from "../../slices/bookListSlice";
import "./Book.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
interface BookProps extends BookInfoProps, BookDetailProps {}

const Book: React.FC<BookProps> = ({
	title,
	authors,
	thumbnail,
	bookId,
	selfLink,
	subtitle,
	publisher,
	publishedDate,
	description,
	pageCount,
	categories,
	wished,
}) => {
	const [wishedButton, setWishedButton] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	const dispatch = useAppDispatch();
	const displayAuthors =
		authors?.length === 1 ? authors[0] : authors?.join(", ");

	const handleClickAdd = (event: MouseEvent<HTMLButtonElement>) => {
		try {
			const id = (
				(
					(event.currentTarget.parentNode as HTMLElement)
						.parentNode as HTMLElement
				).parentElement as HTMLElement
			).getAttribute("book-id");
			dispatch(addToWishList(id));
			setWishedButton(true);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
	const handleClickRemove = (event: MouseEvent<HTMLButtonElement>) => {
		try {
			const id = (
				(
					(event.currentTarget.parentNode as HTMLElement)
						.parentNode as HTMLElement
				).parentElement as HTMLElement
			).getAttribute("book-id");
			dispatch(removeFromWishList(id));
			setWishedButton(false);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
	const handleClickBook = (event: MouseEvent<HTMLImageElement>) => {
		try {
			setShowDetails(!showDetails);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	return (
		<li book-id={bookId}>
			<div className="brief-container">
				<img
					src={thumbnail}
					alt="Book thumbnail"
					onClick={handleClickBook}
					style={{ cursor: "pointer" }}
				></img>
				<div className="brief-side">
					<p className="title">{title}</p>
					<p>
						<strong>By: {displayAuthors}</strong>
					</p>
					{wished ? (
						<Button onClick={handleClickRemove} variant="success">
							Remove from wish list
						</Button>
					) : (
						<Button onClick={handleClickAdd} variant="success">
							Add to wish list
						</Button>
					)}
				</div>
			</div>
			{showDetails ? (
				<div className="detail-container">
					<p>
						<strong>Subtitle: </strong> {subtitle}
					</p>
					<p>
						<strong>Publisher: </strong> {publisher}
					</p>
					<p>
						<strong>Published Date: </strong> {publishedDate}
					</p>
					<p>
						<strong>Description: </strong>
						{description}
					</p>
					<p>
						<strong>Page Count: </strong>
						{pageCount}
					</p>
					<p>
						<strong>Categories: </strong>
						{categories}
					</p>
				</div>
			) : null}
		</li>
	);
};

export default React.memo(Book);
