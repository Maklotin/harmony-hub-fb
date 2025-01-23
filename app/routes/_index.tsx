import type { MetaFunction } from "@remix-run/node";
import Home from "./home";
import { ClickableLogo } from "~/components/ui-library";
import { useEffect, useState } from "react";
import userpool from "~/utils/userpool";
import { Navigate, useNavigate } from "@remix-run/react";
import Login from "./login";

export const meta: MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  return (
    <div>
      <ClickableLogo />
      <div className="flex flex-col items-center">
        <Home />
      </div>
    </div>
  );
}
