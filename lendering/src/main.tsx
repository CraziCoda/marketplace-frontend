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
import Profile from "./pages/Profile.tsx";
import Transact from "./pages/Transact.tsx";
import Me from "./pages/Me.tsx";
import Admin from "./pages/Admin.tsx";
import AdminView from "./pages/AdminView.tsx";

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
		path: "feed",
		element: <Feed />,
	},

	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/transact",
		element: <Transact />,
	},
	{
		path: "/me",
		element: <Me />,
	},

	{
		path: "/admin",
		element: <Admin />,
	},

	{
		path: "/adminview",
		element: <AdminView />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
