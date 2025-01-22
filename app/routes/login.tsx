import { TextInput, Box, Button, Textlink } from "~/components/ui-library";

export default function Login() {
  return (
    <Box>
      <h3 className="text-3xl mt-12">Velkommen til</h3>
      <h1 className="text-6xl">Harmony Hub!</h1>
      <h3 className="text-2xl mt-12">Brukernavn eller epost</h3>
      <TextInput className="mt-4" placeholder="navn.navnesen@epost.no" />
      <h3 className="text-3xl mt-4">Passord</h3>
      <TextInput className="mt-4" placeholder="passord123" />
      <Button>
        <p className="drop-shadow-buttonText2 text-3xl">Logg Inn</p>
      </Button>
      <h2 className="text-2xl">Eller</h2>
      <Button className="flex">
        <i className="ri-google-fill mr-2 drop-shadow-buttonText1"></i>
        <p className="text-lg drop-shadow-buttonText1">Google logg inn</p>
      </Button>
      <h2 className="text-2xl">Har du ikke en bruker?</h2>
      <Textlink className="mb-12" to="/register">
        Registrer bruker
      </Textlink>
    </Box>
  );
}
