import { ReactEventHandler, useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserI {
	_id?: string;
	fname: string;
	lname: string;
	email: string;
	password: string;
	occupation: string;
	company: string;
	tax_number: string;
	verified: boolean;
	account_type: "borrower" | "lender";
	points: number;
	contact: string;
	ghana_card: string;
	image: string;
	kin: string;
	kin_contact: string;
	kin_ghana_card: string;
	kin_image: string;
	address: string;
	balance: number;
	ratings: RatingI[];
}

interface RatingI {
	from: string;
	rate: number;
}

const Profile = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const [user, setUser] = useState<UserI>({});
	const [userID, setID] = useState("");
	const navigate = useNavigate();

	async function findUser() {
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get("id");
		if (id == null) return navigate("/");

		const result = await axios.get(`http://localhost:4000/view?id=${id}`);
		setID(id);
		console.log(result.data);
		setUser(result.data);
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!user?.fname) findUser();
	});

	function openTransactions() {
		navigate(`/transact?id=${user._id}`);
	}
	return (
		<div className="container profile">
			<header className="profile">
				<div>
					<span>
						<Link to="/Feed">LENDERING</Link>
					</span>
					<span>
						<a
							href=""
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/login");
							}}
						>
							LOGOUT
						</a>
					</span>
				</div>
			</header>
			<main className="profile">
				<div className="image">
					<img src={`http://localhost:4000/${user.image}`} />
				</div>
				<div className="desc">
					<div>
						<Label label="Name" value={user.fname + " " + user.lname} />
						<Label label="Occupation" value={user.occupation} />
						<Label label="Account Type" value={user.account_type} />
						<Label label="Rating" value="Not Rated" />
						<Label label="Contact" value={user.contact} />
						
					</div>
					<div>
						<Label label="Verifed" value={user.verified ? "Yes" : "No"} />
						<Label label="Points" value={user.points} />
						<Label label="Location" value={user.address} />
						<Label label="Company" value={user.company || "Not Available"} />
					</div>
				</div>
				<div className="actions">
					<ActionButton
						text="Chat"
						onClick={() => {
							navigate(`/chat?id=${userID}`);
						}}
					/>
					<ActionButton text="Transact" onClick={openTransactions} />
					{/* <ActionButton text="Click me" /> */}
				</div>
			</main>
		</div>
	);
};

interface LabelProps {
	label: string;
	value: string | number;
}

const Label = (props: LabelProps) => {
	return (
		<div className="label">
			<div className="left">{props.label}:</div>
			<div className="right">{props.value}</div>
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

export default Profile;
