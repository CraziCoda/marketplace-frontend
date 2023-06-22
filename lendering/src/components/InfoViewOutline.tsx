interface InfoViewOutlineProps {
	main: string;
	label: string;
	value: string;
}
const InfoViewOutline = (props: InfoViewOutlineProps) => {
	return (
		<div style={styles.container}>
			<div style={styles.top}>
				<h1 style={styles.one}>{props.main}</h1>
				<span style={styles.two}>{props.label}</span>
			</div>
			<div style={styles.bottom}>{props.value}</div>
		</div>
	);
};

interface StyleObject {
	[key: string]: React.CSSProperties;
}

const styles: StyleObject = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: 250,
		height: 120,
		backgroundColor: "transparent",
		borderRadius: 20,
		padding: "1em",
		color: "black",
		border: "solid 1px #0981D8",
	},
	top: {
		display: 'flex',
		flexDirection: 'column'
	},
	one: {
		color: "#2E3193",
		fontSize: 20,
	},
	two: {
		color: "#FF9B04",
	},
	bottom: {
		fontWeight: "bold",
		fontSize: 24,
	},
};

export default InfoViewOutline;
