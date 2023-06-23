import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "./Feed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface UserI {
	_id: string;
	fname: string;
	lname: string;
	email: string;
	password: string;
	occupation: string;
	company: string;
	tax_number: string;
	verified: boolean;
	account_type: "borrower" | "lender";
	points: number;
	contact: string;
	ghana_card: string;
	image: string;
	kin: string;
	kin_contact: string;
	kin_ghana_card: string;
	kin_image: string;
	address: string;
	balance: number;
	promoted: boolean;
	suspended: boolean;
	ratings: RatingI[];
}

interface RatingI {
	from: string;
	rate: number;
}

const Feed = () => {
	const [items, setItems] = useState<UserI[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
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

			const response = await axios.get("http://localhost:4000/showcase", {
				headers: headers,
			});
			if (response.status == 200) {
				console.log(response.data);
				setItems(response.data);
			} else {
				alert("User not authenticated");
				navigate("/login");
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (items.length == 0) fetchData();
	});
	return (
		<div className="container feed">
			<header className="feed">
				<div className="title">Find {items[0]?.account_type || ""}</div>
				<div>
					<span>
						<Link
							to={`${
								items[0]?.account_type == "borrower"
									? "/dashboard/lender"
									: "/dashboard/borrower"
							}`}
						>
							Dashboard
						</Link>{" "}
					</span>
					<input
						type="text"
						className="search"
						placeholder={`Find a ${items[0]?.account_type}`}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						value={searchTerm}
					/>
				</div>
			</header>
			<main className="feed">
				{items.map((item) => {
					if (item?.suspended) return;
					if (!item?.promoted) return;
					if (searchTerm !== "") {
						if (!(item.fname + " " + item.lname).includes(searchTerm)) {
							return;
						}
					}
					return (
						<Card
							key={item._id}
							id={item._id}
							name={item.fname + " " + item.lname}
							image={"http://localhost:4000/" + item.image}
							location={item.address}
							promoted={item.promoted}
						/>
					);
				})}
				{items.map((item) => {
					if (item?.promoted) return;
					if (searchTerm !== "") {
						if (!(item.fname + " " + item.lname).includes(searchTerm)) {
							return;
						}
					}
					return (
						<Card
							key={item._id}
							id={item._id}
							name={item.fname + " " + item.lname}
							image={"http://localhost:4000/" + item.image}
							location={item.address}
						/>
					);
				})}
			</main>
			<footer></footer>
		</div>
	);
};

export default Feed;
