import { ReactEventHandler, useEffect, useState } from "react";
import "./Promotion.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type RequestKeys = "point" | "date";

interface PromotionI {
	points: number;
	due_date: Date;
	amount: number;
	resolved: boolean;
	lender: string;
	paid: boolean;
	_id: string;
}

const Promotion = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		date: "",
		point: 0,
	});
	const [promotions, setPromotions] = useState<PromotionI[]>([]);
	const [called, setCalled] = useState(false);

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
			formData.point == 0 ||
			formData.point == undefined ||
			formData.date == ""
		) {
			return alert("Invalid inputs");
		}

		try {
			const response = await axios.post(
				"http://localhost:4000/requestPromotion",
				{
					points: formData.point,
					due_date: formData.date,
				},
				{
					headers,
				}
			);
			console.log(response.status);

			if (response.status == 200) {
				setFormData({ date: "", point: 0 });
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

	async function getPromos() {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};
		const response = await axios.get(`http://localhost:4000/promotions`, {
			headers: headers,
		});

		if (response.status == 200) {
			setPromotions(response.data);
			setCalled(true);
			console.log(response.data);
		} else {
			alert("User not authenticated");
			navigate("/login");
		}
	}

	useEffect(() => {
		if (!called) getPromos();
	});

	async function accept(id: string) {
		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		try {
			const response = await axios.post(
				`http://localhost:4000/acceptPromo?id=${id}`,
				{},
				{
					headers,
				}
			);

			if (response.status == 200) {
				console.log(response.data);
				setPromotions(response.data);
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

		try {
			const response = await axios.post(
				`http://localhost:4000/cancelPromo?id=${id}`,
				{},
				{
					headers,
				}
			);

			if (response.status == 200) {
				console.log(response.data);
				setPromotions(response.data);
			} else {
				alert("User not authenticated");
				navigate("/login");
			}
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			alert("An error occured");
		}
	}

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
						<label>Points: </label>
						<Input
							placeholder="Amount. Eg. 100"
							type="number"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								changeValue("point", e.target.value)
							}
							value={formData.point}
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
					<div className="label"> Promotion History: </div>
					{promotions.map((el, i) => {
						return (
							<div className="offer" key={i}>
								<div className="terms">
									<div className="amount">GHc {el.amount}</div>
									<div className="interest">Points: {el.points}</div>
									<div className="date">
										{new Date(el.due_date).toLocaleString()}
									</div>
								</div>
								<div className="btns">
									{el.paid ? (
										"Paid"
									) : (
										<ActionButton
											text="Accept"
											onClick={() => {
												accept(el?._id);
											}}
										/>
									)}
									{!el.paid ? (
										<ActionButton
											text="Cancel"
											onClick={() => {
												cancel(el._id);
											}}
										/>
									) : (
										""
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

export default Promotion;
