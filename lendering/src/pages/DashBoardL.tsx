import { Link, useNavigate } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardL.css";
import { useEffect, useState } from "react";
import axios from "axios";
const DashboardL = () => {
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
						<Link to="/feed" className="actions">
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
							value={`Ghc ${data.revenue}`}
						/>

						<InfoViewOutline
							main="Accumulate Score"
							label="Interests"
							value="30 pts"
						/>

						<InfoViewFill
							bgColor="#0981D8"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							top={`GHc ${data?.balance}`}
							bottom="Your active balance"
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardL;
