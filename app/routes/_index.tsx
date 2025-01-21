import type { MetaFunction } from "@remix-run/node";
import Login from "./login";
import { useAuth } from "react-oidc-context";

export const meta: MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const auth = useAuth();

  // function signOutRedirect() {
  //   const clientId = process.env.CLIENT_ID;
  //   const logoutUri = process.env.LOGOUT_URI;
  //   const cognitoDomain = process.env.COGNITO_DOMAIN;
  //   window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  // }
  // const user = false;

  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  if (auth.error) {
    return <p>error loading user: {auth.error.message}</p>;
  }

  return (
    <div>
      <img alt="Harmony Hub Logo" src="/HarmonyHubLogo.svg" draggable="false" className="max-w-96 p-8" />
      <div className="flex flex-col items-center">
        {/* {user ? <p>Welcome back!</p> : <Login />} */}
        <Login />
      </div>
    </div>
  );
}
