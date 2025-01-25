import type { MetaFunction } from "@remix-run/node";
import DiscoverMusic from "~/components/DiscoverMusic";
import Nav from "~/components/Nav";
import { ClickableLogo } from "~/components/ui-library";

export const meta: MetaFunction = () => {
  return [
    { title: "Harmony Hub" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
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
