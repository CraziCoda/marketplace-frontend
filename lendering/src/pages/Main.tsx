import Card from "../components/Card";
import "./Main.css";
const Main = () => {
	return (
		<div className="container">
			<main>
				<div className="unit">
					<div className="title">Ranking Lenders</div>
					<div className="list">
						<Card />
						<Card />
						<Card />
					</div>
				</div>

				<div className="unit">
					<div className="title">Most loyal borrowers</div>
					<div className="list">
						<Card />
						<Card />
						<Card />
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default Main;
