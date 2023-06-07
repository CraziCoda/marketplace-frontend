import Card from "../components/Card";
import "./Feed.css";
const Feed = () => {
	return (
		<div className="container">
			<header>
				<div className="title">Find Lender</div>
				<div>
					<input type="text" className="search" placeholder="Find a Lender" />
				</div>
			</header>
			<main>
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
