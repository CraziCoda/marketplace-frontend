import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import DashboardB from "./pages/DashBoardB.tsx";
import DashboardL from "./pages/DashBoardL.tsx";
import Chat from "./pages/Chat.tsx";
import Feed from "./pages/Feed.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<App>
				<Home />
			</App>
		),
	},
	{
		path: "login",
		element: <Signin />,
	},

	{
		path: "register",
		element: <Signup />,
	},
	{
		path: "dashboard/borrower",
		element: <DashboardB />,
	},
  {
		path: "dashboard/lender",
		element: <DashboardL />,
	},
  {
		path: "chat",
		element: <Chat />,
	},
  {
		path: "feed/:type",
		element: <Feed />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
