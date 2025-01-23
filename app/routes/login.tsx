import { TextInput, Box, Button, Textlink, ClickableLogo } from "~/components/ui-library";

export default function Login() {
  return (
    <div>
      <ClickableLogo />
      <div className="flex flex-col items-center">
        <Box>
          <form className="flex flex-col items-center">
            <h3 className="mt-12">Velkommen til</h3>
            <h1 className="">Harmony Hub!</h1>
            <h5 className=" mt-12">Brukernavn eller epost</h5>
            <TextInput
              className="mt-4"
              type="text"
              placeholder="navn.navnesen@epost.no"
            />
            <h4 className="mt-4">Passord</h4>
            <TextInput
              className="mt-4"
              type="password"
              placeholder="passord123"
            />
            <Button type="submit">
              <p className="drop-shadow-buttonText2 ">Logg Inn</p>
            </Button>
            <h4>Eller</h4>
            <Button className="flex">
              <i className="ri-google-fill mr-2 drop-shadow-buttonText1"></i>
              <p className="text-lg drop-shadow-buttonText1">Google logg inn</p>
            </Button>
            <h5>Har du ikke en bruker?</h5>
            <Textlink className="mb-12" to="/register">
              <h6>Registrer bruker</h6>
            </Textlink>
          </form>
        </Box>
      </div>
    </div>
  );
}
