import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardB.css";
import { useEffect, useState } from "react";
import axios from "axios";
const DashboardB = () => {
	const [user, setUser] = useState({});
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
			setUser(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!user?.fname) fetchData();
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
							label="Interests"
							value="3000 pts"
						/>

						<InfoViewOutline
							main="Relations"
							label="Lender"
							value="4"
						/>

						<InfoViewFill
							bgColor="orange"
							top="GHC -5000.00"
							bottom="Your active debt"
						/>
					</div>

					<div className="ac">
						<Link to="/feed/lenders" className="actions">
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
