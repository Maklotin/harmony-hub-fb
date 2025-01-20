import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { AuthProvider } from "react-oidc-context";
import { json } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

type LoaderData = {
  AUTHORITY: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
  SCOPE: string;
}

export const loader: LoaderFunction = async () => {
  return json ({
    AUTHORITY: process.env.AUTHORITY,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    RESPONSE_TYPE: process.env.RESPONSE_TYPE,
    SCOPE: process.env.SCOPE,
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const env = useLoaderData<LoaderData>();

  const cognitoAuthConfig = {
    authority: env.AUTHORITY,
    client_id: env.CLIENT_ID,
    redirect_uri: env.REDIRECT_URI,
    response_type: env.RESPONSE_TYPE,
    scope: env.SCOPE,
  };

  return (
    <html lang="en">
      <AuthProvider {...cognitoAuthConfig}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </AuthProvider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
