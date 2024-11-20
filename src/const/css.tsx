import { css } from "../../styled-system/css";

export const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

export const pageTitleCss = css({
	fontSize: {
		sm: "48px",
		base: "32px",
	},
	marginTop: "24px",
	marginBottom: "32px",
});

export const markdownStyles = css({
	"& h1": {
		fontSize: "28px",
		marginBottom: "16px",
		fontWeight: "bold",
	},
	"& h2": {
		fontSize: "24px",
		marginBottom: "12px",
		fontWeight: "bold",
	},
	"& h3": {
		fontSize: "20px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& h4, & h5": {
		fontSize: "18px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& p": {
		fontSize: "16px",
		marginBottom: "16px",
		lineHeight: "2",
		"& img": {
			display: "block",
			margin: "16px auto",
			maxWidth: "100%",
			height: "auto",
		},
	},
	"& ul": {
		paddingLeft: "24px",
		listStyleType: "disc",
		lineHeight: "2",
	},
	"& ol": {
		paddingLeft: "24px",
		listStyleType: "decimal",
		lineHeight: "2",
	},
	"& a": {
		textDecoration: "underline",
		"&:hover": {},
		lineHeight: "2",
	},
	"& pre": {
		backgroundColor: "#f5f5f5",
		padding: "16px",
		borderRadius: "8px",
		overflowX: "auto",
		marginBottom: "16px",
	},
	"& code": {
		fontFamily: "monospace",
		fontSize: "14px",
		backgroundColor: "#f5f5f5",
		padding: "4px 8px",
		borderRadius: "4px",
	},
	"& blockquote": {
		marginLeft: "16px",
		borderLeft: "4px solid #d0d7de",
		fontStyle: "italic",
		marginBottom: "16px",
	},
	"& table": {
		width: "100%",
		borderCollapse: "collapse",
		marginBottom: "16px",
	},
	"& th, & td": {
		border: "1px solid #d0d7de",
		padding: "8px",
		textAlign: "left",
	},
	"& th": {
		backgroundColor: "#f5f5f5",
		fontWeight: "bold",
	},
	"& img": {
		maxWidth: "100%",
		height: "auto",
		marginBottom: "16px",
		display: "block",
	},
	"& .contains-task-list": {
		listStyle: "none",
		paddingLeft: "0",
	},
	"& .task-list-item": {
		display: "flex",
		alignItems: "center",
		marginBottom: "8px",
	},
	"& .task-list-item input": {
		appearance: "none",
		width: "18px",
		height: "18px",
		borderRadius: "4px",
		marginRight: "8px",
		display: "inline-block",
		position: "relative",
		backgroundColor: "#e0e0e0",
		borderColor: "#a0a0a0",
		"&:checked": {
			backgroundColor: "#2F6F5E",
		},
		"&:checked::after": {
			content: '""',
			position: "absolute",
			top: "2px",
			left: "6px",
			width: "4px",
			height: "8px",
			border: "solid white",
			borderWidth: "0 2px 2px 0",
			transform: "rotate(45deg)",
		},
	},
	"& del": {
		textDecoration: "line-through",
	},
});
