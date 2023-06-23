import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardL.css";
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

const DashboardL = () => {
	const [data, setData] = useState({});
	const [transactions, setTransactions] = useState<TransactionsI[]>([]);
	const navigate = useNavigate();
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
		<div className="container l">
			{/* <br />
			<InfoViewFill
				bgColor="orange"
				top="GHC 5000.00"
				bottom="Your active something"
			/>

			<InfoViewOutline
				main="Accumulated Score"
				label="Interests"
				value="3000 pts"
			/> */}

			<header className="l">
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

			<main className="main_content l">
				<div className="main_area">
					<div className="design"></div>
					<div className="figures">
						<div className="ac">
							<Link to={`/feed`} className="actions">
								Find Borrower
							</Link>
							<Link to="/me" className="actions">
								Load Wallet
							</Link>
							<a href="#" className="actions">
								Run Ads
							</a>
						</div>
						<div className="stats">
							<InfoViewOutline
								main="Revenue"
								label="Interests"
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								value={`Ghc ${data?.revenue?.toFixed(2)}`}
							/>

							<InfoViewOutline
								main="Accumulate Score"
								label="Points"
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								value={`${data.points}pts`}
							/>

							<InfoViewFill
								bgColor="#0981D8"
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								top={`GHc ${data?.balance?.toFixed(2)}`}
								bottom="Your active balance"
							/>
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
										if (el.accepted == false && el.active == false) return;
										return (
											<tr
												key={i}
												onClick={() => {
													navigate(`/transact?id=${el?.borrower}`);
												}}
											>
												<td>
													{
														// eslint-disable-next-line @typescript-eslint/ban-ts-comment
														//@ts-ignore
														data.names[data.ids.indexOf(el.borrower)]
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
				</div>
			</main>
		</div>
	);
};

export default DashboardL;
