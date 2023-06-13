import Card from "../components/Card";
import "./Feed.css";
const Feed = () => {
	return (
		<div className="container feed">
			<header className="feed">
				<div className="title">Find Lender</div>
				<div>
					<input type="text" className="search" placeholder="Find a Lender" />
				</div>
			</header>
			<main className="feed">
				<Card />
				<Card />
				<Card />

				<Card />
				<Card />
				<Card />
			</main>
			<footer></footer>
		</div>
	);
};

export default Feed;
