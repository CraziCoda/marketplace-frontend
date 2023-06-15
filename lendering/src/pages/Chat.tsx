import "./Chat.css"
const Chat = () => {
	return (
		<div className="container chat">
			<header className="chat">
				<span>LENDERING</span>
			</header>
            <main className="chat">
                <div className="board chat">
                    <div className="person">Jeff Sarpong</div>
                </div>
                <div className="panel chat">
					<div className="view"></div>
					<div className="message-bar">
						<input type="text" placeholder="Enter messsage"/>
						<button>Send</button>
					</div>
				</div>
            </main>
		</div>
	);
};

export default Chat;
