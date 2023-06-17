import { Link } from "react-router-dom";
import "./Chat.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";

const Chat = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);

	return () => {
		socket.off("connect", onConnect);
		socket.off("disconnect", onDisconnect);
	};
	}, []);
	return (
		<div className="container chat">
			<header className="chat">
				<span>
					<Link to="/Feed">LENDERING</Link>
				</span>
			</header>
			<main className="chat">
				<div className="board chat">
					<div className="person">Jeff Sarpong</div>
				</div>
				<div className="panel chat">
					<div className="view">
						{isConnected ? "connected" : "disconnected"}
					</div>
					<div className="message-bar">
						<button>Transact</button>
						<input type="text" placeholder="Enter messsage" />
						<button>Send</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Chat;
