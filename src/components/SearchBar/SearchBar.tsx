import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBookList } from "../../slices/bookListSlice";
import {
	generateSuggestions,
	setShowSuggestion,
	updateSearchInput,
} from "../../slices/searchSlice";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchBar.css";
import _ from "lodash";
import { useCallback, useState } from "react";
import useThrottle from "../../utils/useThrottle";
import useDebounce from "../../utils/useDebounce";

export const SearchBar: React.FC<{}> = (props) => {
	const searchInput: string = useAppSelector(
		(state) => state.searchInput.searchInput
	);
	const dispatch = useAppDispatch();
	const suggestions: string[] = useAppSelector(
		(state) => state.searchInput.suggestions
	);
	const showSuggestion: boolean = useAppSelector(
		(state) => state.searchInput.showSuggestion
	);
	const [selectIndex, setSelectIndex] = useState(-1);

	const memoizedDedouncedgenerateSuggestions = useCallback(
		_.debounce(
			() => {
				dispatch(generateSuggestions());
				setSelectIndex(-1);
			},
			1000,
			{ leading: false, trailing: true }
		),
		[]
	);

	const myMemoizedDedouncedgenerateSuggestions = useDebounce(
		() => {
			dispatch(generateSuggestions());
			setSelectIndex(-1);
		},
		1000,
		{ leading: false, trailing: true }
	);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateSearchInput(event.target.value));
		myMemoizedDedouncedgenerateSuggestions();
		// memoizedDedouncedgenerateSuggestions();
	};

	const handleSearch = () => {
		console.log("search");
		dispatch(searchBookList(searchInput));
		dispatch(setShowSuggestion(false));
	};

	const memoizedThrottledHandleSearch = useCallback(
		_.throttle(handleSearch, 2000, { trailing: false }),
		[]
	);

	const myMemoizedThrottledHandleSearch = useThrottle(handleSearch, 2000, {
		trailing: false,
	});

	const handleClickSuggestion = (suggestion: string) => {
		dispatch(searchBookList(suggestion));
		dispatch(updateSearchInput(suggestion));
		dispatch(setShowSuggestion(false));
	};

	return (
		<div className="search-bar">
			<div className="input-group">
				<Form.Control
					value={searchInput}
					placeholder="Title"
					aria-label="Title"
					aria-describedby="basic-addon2"
					onChange={handleInput}
					onBlur={() => {
						dispatch(setShowSuggestion(false));
					}}
					onFocus={() => {
						dispatch(setShowSuggestion(true));
					}}
					onKeyDown={(e) => {
						const key = e.key;
						if (key === "ArrowDown") {
							const newIndex = selectIndex === 9 ? 0 : selectIndex + 1;
							setSelectIndex(newIndex);
						} else if (key === "ArrowUp") {
							const newIndex = selectIndex <= 0 ? 9 : selectIndex - 1;
							setSelectIndex(newIndex);
						} else if (key === "Enter") {
							console.log(suggestions[selectIndex]);
							handleClickSuggestion(suggestions[selectIndex]);
						}
					}}
				/>
				<Button
					onClick={myMemoizedThrottledHandleSearch}
					// onClick={memoizedThrottledHandleSearch}
					variant="outline-secondary"
					id="button-addon2"
				>
					Search
				</Button>
			</div>

			{showSuggestion ? (
				<ul className="suggestion-list">
					{suggestions.map((item: string, index) => (
						<li
							key={index}
							suggestion-content={item}
							className="suggestion-item"
							onMouseDown={() => {
								console.log("click");
								handleClickSuggestion(item);
							}}
							onMouseEnter={() => {
								setSelectIndex(index);
							}}
							style={{
								borderTop:
									selectIndex === index
										? "solid 1px rgb(189, 187, 187)"
										: "1px solid white",
								borderBottom:
									selectIndex === index
										? "solid 1px rgb(189, 187, 187)"
										: " 1px solid white",
							}}
						>
							{item}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
