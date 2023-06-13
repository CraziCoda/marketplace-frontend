import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const Card = () => {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dljjxmrex",
		},
	});

	const myImage = cld.image("sample");
	myImage.resize(fill().width(230).height(90));

	return (
		<div style={style.card}>
			<div style={style.top}>
				<div style={style.image}>
					<AdvancedImage cldImg={myImage} />
				</div>
			</div>
			<div style={style.bottom}>
				<div style={style.user}>B & L Saving</div>
				<div style={style.desc}>
					Small description very short. A brief bragging rights.
				</div>
				<div style={style.desc}>Kumasi, GHana</div>
				<div style={style.foot}>
					<div style={style.rating}>3 star ratings</div>
					<button style={style.button}>View</button>
				</div>
			</div>
		</div>
	);
};

interface StyleObject {
	[key: string]: React.CSSProperties;
}

const style: StyleObject = {
	card: {
		width: 250,
		height: 250,
		boxShadow: "0px 0px 2px grey",
		borderRadius: 5,
	},
	top: {
		width: "100%",
		height: "40%",
		paddingTop: 5,
	},
	bottom: {
		width: "90%",
		height: "60%",
		paddingLeft: 10,
	},
	image: {
		backgroundColor: "#F0F0F0",
		minWidth: "80%",
		height: "80%",
		margin: 10,
	},
	name: {},
	desc: {
		fontSize: 12,
		marginBottom: 10,
		color: "#646161",
	},
	foot: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
	},
	rating: {
		fontSize: 12,
		fontWeight: "bold",
	},
	button: {
		width: 70,
		height: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0670BD",
		borderRadius: 0,
	},
};

export default Card;
