import { ReactEventHandler, ReactNode, useEffect, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserI {
	fname: string;
	lname: string;
	email: string;
	password: string;
	occupation: string;
	company?: string;
	tax_number: string;
	account_type: "borrower" | "lender" | string;
	contact: string;
	ghana_card: FileList | null;
	image: FileList | null;
	kin: string;
	kin_contact: string;
	kin_ghana_card: FileList | null;
	kin_image: FileList | null;
	address: string;
}

type UserKeys =
	| "fname"
	| "lname"
	| "email"
	| "password"
	| "occupation"
	| "company"
	| "tax_number"
	| "contact"
	| "kin"
	| "kin_contact"
	| "address";
// | "image"
// | "kin_ghana_card"
// | "kin_image"
// | "ghana_card";

type FileKeys = "image" | "kin_ghana_card" | "kin_image" | "ghana_card";

const fields = [
	"fname",
	"lname",
	"email",
	"password",
	"occupation",
	"company",
	"tax_number",
	"contact",
	"kin",
	"kin_contact",
	"address",
	"image",
	"kin_ghana_card",
	"kin_image",
	"ghana_card",
	"account_type",
];

const Signup = () => {
	const [formData, setFormData] = useState<UserI>({
		fname: "",
		lname: "",
		email: "",
		password: "",
		occupation: "",
		company: "",
		tax_number: "",
		account_type: "lender",
		contact: "",
		ghana_card: null,
		image: null,
		kin: "",
		kin_contact: "",
		kin_ghana_card: null,
		kin_image: null,
		address: "",
	});

	const [password, setPsw] = useState("");
	const [cpassword, setcPsw] = useState("");

	const navigate = useNavigate();

	function changeValue(key: UserKeys, value: string) {
		const data = { ...formData };
		data[key] = value;
		setFormData(data);
	}

	function changeAccountType(value: "borrower" | "lender" | string) {
		const data = { ...formData };
		data["account_type"] = value;
		setFormData(data);
		console.log(data);
	}

	function setPassword(type: "password" | "c_password", value: string) {
		if (type == "password") {
			setPsw(value);
		} else {
			setcPsw(value);
		}
	}

	function addFile(key: FileKeys, files: FileList | null) {
		const data = { ...formData };
		data[key] = files;
		setFormData(data);
	}

	async function submitForm() {
		const form = new FormData();
		console.log(formData.account_type);
		if (
			formData.fname == "" ||
			formData.lname == "" ||
			formData.email == "" ||
			//formData.password == "" ||
			formData.occupation == "" ||
			//formData.company == "" ||
			formData.tax_number == "" ||
			formData.contact == "" ||
			formData.ghana_card == null ||
			formData.image == null ||
			formData.kin == "" ||
			formData.kin_contact == "" ||
			formData.kin_ghana_card == null ||
			formData.kin_image == null ||
			formData.address == "" ||
			formData.account_type == undefined
		) {
			return alert("Fill all mandatory spaces");
		}

		if (password == cpassword) {
			console.log("Success");
			formData.password = password;
			for (let i = 0; i < fields.length; i++) {
				const key = fields[i];
				if (key.includes("image") || key.includes("ghana_card")) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore comment
					form.append(key, formData[key][0]);
				} else {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore comment
					form.append(key, formData[key]);
				}
			}

			fetch("http://localhost:4000/auth/register", {
				method: "POST",
				body: form,
			})
				.then(async (res) => {
					const response = await res.json();
					if (response?.status == 200) {
						alert(
							"Your account has been successfully.\n You will receive an email once verified "
						);
					} else {
						alert(response.message);
					}

					navigate("/login");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return alert("Passwords do not match");
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			axios
				.get("http://localhost:4000/me", { headers })
				.then((response) => {
					const user = response.data;
					if (user.account_type == "lender") {
						navigate("/dashboard/lender");
					} else {
						navigate("/dashboard/borrower");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});

	return (
		<div className="container signup">
			<header className="signup">
				<div className="title">LENDERING</div>
			</header>
			<main className="signup">
				<div className="form">
					<div className="head">
						<span className="title">Borrower & Lender Sign Up</span>
						<span>
							If with an account <Link to="/login">Login account </Link>
						</span>
					</div>
					<div className="body">
						<div className="info">
							<Select
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
									changeAccountType(e.target.value)
								}
								value={formData.account_type}
							>
								<option value={"lender"}>Lender</option>
								<option value={"borrower"}>Borrower</option>
							</Select>

							<Input
								type="email"
								placeholder="crazicoda@gmail.com"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeValue("email", e.target.value)
								}
								value={formData.email}
							/>
							<div className="two-fields">
								<Input
									type="text"
									placeholder="eg: Jeff"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("fname", e.target.value)
									}
									value={formData.fname}
								/>
								<div className="divider"></div>
								<Input
									type="text"
									placeholder="eg: Sarpong"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("lname", e.target.value)
									}
									value={formData.lname}
								/>
							</div>

							<Input
								type="text"
								placeholder="eg: Plot 46 BLK G Kenyase , Kumasi, Ghana"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeValue("address", e.target.value)
								}
								value={formData.address}
							/>

							<div className="two-fields">
								<Input
									type="password"
									placeholder="Password"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPassword("password", e.target.value)
									}
									value={password}
								/>
								<div className="divider"></div>
								<Input
									type="password"
									placeholder="Confirm Password"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPassword("c_password", e.target.value)
									}
									value={cpassword}
								/>
							</div>

							<div className="two-fields">
								<Input
									type="text"
									placeholder="Occupation"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("occupation", e.target.value)
									}
									value={formData.occupation}
								/>
								<div className="divider"></div>
								<Input
									type="text"
									placeholder="Company (opt)"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("company", e.target.value)
									}
									value={formData.company}
								/>
							</div>

							<div className="labelled">
								<label>Company Cert: </label>
								<div className="divider"></div>
								<Input type="file" />
							</div>

							<Input
								type="text"
								placeholder="Tin No. (eg: B994838493 "
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeValue("tax_number", e.target.value)
								}
								value={formData.tax_number}
							/>
						</div>
						<div className="verify">
							<h4>Verification</h4>
							<div className="labelled">
								<label>Ghana Card: </label>
								<div className="divider"></div>
								<Input
									type="file"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										addFile("ghana_card", e.target.files)
									}
								/>
							</div>

							<div className="labelled">
								<label>Your Image: </label>
								<div className="divider"></div>
								<Input
									type="file"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										addFile("image", e.target.files)
									}
								/>
							</div>

							<Input
								type="tel"
								placeholder="+233558371654"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeValue("contact", e.target.value)
								}
								value={formData.contact}
							/>

							<div className="two-fields">
								<Input
									type="text"
									placeholder="Next of Kin"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("kin", e.target.value)
									}
									value={formData.kin}
								/>
								<div className="divider"></div>
								<Input
									type="text"
									placeholder="Next of Kin Contact"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										changeValue("kin_contact", e.target.value)
									}
									value={formData.kin_contact}
								/>
							</div>

							<div className="labelled">
								<label>Next of Kin Ghana Card: </label>
								<div className="divider"></div>
								<Input
									type="file"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										addFile("kin_ghana_card", e.target.files)
									}
								/>
							</div>

							<div className="labelled">
								<label>Next of kin Image: </label>
								<div className="divider"></div>
								<Input
									type="file"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										addFile("kin_image", e.target.files)
									}
								/>
							</div>
						</div>
					</div>
					<div className="foot">
						<FormButton
							text="Sign Up"
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

interface SelectProps {
	children: ReactNode;
	onChange?: ReactEventHandler;
	value?: string | number | "Borrower" | "Lender";
}

const Select = (props: SelectProps) => {
	return (
		<select className="select" onChange={props.onChange} value={props.value}>
			{props.children}
		</select>
	);
};
export default Signup;
