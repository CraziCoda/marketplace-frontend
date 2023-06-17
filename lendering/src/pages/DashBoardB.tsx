import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardB.css";
import { useEffect, useState } from "react";
import axios from "axios";
const DashboardB = () => {
	const [data, setData] = useState({});
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
				<span>LENDERING</span>
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
							value={`${data.points}`}
						/>

						<InfoViewOutline
							main="Debt"
							label="Amount owed"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							value={data.debt}
						/>

						<InfoViewFill
							bgColor="orange"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							top={data.balance}
							bottom="Your active balance"
						/>
					</div>

					<div className="ac">
						<Link to="/feed" className="actions">
							Find Lender
						</Link>
						<Link to="#" className="actions">
							Pay Back Loan
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardB;
