import { Card, CardContent } from "@/components/atoms/card"
import { LoginForm } from "./components/login-form"
import { LoginLogoHeader } from "@/components/molecules/login-logo-header"

function LoginPage() {
    return (
        <div className="min-h-screen flex justify-center p-5 bg-gray-5 flex-col items-center gap-10">
            <LoginLogoHeader />
            <Card className="p-10 w-auto max-w-md">
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
