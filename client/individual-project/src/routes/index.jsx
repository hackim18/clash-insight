import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import PlayerDetail from "../views/PlayerDetail";
import PlayerRankings from "../views/PlayerRankings";
import ClanDetail from "../views/ClanDetail";
import PlayerVerification from "../views/PlayerVerification";
import Login from "../views/Login";
import MyAccounts from "../views/MyAccounts";
import Register from "../views/Register";
import ChangePassword from "../views/ChangePassword";
import ImageGallery from "../views/ImageGallery";
import ClanRankings from "../views/ClanRankings";
import Navbar from "../components/Navbar";
import UnlockVip from "../views/UnlockVip";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
      </>
    ),
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Login />,
        path: "/login",
        loader: async () => {
          return localStorage.getItem("access_token") ? redirect("/") : null;
        },
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <ChangePassword />,
        path: "/change-password",
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
      {
        element: <MyAccounts />,
        path: "/my-accounts",
        protected: true,
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
      {
        element: <PlayerDetail />,
        path: "/player/detail/:playerTag",
        protected: true,
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
      {
        element: <PlayerVerification />,
        path: "/player/detail/:playerTag/verify",
        protected: true,
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
      {
        element: <ClanDetail />,
        path: "clan/detail/:clanTag",
      },
      {
        element: <PlayerRankings />,
        path: "/player-rankings",
      },
      {
        element: <ClanRankings />,
        path: "/clan-rankings",
      },
      {
        element: <ImageGallery />,
        path: "/admin/images",
        protected: true,
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
      {
        element: <UnlockVip />,
        path: "/unlock-vip",
        protected: true,
        loader: async () => {
          return !localStorage.getItem("access_token") ? redirect("/login") : null;
        },
      },
    ],
  },
]);

export default router;
