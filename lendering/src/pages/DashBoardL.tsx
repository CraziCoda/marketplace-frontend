import { Link } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardL.css";
const DashboardL = () => {
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
							main="Accumulated Score"
							label="Interests"
							value="3000 pts"
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
