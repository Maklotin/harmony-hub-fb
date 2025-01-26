import {
  TextInput,
  Box,
  Button,
  Textlink,
  ClickableLogo,
} from "~/components/ui-library";
import { signIn, getCurrentUser } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        navigate("/");
      } catch {
        // User is not authenticated
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogin = async () => {
    console.log("Attempting login...");
    try {
      await signIn({ username: email, password });
      navigate("/", { replace: true });
    } catch (error) {
      setError((error as Error).message || "An error occurred during sign-in");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <ClickableLogo />
      <div className="flex flex-col items-center">
        <Box>
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <h3 className="mt-12">Velkommen til</h3>
            <h1 className="">Harmony Hub!</h1>
            <h5 className=" mt-12">Brukernavn eller epost</h5>
            <TextInput
              className="mt-4"
              type="text"
              placeholder="navn.navnesen@epost.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4 className="mt-4">Passord</h4>
            <TextInput
              className="mt-4"
              type="password"
              placeholder="passord123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <p className="font-bold">{error}</p>
              </div>
            )}
            <Button type="submit">
              <p className="drop-shadow-buttonText2">Logg Inn</p>
            </Button>
            <h5 className="mt-6">Har du ikke en bruker?</h5>
            <Textlink className="mb-12" to="/register">
              <h6>Registrer bruker</h6>
            </Textlink>
          </form>
        </Box>
      </div>
    </div>
  );
}
