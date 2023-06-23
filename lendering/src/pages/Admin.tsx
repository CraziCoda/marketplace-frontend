import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import { ReactEventHandler, useEffect, useState } from "react";
import axios from "axios";

interface UserI {
	_id: string;
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
}

const Admin = () => {
	const navigate = useNavigate();
	const [logged, setLog] = useState(false);
	const [b_com, setBCom] = useState("");
	const [l_com, setLCom] = useState("");
	const [users, setUsers] = useState<UserI[]>([]);

	async function login() {
		const token = localStorage.getItem("token");

		if (token) {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			try {
				const res = await axios.get("http://localhost:4000/verifyToken", {
					headers,
				});
				console.log(res.data);
				if (res.status == 200) {
					getAllUsers();
					return setLog(true);
				}
			} catch (err) {
				console.log(err);
				localStorage.removeItem("token");
			}
		}

		const username = prompt("Enter Admin UserName", "");
		const password = prompt("Enter admin Password", "");

		// console.log(username, password);

		try {
			const response = await axios.post("http://localhost:4000/auth/admin", {
				username: username,
				password: password,
			});

			// console.log(response);

			if (response.status == 200) {
				if (response.data.success == false) {
					alert("Invalid credentails");
					return;
				}
				localStorage.setItem("token", response.data.token);
				getAllUsers();
				setLog(true);
			} else {
				alert("Invalid Username or Password");
				navigate("/");
			}
		} catch (error) {
			alert("Invalid Username or Password");
		}
	}

	async function getCom() {
		const result = await axios.get(`http://localhost:4000/commission`);

		setBCom(result.data.borrower);
		setLCom(result.data.lender);
	}

	async function setCom() {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.post(
			"http://localhost:4000/changeRates",
			{
				lender: parseInt(l_com),
				borrower: parseInt(b_com),
			},
			{
				headers,
			}
		);
		if (response.status == 200) {
			setBCom(response.data.borrower);
			setLCom(response.data.lender);
		}
	}

	async function getAllUsers() {
		const token = localStorage.getItem("token");

		console.log(token);

		if (!token) {
			navigate("/");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const result = await axios.get(`http://localhost:4000/allusers`, {
				headers,
			});

			if (result.status == 200) {
				setUsers(result.data);
				return console.log(result.data);
			}
		} catch (e) {
			alert("User authentication error");
		}
	}

	useEffect(() => {
		if (!logged) login();
		if (b_com == "" || l_com == "") getCom();
		// if (logged && !(b_com == "" || l_com == "")) getAllUsers();
	});
	return (
		<div className="container admin">
			<header className="admin">
				<div>
					<span>
						<Link to="">LENDERING</Link>
					</span>
					<span>
						<a
							href=""
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/login");
							}}
						>
							Logout
						</a>
					</span>
				</div>
			</header>
			<main className="admin">
				<div className="request">
					<div className="label">Change Commission</div>
					<div className="inputs">
						<label>Borrow Commission: </label>
						<Input
							placeholder="Commission Borrower loan. Eg. 2%"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								//changeValue("amount", e.target.value)
								setBCom(e.target.value)
							}
							value={b_com}
						/>
						<label>Lender Interest Commission: </label>
						<Input
							placeholder="Commission on Lender's interest. Eg..  10%"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setLCom(e.target.value)
							}
							value={l_com}
						/>
					</div>
					<ActionButton
						text="Change"
						onClick={() => {
							setCom();
						}}
					/>
				</div>
				<div className="label">Users</div>
				{users.map((el, i) => {
					if (el.verified == true) return;
					return (
						<div className="user" key={i}>
							<div className="name">J{`${el.fname} ${el.lname}`}</div>
							<div className="v-status">
								{el.verified ? "Verfied" : "Not verified"}
							</div>
							<div className="promoted">Not Promoted</div>
							<div className="action">
								<ActionButton
									text="View"
									onClick={() => {
										navigate(`/adminview?id=${el._id}`);
									}}
								></ActionButton>
							</div>
						</div>
					);
				})}

				{users.map((el, i) => {
					if (el.verified == false) return;
					return (
						<div className="user" key={i}>
							<div className="name">J{`${el.fname} ${el.lname}`}</div>
							<div className="v-status">
								{el.verified ? "Verfied" : "Not verified"}
							</div>
							<div className="promoted">Not Promoted</div>
							<div className="action">
								<ActionButton
									text="View"
									onClick={() => {
										navigate(`/adminview?id=${el._id}`);
									}}
								></ActionButton>
							</div>
						</div>
					);
				})}
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

interface InputProps {
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	onChange?: ReactEventHandler;
	value?: string | number | "Borrower" | "Lender";
	required?: boolean;
}

const Input = (props: InputProps) => {
	return (
		<input
			type={props.type}
			className="input"
			placeholder={props.placeholder}
			accept="image/*"
			onChange={props.onChange}
			value={props.value}
			required={props.required || true}
		/>
	);
};
export default Admin;
