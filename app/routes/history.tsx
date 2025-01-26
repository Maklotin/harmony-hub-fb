import Nav from "~/components/Nav";
import { ClickableLogo } from "~/components/ui-library";

export default function History() {
  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <ClickableLogo />
        <Nav />
      </div>
      <div className="flex flex-col items-center">
        <h1>History</h1>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
