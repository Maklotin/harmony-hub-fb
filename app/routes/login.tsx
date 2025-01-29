import {
  TextInput,
  Box,
  Button,
  Textlink,
  ClickableLogo,
} from "~/components/ui-library";
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "~/utils/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    console.log("Attempting login...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setError((error as Error).message || "An error occurred during sign-in");
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Attempting Google login...");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (error) {
      setError(
        (error as Error).message || "An error occurred during Google sign-in"
      );
      console.error("Error signing in with Google:", error);
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
            <h3 className="mt-12">Welcome to</h3>
            <h1 className="">Harmony Hub!</h1>
            <h5 className=" mt-12">Email</h5>
            <TextInput
              className="mt-4"
              type="text"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4 className="mt-4">Password</h4>
            <TextInput
              className="mt-4"
              type="password"
              placeholder="pass1234"
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
              <p className="drop-shadow-buttonText2">Log in</p>
            </Button>
            <p>or</p>
            <Button type="button" onClick={handleGoogleLogin} className="mt-4">
              <i className="ri-google-fill"></i>
              <p className="drop-shadow-buttonText2">Log in with Google</p>
            </Button>
            <h5 className="mt-6">No account?</h5>
            <Textlink className="mb-12" to="/register">
              <h6>Register account</h6>
            </Textlink>
          </form>
        </Box>
      </div>
    </div>
  );
}
