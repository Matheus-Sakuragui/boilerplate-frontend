import { LoginFooter } from "./components/login-footer"
import { LoginForm } from "./components/login-form"
import { LoginHeader } from "./components/login-header"
import { LoginOAuth } from "./components/login-oauth"

function LoginPage() {
    return (
        <div className="w-full min-h-full flex flex-col p-5 space-y-8 text-sm mt-14">
            <LoginHeader />
            <LoginForm />
            <div className="flex gap-5 items-center justify-center w-full">
                <div className="border w-full" />
                <span>ou</span>
                <div className="border w-full" />
            </div>
            <LoginOAuth />
            <LoginFooter />
        </div>
    )
}

export default LoginPage
