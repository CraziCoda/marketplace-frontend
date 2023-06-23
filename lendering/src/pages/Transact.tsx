import { ReactEventHandler, useEffect, useState } from "react";
import "./Transact.css";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

type RequestKeys = "amount" | "interest" | "date";

interface RequestI {
	amount?: number;
	interest?: number;
	date?: string;
}

interface TransactionsI {
	borrower: string;
	lender: string;
	amount: number;
	due_date: Date;
	amount_settled: number;
	active: boolean;
	proposer: "lender" | "borrower";
	accepted: boolean;
	interest: number;
	_id: string;
}

const Transact = () => {
	const navigate = useNavigate();
	const [to, setTo] = useState("");
	const [formData, setFormData] = useState<RequestI>({
		interest: 0,
		date: "",
		amount: 0,
	});
	const [transactions, setTransactions] = useState<TransactionsI[]>([]);

	async function setParams() {
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get("id");
		if (id == null) return navigate("/");
		setTo(id);

		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.get(`http://localhost:4000/transactions`, {
			headers: headers,
		});

		if (response.status == 200) {
			setTransactions(response.data);
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	function changeValue(key: RequestKeys, value: string) {
		const data = { ...formData };
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		data[key] = value;
		setFormData(data);
	}

	async function makeRequest() {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (formData?.interest < 0 || formData?.amount < 0) {
			return alert("Invalid inputs");
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (new Date(formData.date) < new Date()) {
			alert("Date is past the current time");
			return;
		}

		if (
			formData.interest == 0 ||
			formData.amount == 0 ||
			formData.amount == undefined ||
			formData.interest == undefined ||
			formData.date == ""
		) {
			return alert("Invalid inputs");
		}

		try {
			const response = await axios.post(
				"http://localhost:4000/propose",
				{
					interest: formData.interest,
					amount: formData.amount,
					date: formData.date,
					to: to,
				},
				{
					headers,
				}
			);
			console.log(response.status);

			if (response.status == 200) {
				setFormData({ date: "", amount: 0, interest: 0 });
				location.reload();
			} else {
				alert("User not authenticated");
				navigate("/login");
			}
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			alert(err.response.data.message);
		}
	}

	async function cancel(id: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.post(
			"http://localhost:4000/cancel",
			{
				id,
			},
			{
				headers,
			}
		);

		if (response.status == 200) {
			console.log(response.data);
			location.reload();
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	async function accept(id: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.post(
			"http://localhost:4000/accept",
			{
				id,
			},
			{
				headers,
			}
		);

		if (response.status == 200) {
			console.log(response.data);
			location.reload();
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	useEffect(() => {
		if (to === "") setParams();
	});
	return (
		<div className="container profile">
			<header className="transact">
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
							Logout
						</a>
					</span>
				</div>
			</header>
			<main className="transact">
				<div className="request">
					<div className="label">Make Request</div>
					<div className="inputs">
						<label>Amount: </label>
						<Input
							placeholder="Amount. Eg. 100"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("amount", e.target.value)
							}
							value={formData.amount}
						/>
						<label>Interest: </label>

						<Input
							placeholder="Interest. Eg..  10%"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("interest", e.target.value)
							}
							value={formData.interest}
						/>
						<label>Due Date: </label>

						<Input
							placeholder="Due Date"
							type="date"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("date", e.target.value)
							}
							value={formData.date}
						/>
					</div>
					<ActionButton text="Request" onClick={makeRequest} />
				</div>
				<div className="action">
					<div className="label"> Offers: </div>
					{transactions.map((el) => {
						return (
							<div className="offer" key={el._id}>
								<div className="terms">
									<div className="amount">GHc {el?.amount}</div>
									<div className="interest">Interest: {el?.interest}%</div>
									<div className="date">
										{new Date(el.due_date).toLocaleString()}
									</div>
								</div>
								<div className="btns">
									{el.accepted ? (
										el.lender == to ? (
											<ActionButton
												text="Pay Back"
												onClick={async () => {
													const token = localStorage.getItem("token");

													if (!token) {
														alert("User not authenticated");
														navigate("/login");
													}

													const headers = {
														Authorization: `Bearer ${token}`,
													};

													const response = await axios.post(
														`http://localhost:4000/payback?id=${el._id}`,
														{},
														{
															headers,
														}
													);
													if (response.data.status == 200) {
														return setTransactions(response.data.result);
													}
													return alert(response.data.message);

													console.log(response);
												}}
											/>
										) : (
											"Accepted"
										)
									) : (
										<ActionButton
											text="cancel"
											onClick={() => {
												cancel(el._id);
											}}
										/>
									)}
									{el.proposer == to && !el.accepted ? (
										<ActionButton
											text="accept"
											onClick={() => {
												accept(el._id);
											}}
										/>
									) : (
										``
									)}
								</div>
							</div>
						);
					})}
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

export default Transact;
