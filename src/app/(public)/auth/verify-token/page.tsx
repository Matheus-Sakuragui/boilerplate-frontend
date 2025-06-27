import { Card, CardContent, CardHeader } from "@/components/atoms/card"
import { VerifyTokenForm } from "./components/verify-token-form"
import { LoginLogoHeader } from "@/components/molecules/login-logo-header"
import { VerifyTokenHeader } from "./components/verify-token-header"

function VerifyToken() {
    return (
        <div className="min-h-screen flex justify-center p-5 bg-gray-5 flex-col items-center gap-10">
            <LoginLogoHeader />

            <Card className="p-10 w-auto max-w-md">
            <CardHeader>
                <VerifyTokenHeader  email="math****@jetsoft.com.br"/>

            </CardHeader>
                <CardContent className=" flex justify-center ">
                    <VerifyTokenForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyToken
