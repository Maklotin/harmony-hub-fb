import { Navbutton } from "./ui-library";
import { useLocation } from "@remix-run/react";

export default function Nav() {
  const location = useLocation();

  return (
    <div className="flex items-center w-1/2 justify-around">
      <Navbutton
        to="/"
        icon="ri-music-ai-fill"
        className={location.pathname === "/" ? "text-saffron" : ""}
      >
        Home
      </Navbutton>
      <Navbutton
        to="/history"
        icon="ri-history-line"
        className={location.pathname === "/history" ? "text-saffron" : ""}
      >
        History
      </Navbutton>
      <Navbutton
        to="/settings"
        icon="ri-user-3-fill"
        className={location.pathname === "/settings" ? "text-saffron" : ""}
      >
        User settings
      </Navbutton>
    </div>
  );
}
