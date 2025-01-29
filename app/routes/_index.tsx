import type { MetaFunction } from "@remix-run/node";
import DiscoverMusic from "~/components/DiscoverMusic";
import Nav from "~/components/Nav";
import { ClickableLogo } from "~/components/ui-library";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { auth } from "~/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div><p>Loading...</p></div>;
  }

  return <div>{isAuthenticated ? <Home /> : null}</div>;
}

function Home() {
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <ClickableLogo />
        <Nav />
      </div>
      <div className="flex flex-col items-center">
        <DiscoverMusic />
      </div>
    </div>
  );
}
