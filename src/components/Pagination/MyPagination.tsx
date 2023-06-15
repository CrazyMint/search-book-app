import React, { MouseEvent } from "react";
import "./MyPagination.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBookList, updateCurrentPage } from "../../slices/bookListSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyPagination: React.FC<{}> = () => {
	const currentPage: number = useAppSelector(
		(state) => state.bookList.currentPage
	);
	const searchInput: string = useAppSelector(
		(state) => state.searchInput.searchInput
	);
	const totalPages: number = useAppSelector(
		(state) => state.bookList.totalPages
	);
	const dispatch = useAppDispatch();

	const handleClickPrev = () => {
		if (currentPage === 1) return;
		dispatch(updateCurrentPage(currentPage - 1));
		dispatch(searchBookList(searchInput));
	};

	const handleClickNext = () => {
		if (currentPage === totalPages) return;
		dispatch(updateCurrentPage(currentPage + 1));
		dispatch(searchBookList(searchInput));
	};

	const handleClickNumber = (e: MouseEvent<HTMLLIElement>) => {
		const toPage: number = Number(e.currentTarget.getAttribute("li-id"));
		dispatch(updateCurrentPage(toPage));
		dispatch(searchBookList(searchInput));
	};

	const startFive: number[] = [1, 2, 3, 4, 5];
	const endFive: number[] = Array(5)
		.fill(0)
		.map((item, index) => totalPages - 4 + index);
	return (
		<div className="pagination-container">
			<ArrowBackIosNewIcon
				style={{ cursor: "pointer" }}
				onClick={handleClickPrev}
			>
				Prev
			</ArrowBackIosNewIcon>
			<ul className="pagination-list">
				{currentPage === 1 ? null : (
					<li onClick={handleClickNumber} key={1} li-id={1}>
						1
					</li>
				)}

				{currentPage <= 4 ? (
					<>
						{startFive
							.slice(1, currentPage - 1)
							.map((item: number) => {
								return (
									<li onClick={handleClickNumber} key={item} li-id={item}>
										{item}
									</li>
								);
							})
							.concat(
								<li
									onClick={handleClickNumber}
									key={currentPage}
									style={{ backgroundColor: "grey" }}
									li-id={currentPage}
								>
									{currentPage}
								</li>
							)
							.concat(
								startFive.slice(currentPage).map((item: number) => {
									return (
										<li onClick={handleClickNumber} key={item} li-id={item}>
											{item}
										</li>
									);
								})
							)}
						...
					</>
				) : currentPage >= totalPages - 4 ? (
					<>
						...
						{endFive
							.slice(0, currentPage - (totalPages - 4))
							.map((item, index) => {
								return (
									<li onClick={handleClickNumber} key={item} li-id={item}>
										{item}
									</li>
								);
							})
							.concat(
								<li
									onClick={handleClickNumber}
									key={currentPage}
									li-id={currentPage}
									style={{ backgroundColor: "grey" }}
								>
									{currentPage}
								</li>
							)
							.concat(
								endFive
									.slice(currentPage + 5 - totalPages, 4)
									.map((item: number) => {
										return (
											<li onClick={handleClickNumber} key={item} li-id={item}>
												{item}
											</li>
										);
									})
							)}
					</>
				) : (
					<>
						...
						<li
							onClick={handleClickNumber}
							li-id={currentPage - 1}
							key={currentPage - 1}
						>
							{currentPage - 1}
						</li>
						<li
							onClick={handleClickNumber}
							li-id={currentPage}
							key={currentPage}
							style={{ backgroundColor: "grey" }}
						>
							{currentPage}
						</li>
						<li
							onClick={handleClickNumber}
							li-id={currentPage + 1}
							key={currentPage + 1}
						>
							{currentPage + 1}
						</li>
						...
					</>
				)}
				{currentPage === totalPages ? null : (
					<li onClick={handleClickNumber} li-id={totalPages} key={totalPages}>
						{totalPages}
					</li>
				)}
			</ul>
			<ArrowForwardIosIcon
				style={{ cursor: "pointer" }}
				onClick={handleClickNext}
			>
				Next
			</ArrowForwardIosIcon>
		</div>
	);
};

export default MyPagination;
