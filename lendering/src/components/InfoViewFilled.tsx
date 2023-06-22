interface InfoViewFillProps {
	bgColor?: string;
	top: string;
	bottom: string;
}
const InfoViewFill = (props: InfoViewFillProps) => {
	return (
		<div style={styles.container}>
			<h1 style={styles.top}>{props.top}</h1>
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
		borderRadius: 20,
		padding: '1em',
		display: "flex",
		flexDirection: 'column',

		color: "white",
	},
	top: {
		fontSize: 32,
		fontWeight: "bolder",
	},
};

export default InfoViewFill;
