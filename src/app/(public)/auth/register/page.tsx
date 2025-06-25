import { RegisterFooter } from "./components/register-footer"
import { RegisterForm } from "./components/register-form"
import { RegisterOAuth } from "./components/register-oauth"

function RegisterPage() {
    return (
        <div className="w-full min-h-full flex flex-col p-5 space-y-4 text-sm">
            <div className="flex flex-col">
                <span className="text-2xl font-semibold">
                    Registre-se agora!
                </span>
                <span>Aproveite os melhores burguers nos melhores preços</span>
            </div>
            <RegisterForm />
            <div className="flex gap-5 items-center justify-center w-full">
                <div className="border w-full" />
                <span>ou</span>
                <div className="border w-full" />
            </div>
            <RegisterOAuth />
            <RegisterFooter />
        </div>
    )
}

export default RegisterPage
