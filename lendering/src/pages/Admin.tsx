import { Link } from "react-router-dom";
import "./Admin.css";
import { ReactEventHandler } from "react";

const Admin = () => {
	return (
		<div className="container admin">
			<header className="admin">
				<div>
					<span>
						<Link to="/Feed">LENDERING</Link>
					</span>
					<span>
						<a href="">Logout</a>
					</span>
				</div>
			</header>
			<main className="admin">
				<div className="label">Users</div>
				<div className="user">
					<div className="name">Jeff Konadu</div>
					<div className="v-status">Verified</div>
					<div className="promoted">Promoted</div>
					<div className="action">
						<ActionButton text="View"></ActionButton>
					</div>
				</div>
			</main>
		</div>
	);
};

interface ActionButtonProps {
	text: string;
	onClick?: ReactEventHandler;
}

const ActionButton = (props: ActionButtonProps) => {
	return (
		<button className="actionBtn" onClick={props.onClick}>
			{props.text}
		</button>
	);
};
export default Admin;
