import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import {
  Box,
  Button,
  ClickableLogo,
  TextInput,
  Textlink,
} from "~/components/ui-library";

export default function Register() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  return (
    <div>
      <ClickableLogo />
      <div className="flex flex-col items-center">
        <Box>
          <form className="flex flex-col items-center justify-center">
            <h2 className="mt-12 underline">Registrer bruker</h2>
            <div className="flex flex-col items-center">
              <h4 className="mt-4">Brukernavn</h4>
              <TextInput
                className="mt-4"
                type="text"
                placeholder="navn navnesen"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <h4 className="mt-4">Epost</h4>
              <TextInput
                className="mt-4"
                type="email"
                placeholder="navn@epost.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <h4 className="mt-4">Passord</h4>
              <TextInput
                className="mt-4"
                type="password"
                placeholder="passord123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <h4 className="mt-4">Bekreft passord</h4>
              <TextInput
                className="mt-4 mb-12"
                type="password"
                placeholder="passord123"
                required
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="bg-emerald !shadow-darkForest">
                <p>Fullfør registrering</p>
                <i className="ri-check-line ml-2"></i>
              </Button>
            </div>
            <Textlink to="/login" className="mb-4">
              <p>Gå tilbake til innlogging</p>
            </Textlink>
          </form>
        </Box>
      </div>
    </div>
  );
}
