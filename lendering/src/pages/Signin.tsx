import { ReactNode } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import env from "../../env";

const Signin = () => {
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
						<Input type="email" placeholder="crazicoda@gmail.com" />
						<Select>
							<option value={"lender"}>Lender</option>
							<option value={"borrower"}>Borrower</option>
						</Select>
						<Input type="password" placeholder="Password" />
					</div>
					<div className="foot">
						<FormButton text="Login" type="primary" />
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
}

const FormButton = (props: ButtonProps) => {
	return (
		<button
			className={"formBtn " + props.type}
			style={{ backgroundColor: "#0981D8" }}
		>
			{props.text}
		</button>
	);
};

interface InputProps {
	placeholder: string;
	type?: string;
}

const Input = (props: InputProps) => {
	return (
		<input
			type={props.type}
			className="input"
			placeholder={props.placeholder}
		/>
	);
};

interface SelectProps {
	children: ReactNode;
}

const Select = (props: SelectProps) => {
	return <select className="select">{props.children}</select>;
};
export default Signin;
