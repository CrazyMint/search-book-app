import { Button, Form, InputGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBookList } from "../../slices/bookListSlice";
import { updateSearchInput } from "../../slices/searchSlice";
import "bootstrap/dist/css/bootstrap.css";

interface SearchBarProps {
	input?: string;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
	const searchInput = useAppSelector((state) => state.searchInput.searchInput);
	const dispatch = useAppDispatch();

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateSearchInput(event.target.value));
	};

	const handleSearch = () => {
		dispatch(searchBookList(searchInput));
	};
	return (
		<div>
			<InputGroup className="mb-3">
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
			</InputGroup>
		</div>
	);
};
