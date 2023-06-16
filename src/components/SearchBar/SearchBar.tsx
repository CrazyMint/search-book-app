import { Button, Form, InputGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBookList } from "../../slices/bookListSlice";
import {
	generateSuggestions,
	setShowSuggestion,
	updateSearchInput,
} from "../../slices/searchSlice";
import "bootstrap/dist/css/bootstrap.css";
import "./SearchBar.css";

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

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateSearchInput(event.target.value));
		dispatch(generateSuggestions());
	};

	const handleSearch = () => {
		dispatch(searchBookList(searchInput));
	};

	const handleClickSuggestion = (suggestion: string) => {
		dispatch(searchBookList(suggestion));
		dispatch(updateSearchInput(suggestion));
	};

	return (
		<div className="search-bar">
			<div className="input-group">
				<Form.Control
					value={searchInput}
					onChange={handleInput}
					placeholder="Title"
					aria-label="Title"
					aria-describedby="basic-addon2"
				/>
				<Button
					onClick={handleSearch}
					variant="outline-secondary"
					id="button-addon2"
				>
					Search
				</Button>
			</div>

			{showSuggestion ? (
				<ul
					className="suggestion-list"
					onMouseLeave={() => {
						dispatch(setShowSuggestion(false));
					}}
				>
					{suggestions.map((item, index) => (
						<li
							key={index}
							suggestion-content={item}
							className="suggestion-item"
							onClick={() => {
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
