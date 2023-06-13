import { Link } from "react-router-dom";
import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardB.css";
const DashboardB = () => {
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
							main="Accumulated Score"
							label="Lender"
							value="3000 pts"
						/>

						<InfoViewFill
							bgColor="orange"
							top="GHC 5000.00"
							bottom="Your active something"
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
