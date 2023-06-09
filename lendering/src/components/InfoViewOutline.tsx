interface InfoViewOutlineProps {
	main: string,
	label: string,
	value: string
}
const InfoViewOutline = (props: InfoViewOutlineProps) => {
	return (
		<div style={styles.container}>
			<div style={styles.top}>
				<span style={styles.one}>Accumulated Score</span>
				<br></br>
				<span style={styles.two}>Interests</span>
			</div>
			<div style={styles.bottom}>3000 pts </div>
		</div>
	);
};

interface StyleObject {
	[key: string]: React.CSSProperties;
}

const styles: StyleObject = {
	container: {
		width: 250,
		height: 120,
		backgroundColor: "transparent",
		borderRadius: 40,
		padding: "30px 30px",
		color: "black",
		border: "solid 1px #0981D8",
	},
	top: {
		marginBottom: 35,
	},
	one: {
		color: "#2E3193",
		fontSize: 20,
	},
	two: {
		color: "#FF9B04",
	},
	bottom: {
		fontWeight: 'bold',
		fontSize: 24
	},
};

export default InfoViewOutline;
