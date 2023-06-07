import { ReactNode } from "react";
import "./Signup.css";
const Signup = () => {
	return (
		<div className="container">
			<header>
				<div className="title">LENDERING</div>
			</header>
			<main>
				<div className="form">
					<div className="head">
						<span className="title">Borrower & Lender Sign Up</span>
						<span>
							If with an account <a href="#">Login account </a>
						</span>
					</div>
					<div className="body">
						<div className="info">
							<Select>
								<option value={"lender"}>Lender</option>
								<option value={"borrower"}>Borrower</option>
							</Select>

							<Input type="email" placeholder="crazicoda@gmail.com" />
							<div className="two-fields">
								<Input type="text" placeholder="eg: Jeff" />
								<div className="divider"></div>
								<Input type="text" placeholder="eg: Sarpong" />
							</div>

							<Input
								type="text"
								placeholder="eg: Plot 46 BLK G Kenyase , Kumasi, Ghana"
							/>

							<div className="two-fields">
								<Input type="password" placeholder="Password" />
								<div className="divider"></div>
								<Input type="password" placeholder="Confirm Password" />
							</div>

							<div className="two-fields">
								<Input type="text" placeholder="Occupation" />
								<div className="divider"></div>
								<Input type="text" placeholder="Company (opt)" />
							</div>

							<div className="labelled">
								<label>Company Cert: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>

							<Input type="text" placeholder="Tin No. (eg: B994838493 " />
						</div>
						<div className="verify">
							<h4>Verification</h4>
							<div className="labelled">
								<label>Ghana Card: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>

							<div className="labelled">
								<label>Your Image: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>

							<Input type="tel" placeholder="+233558371654" />

							<div className="two-fields">
								<Input type="text" placeholder="Next of Kin" />
								<div className="divider"></div>
								<Input type="text" placeholder="Next of Kin Contact" />
							</div>

							<div className="labelled">
								<label>Next of Kin Ghana Card: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>

							<div className="labelled">
								<label>Next of kin Image: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>
						</div>
					</div>
					<div className="foot">
						<FormButton text="Sign Up" type="primary" />
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
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
}

const Input = (props: InputProps) => {
	return (
		<input
			type={props.type}
			className="input"
			placeholder={props.placeholder}
			accept="image/*"
		/>
	);
};

interface SelectProps {
	children: ReactNode;
}

const Select = (props: SelectProps) => {
	return <select className="select">{props.children}</select>;
};
export default Signup;
