import { ReactEventHandler, useEffect, useState } from "react";
import "./Me.css";
import { useNavigate } from "react-router-dom";
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

const Me = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const [user, setUser] = useState<UserI>({});
	const navigate = useNavigate();

	async function findUser() {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		const result = await axios.get(`http://localhost:4000/me`, { headers });
		console.log(result.data);
		setUser(result.data);
	}

	async function loadWallet() {
		let amount = 0;
		const a = prompt("Enter the amount: ");
		if (a != null) amount = parseInt(a);

		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.post(
			`http://localhost:4000/deposit`,
			{
				amount
			},
			{
				headers: headers,
			}
		);

		if (response.status == 200) {
			alert(response.data.message);
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	async function withdraw() {
		let amount = 0;
		const a = prompt("Enter the amount: ");
		if (a != null) amount = parseInt(a);

		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.post(
			`http://localhost:4000/withdraw`,
			{
				amount
			},
			{
				headers: headers,
			}
		);

		if (response.status == 200) {
			alert(response.data.message);
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!user?.fname) findUser();
	});

	return (
		<div className="container profile">
			<header className="profile">
				<span>LENDERING</span>
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
						<Label label="Location" value={user.address} />
						<Label label="Company" value={user.company || "Not Available"} />
					</div>
					<div>
						<Label label="Verifed" value={user.verified ? "Yes" : "No"} />
						<Label label="Points" value={user.points} />
					</div>
				</div>
				<div className="actions">
					<ActionButton text="Load Wallet" onClick={loadWallet} />
					<ActionButton text="Withdraw" onClick={withdraw} />
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

export default Me;
