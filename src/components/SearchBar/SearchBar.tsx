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
import { useCallback } from "react";
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

	// const memoizedDedouncedgenerateSuggestions = useCallback(
	// 	_.debounce(() => {
	// 		dispatch(generateSuggestions());
	// 	}, 1000),
	// 	[]
	// );

	const myMemoizedDedouncedgenerateSuggestions = useDebounce(() => {
		dispatch(generateSuggestions());
	}, 1000);

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("input");
		dispatch(updateSearchInput(event.target.value));
		myMemoizedDedouncedgenerateSuggestions();
	};

	const handleSearch = () => {
		console.log("search");
		dispatch(searchBookList(searchInput));
	};

	// const memoizedThrottledHandleSearch = useCallback(
	// 	_.throttle(handleSearch, 3000, { trailing: false }),
	// 	[]
	// );

	const myMemoizedThrottledHandleSearch = useThrottle(handleSearch, 3000, {});

	const handleClickSuggestion = (suggestion: string) => {
		dispatch(searchBookList(suggestion));
		dispatch(updateSearchInput(suggestion));
	};

	return (
		<div
			className="search-bar"
			onMouseLeave={() => {
				dispatch(setShowSuggestion(false));
			}}
		>
			<div className="input-group">
				<Form.Control
					value={searchInput}
					onChange={handleInput}
					placeholder="Title"
					aria-label="Title"
					aria-describedby="basic-addon2"
				/>
				<Button
					onClick={myMemoizedThrottledHandleSearch}
					variant="outline-secondary"
					id="button-addon2"
				>
					Search
				</Button>
			</div>

			{showSuggestion ? (
				<ul className="suggestion-list">
					{suggestions.map((item, index) => (
						<li
							key={index}
							suggestion-content={item}
							className="suggestion-item"
							onClick={() => {
								console.log("click");
								handleClickSuggestion(item);
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
