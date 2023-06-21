import { Link, useNavigate } from "react-router-dom";
import "./Chat.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [msg, setMsg] = useState("");
	const [user, setUser] = useState("");
	const [messages, setMessages] = useState([]);
	const navigate = useNavigate();

	async function getUser() {
		if (user === "") {
			const token = localStorage.getItem("token");

			if (!token) {
				alert("User not authenticated");
				navigate("/login");
			}

			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const result = await axios.get(`http://localhost:4000/me`, { headers });
			setUser(result.data._id);

			localStorage.setItem("chat_id", result.data._id);

			return result.data._id;
		}
	}

	function viewMessages(data: []) {
		setMessages(data);
	}

	useEffect(() => {
		getUser();
		async function onConnect() {
			setIsConnected(true);
			if (user != "") socket.emit("addUser", { user, sockID: socket.id });
			else
				socket.emit("addUser", {
					user: user == "" ? localStorage.getItem("chat_id") : user,
					sockID: socket.id,
				});
			console.log(user);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("messages", viewMessages);

		socket.connect();
		loadMessages();

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	});

	async function send() {
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get("id");

		const token = localStorage.getItem("token");

		if (!token) {
			alert("User not authenticated");
			navigate("/login");
		}

		const headers = {
			Authorization: `Bearer ${token}`,
		};

		let from = "";

		if (user != "") {
			const result = await axios.get(`http://localhost:4000/me`, { headers });
			console.log(result.data);
			setUser(result.data._id);
			from = result.data._id;
		} else {
			from = user;
		}

		socket.emit("newMessage", {
			to: id,
			msg: msg,
			date: new Date(),
			from: from,
		});

		setMsg("");
	}

	function loadMessages() {
		const queryString = location.search;
		const params = new URLSearchParams(queryString);
		const id = params.get("id");

		socket.emit("fetchMessages", { user1: user, user2: id });
	}
	return (
		<div className="container chat">
			<header className="chat">
				<span>
					<Link to="/Feed">LENDERING</Link>
				</span>
			</header>
			<main className="chat">
				<div className="board chat">
					{/* <div className="person">Jeff Sarpong</div> */}
				</div>
				<div className="panel chat">
					<div className="view">
						<div className="box">
							{messages.map((el) => {
								return (
									<div
										className={
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											//@ts-ignore
											`message-box ${el.from == user ? "right" : ""}
									`
										}
									>
										<div>
											{
												// eslint-disable-next-line @typescript-eslint/ban-ts-comment
												//@ts-ignore
												el?.message
											}
										</div>
										<div className="date">
											{
												// eslint-disable-next-line @typescript-eslint/ban-ts-comment
												//@ts-ignore
												`${new Date(el?.time).getHours()}:${new Date(
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													//@ts-ignore
													el?.time
												).getMinutes()}`
											}
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="message-bar">
						<button>Transact</button>
						<input
							type="text"
							value={msg}
							placeholder="Enter messsage"
							onChange={(e) => {
								setMsg(e.target.value);
							}}
						/>
						<button onClick={send}>Send</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Chat;
