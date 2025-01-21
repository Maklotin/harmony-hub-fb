import { TextInput } from "~/components/ui-library";


export default function Login() {

    return (
        <div className="border-4 border-[#451F55] rounded-3xl w-1/3 h-1/2 flex justify-center items-center flex-col">
            <h3 className="text-3xl mt-12">Velkommen til</h3>
            <h1 className="text-6xl">Harmony Hub!</h1>
            <h3 className="text-2xl mt-12">Brukernavn eller epost</h3>
            <TextInput />
        </div>
    )
}