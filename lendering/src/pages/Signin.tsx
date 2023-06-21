import { ReactEventHandler, ReactNode, useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserI {
	username: string;
	account_type: "lender" | "borrower";
	password: string;
}

type UserKeys = "username" | "password";

// const fields = ["username", "password", "account_type"];

const Signin = () => {
	const [formData, setFormData] = useState<UserI>({
		username: "",
		account_type: "lender",
		password: "",
	});

	const navigate = useNavigate();

	function changeValue(key: UserKeys, value: string) {
		const data = { ...formData };
		data[key] = value;
		setFormData(data);
	}

	// function changeAccountType(value: "borrower" | "lender") {
	// 	const data = { ...formData };
	// 	data["account_type"] = value;
	// 	setFormData(data);
	// 	console.log(data);
	// }

	async function submitForm() {
		if (
			formData.username == "" ||
			formData.password == "" ||
			formData.account_type == undefined
		) {
			return alert("Fill all mandatory spaces");
		}

		// for (let i = 0; i < fields.length; i++) {
		// 	const key = fields[i];
		// 	if (key == "account_type") continue;
		// 	console.log(key);

		// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// 	//@ts-ignore comment
		// 	form.append(key, formData[key]);
		// }

		const response = await axios.post("http://localhost:4000/auth/login", {
			username: formData.username,
			password: formData.password,
		});

		if (response.status == 200) {
			localStorage.setItem("token", response.data.token);
			// navigate("DashboardB")
			const user = response.data.user;
			if (user.type == "lender") {
				navigate("/dashboard/lender");
			} else {
				navigate("/dashboard/borrower");
			}
		} else {
			alert("Invalid Username or Password");
		}
	}
	return (
		<div className="container signin">
			<header className="signin">
				<div className="title">LENDERING</div>
			</header>
			<main className="signin">
				<div className="form">
					<div className="head">
						<span className="title">Borrower | Lender Sign In </span>
						<br />
						<span>
							If no account <Link to="/register">create account</Link>
						</span>
					</div>
					<div className="body">
						<Input
							type="email"
							placeholder="crazicoda@gmail.com"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("username", e.target.value)
							}
							value={formData.username}
						/>
						{/* <Select
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore comment
								changeAccountType(e.target.value)
							}
							value={formData.account_type}
						>
							<option value={"lender"}>Lender</option>
							<option value={"borrower"}>Borrower</option>
						</Select> */}
						<Input
							type="password"
							placeholder="Password"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("password", e.target.value)
							}
							value={formData.password}
						/>
					</div>
					<div className="foot">
						<FormButton
							text="Login"
							type="primary"
							onClick={() => {
								submitForm();
							}}
						/>
					</div>
				</div>
			</main>

			<footer></footer>
		</div>
	);
};

interface ButtonProps {
	text: string;
	type: "primary" | "outline";
	onClick?: ReactEventHandler;
}

const FormButton = (props: ButtonProps) => {
	return (
		<button
			className={"formBtn " + props.type}
			style={{ backgroundColor: "#0981D8" }}
			onClick={props.onClick}
		>
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

// interface SelectProps {
// 	children: ReactNode;
// 	onChange?: ReactEventHandler;
// 	value?: string | number | "Borrower" | "Lender";
// }

// const Select = (props: SelectProps) => {
// 	return (
// 		<select className="select" onChange={props.onChange} value={props.value}>
// 			{props.children}
// 		</select>
// 	);
// };
export default Signin;
