interface InfoViewFillProps {
	bgColor?: string;
	top: string;
	bottom: string;
}
const InfoViewFill = (props: InfoViewFillProps) => {
	return (
		<div style={styles.container}>
			<div style={styles.top}>{props.top}</div>
			<div>{props.bottom}</div>
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
		backgroundColor: "red",
		borderRadius: 40,
		padding: "30px 30px",
		color: "white",
	},
	top: {
		fontSize: 32,
		fontWeight: "bolder",
		marginBottom: 55,
	},
};

export default InfoViewFill;
