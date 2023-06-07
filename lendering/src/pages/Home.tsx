import "./Home.css";
const Home = () => {
	return (
		<div className="container">
			<header>
				<div className="title">LENDERING</div>
				<div className="menu">
					<a href="#">About</a>
					<a href="#">Login</a>
					<a href="#">Sign Up</a>
				</div>
			</header>
			<main>
				<div className="text">
					<span className="loud">Lend out,</span>
					<br />
					<span className="loud">Borrow Now</span>
					<div className="desc"></div>
					<span style={{ color: "0670BD" }}>Lendering</span> allow you to lend
					as little as 10ghs,
					<br /> and make impact in someone’s life.
					<br />
					<br />
					<Button text="Find Lender" type="primary" />
					<Button text="Find Borrower" type="outline" />
				</div>
				<div className="image"></div>
			</main>
			<footer></footer>
		</div>
	);
};

interface ButtonProps {
	text: string;
	type: "primary" | "outline";
}

const Button = (props: ButtonProps) => {
	return (
		<button className={"btn " + props.type} style={{}}>
			{props.text}
		</button>
	);
};

export default Home;
