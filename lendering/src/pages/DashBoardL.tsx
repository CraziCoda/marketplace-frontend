import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardL.css";
import { useEffect, useState } from "react";
import axios from "axios";
const DashboardL = () => {
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
				<span>LENDERING</span>
			</header>

			<main className="l">
				<div className="design"></div>
				<div className="figures">
					<div className="ac">
						<Link to="/feed/borrowers" className="actions">
							Find Borrower
						</Link>
						<a href="#" className="actions">
							Load Wallet
						</a>
						<a href="#" className="actions">
							Run Ads
						</a>
					</div>
					<div className="stats">
						<InfoViewOutline
							main="Accumulated Score"
							label="Interests"
							value="3000 pts"
						/>

						<InfoViewOutline
							main="Accumulate Score"
							label="Interests"
							value="30 pts"
						/>

						<InfoViewFill
							bgColor="#0981D8"
							top="GHC 5000.00"
							bottom="Your active something"
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardL;
