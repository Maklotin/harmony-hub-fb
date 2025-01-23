import { useState } from "react";
import { Box, Button, ClickableLogo, TextInput, Textlink } from "~/components/ui-library";

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);

    function StepOne() {
        return (
            <div className="flex flex-col items-center">
                <h4 className="mt-4">Brukernavn</h4>
                <TextInput className="mt-4" type="text" placeholder="navn navnesen" />
                <h4 className="mt-4">Epost</h4>
                <TextInput className="mt-4" type="email" placeholder="navn@epost.no" />
                <h4 className="mt-4">Passord</h4>
                <TextInput className="mt-4" type="password" placeholder="passord123" />
                <h4 className="mt-4">Bekreft passord</h4>
                <TextInput className="mt-4 mb-12" type="password" placeholder="passord123" />
                <Button type="button" onClick={() => setCurrentStep(2)}>
                    <p>Neste steg</p>
                    <i className="ri-arrow-right-line ml-2"></i>
                </Button>
            </div>
        );
    }

    function StepTwo() {
        return (
            <div className="flex flex-col items-center">
                <h4 className="mt-4">Favoritt sjanger</h4>
                <TextInput className="mt-4" type="text" placeholder="f. Eks rap, rock, jazz" />
                <h4 className="mt-4">Favoritt artist</h4>
                <TextInput className="mt-4" type="text" placeholder="f. Eks Queen, Michael Jackson" />
                <h4 className="mt-4">Favoritt album</h4>
                <TextInput className="mt-4" type="text" placeholder="f. Eks The Dark Side of the Moon" />
                <h4 className="mt-4">Favoritt sanger</h4>
                <TextInput className="mt-4 mb-12" type="text" placeholder="f. Eks Bohemian Rhapsody" />
                <Button type="submit" className="bg-emerald !shadow-darkForest">
                    <p>Fullfør registrering</p>
                    <i className="ri-check-line ml-2"></i>
                </Button>
                <Button type="button" onClick={() => setCurrentStep(1)}>
                    <i className="ri-arrow-left-line mr-2"></i>
                    <p>Gå tilbake</p>
                </Button>
            </div>
        );
    }

    return (
        <div>
            <ClickableLogo />
            <div className="flex flex-col items-center">
                <Box>
                    <form className="flex flex-col items-center justify-center">
                        <h1 className="mt-12">Registrer bruker</h1>
                        <div className="flex flex-row justify-evenly items-center m-4 w-full">
                            {/* <h1 className="text-saffron w-4 m-2">1</h1>
                            <progress value={currentStep === 1 ? 0.1 : 1} max={1} className="w-2/3 h-6 bg-darkPurple"></progress>
                            <h1 className="text-saffron w-4 m-2">2</h1> */}
                        </div>
                        <div>
                            {/* {currentStep === 1 ? <StepOne /> : <StepTwo />} */}
                            <StepOne />
                        </div>
                        <Textlink to="/" className="mb-4">
                            <p>Gå tilbake til innlogging</p>
                        </Textlink>
                    </form>
                </Box>
            </div>
        </div>
    );
}