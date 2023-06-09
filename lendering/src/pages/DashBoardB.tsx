import InfoViewFill from "../components/InfoViewFilled";
import InfoViewOutline from "../components/InfoViewOutline";
import "./DashboardB.css";
const DashboardB = () => {
	return (
		<div className="container">
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

			<header>
				<span>LENDERING</span>
			</header>

			<main>
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
						<a href="#" className="actions">
							Find Lender
						</a>
						<a href="#" className="actions">
							Pay Back Loan
						</a>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardB;
