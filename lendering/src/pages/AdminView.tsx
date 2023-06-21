import { ReactEventHandler, useEffect, useState } from "react";
import "./AdminView.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserI {
	_id?: string;
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
	ratings: RatingI[];
}

interface RatingI {
	from: string;
	rate: number;
}

interface ImagesI {
	type: string;
	url: string;
}

const AdminView = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const [user, setUser] = useState<UserI>({});
	const [userID, setID] = useState("");
	const [images, setImages] = useState<ImagesI[]>([]);
	const [currentImage, setCurrentImage] = useState(0);
	const navigate = useNavigate();

	async function findUser() {
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get("id");
		if (id == null) return navigate("/");

		const result = await axios.get(`http://localhost:4000/view?id=${id}`);
		setID(id);
		setUser(result.data);

		const keys = [
			"User Image",
			"Ghana Card",
			"Next of Kin Image",
			"Next of Kin Ghana",
		];

		const keysO = ["image", "ghana_card", "kin_image", "kin_ghana_card"];

		const img_arr = [];

		for (let i = 0; i < keys.length; i++) {
			const img = {
				type: keys[i],
				url: result.data[keysO[i]],
			};

			img_arr.push(img);
		}

		setImages(img_arr);
		console.log(img_arr);

		console.log(result.data);
	}

	function nextImage() {
		if (currentImage >= images.length - 1) {
			return setCurrentImage(0);
		}

		setCurrentImage(currentImage + 1);
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!user?.fname) findUser();
	});

	return (
		<div className="container adminview">
			<header className="adminview">
				<span>
					<Link to="/Feed">LENDERING</Link>
				</span>
			</header>
			<main className="adminview">
				<div className="img-type">{images[currentImage]?.type}</div>
				<div className="image">
					<img src={`http://localhost:4000/${images[currentImage]?.url}`} />
				</div>
				<div className="switch">
					<ActionButton text="next" onClick={nextImage} />
				</div>
				<div className="desc">
					<div>
						<Label label="Name" value={user.fname + " " + user.lname} />
						<Label label="Occupation" value={user.occupation} />
						<Label label="Account Type" value={user.account_type} />
						<Label label="Rating" value="Not Rated" />
						<Label label="Contact" value={user.contact} />
						<Label label="Location" value={user.address} />
						<Label label="Company" value={user.company || "Not Available"} />
					</div>
					<div>
						<Label label="Verifed" value={user.verified ? "Yes" : "No"} />
						<Label label="Points" value={user.points} />
					</div>
				</div>
				<div className="actions">
					<ActionButton
						text="Verify"
						onClick={async () => {
							const token = localStorage.getItem("token");

							if (!token) {
								alert("User not authenticated");
								navigate("/login");
							}

							const headers = {
								Authorization: `Bearer ${token}`,
							};

							const result = await axios.get(
								`http://localhost:4000/verify?id=${userID}`,
								{ headers }
							);

							setUser(result.data);
						}}
						disabled={user.verified}
					/>
					<ActionButton text="Promote" />
					<ActionButton text="Suspend" />
				</div>
			</main>
		</div>
	);
};

interface LabelProps {
	label: string;
	value: string | number;
}

const Label = (props: LabelProps) => {
	return (
		<div className="label">
			<div className="left">{props.label}:</div>
			<div className="right">{props.value}</div>
		</div>
	);
};

interface ActionButtonProps {
	text: string;
	onClick?: ReactEventHandler;
	disabled?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
	return (
		<button
			className="actionBtn"
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.text}
		</button>
	);
};

export default AdminView;
