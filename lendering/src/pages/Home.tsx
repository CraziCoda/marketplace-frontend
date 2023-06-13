import "./Home.css";
import TheImage from "../assets/hero_img.gif";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container home">
			<header className="home">
				<div className="title">LENDERING</div>
				<div className="menu">
					<Link to="/">About</Link>
					<Link to="/login">Login</Link>
					<Link to="/register">Sign Up</Link>
				</div>
			</header>
			<main className="home">
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
					<Link to="/feed/lenders">
						<Button text="Find Lender" type="primary" />
					</Link>
					<Link to="/feed/borrowers">
						<Button text="Find Borrower" type="outline" />
					</Link>
				</div>
				<div className="image">
					<img src={TheImage} alt="img" />
				</div>
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
