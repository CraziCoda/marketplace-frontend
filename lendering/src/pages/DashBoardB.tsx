import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardB.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
	debt: number;
}

const DashboardB = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const [transactions, setTransactions] = useState<TransactionsI[]>([]);

	async function fetchData() {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				alert("User not authenticated");
				navigate("/login");
			}

			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const response = await axios.get("http://localhost:4000/dashboard", {
				headers,
			});
			console.log(response.data);
			setData(response.data);
			setTransactions(response.data.transactions);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (data?.balance == 0) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!data?.balance) fetchData();
	});

	return (
		<div className="container b">
			<header className="b">
				<div>
					<span>LENDERING</span>
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

			<main className="b">
				<div className="design"></div>
				<div className="figures">
					<div className="stats">
						<InfoViewOutline
							main="Accumulated Score"
							label="Points"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							value={`${data.points.toFixed(2)}`}
						/>

						<InfoViewOutline
							main="Debt"
							label="Amount owed"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							value={data.debt.toFixed(2)}
						/>

						<InfoViewFill
							bgColor="orange"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							top={ data.balance.toFixed(2)}
							bottom="Your active balance"
						/>
					</div>

					<div className="ac">
						<Link to="/feed" className="actions">
							Find Lender
						</Link>
						<Link to="/me" className="actions">
							Load Wallet
						</Link>
						<Link
							to="#"
							className="actions"
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
									"http://localhost:4000/payback",
									{},
									{
										headers,
									}
								);

								console.log(response);
							}}
						>
							Pay Back Loan
						</Link>
					</div>

					<div className="tables">
						<table>
							<thead>
								<tr>
									<th>Client Name</th>
									<th>Paid</th>
									<th>Amount (Interest %)</th>
								</tr>
							</thead>
							<tbody>
								{transactions.map((el, i) => {
									return (
										<tr
											key={i}
											onClick={() => {
												navigate(`/transact?id=${el?.lender}`);
											}}
										>
											<td>
												{
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													//@ts-ignore
													data.names[data.ids.indexOf(el.lender)]
												}
											</td>
											<td>
												{el.accepted && !el.active ? (
													<span style={{ color: "green" }}>Yes</span>
												) : (
													<span style={{ color: "red" }}>No</span>
												)}
											</td>
											<td style={{ fontWeight: "bold" }}>
												{el.amount} GHS ({el.interest}%)
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardB;
