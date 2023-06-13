import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

interface Props {
	children: React.ReactNode;
}

const linkStyle = {
	margin: "1rem",
	textDecoration: "none",
	color: "blue",
	padding: "5px",
	border: "1px solid grey",
	borderRadius: "6px",
};

export const Layout: React.FC<Props> = ({ children }) => {
	return (
		<div className="nav-wrapper">
			<div className="navbar">
				<Link to="/" style={linkStyle}>
					Book List
				</Link>

				<Link to="/wishlist" style={linkStyle}>
					Wish List
				</Link>
			</div>

			<main>{children}</main>
		</div>
	);
};
