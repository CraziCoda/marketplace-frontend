import { useNavigate } from "react-router-dom";

interface CardProps {
	image: string;
	name: string;
	id: string;
	location: string;
}

const Card = (props: CardProps) => {
	const navigate = useNavigate();


	function open(id: string){
		navigate(`/profile?id=${id}`)
	}
	return (
		<div style={style.card}>
			<div style={style.top}>
				<div style={style.image}>
					<img src={props.image} alt={props.name} style={style.img}/>
				</div>
			</div>
			<div style={style.bottom}>
				<div style={style.user}>{props.name}</div>
				<div style={style.desc}>
					Small description very short. A brief bragging rights.
				</div>
				<div style={style.desc}>{props.location}</div>
				<div style={style.foot}>
					<div style={style.rating}>No ratings</div>
					<button style={style.button} onClick={()=>{open(props.id)}}>View</button>
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
	img: {
		width:230,
		height: 80,
		objectFit: "cover",
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
