import { Button } from "@/components/atoms/button"
import { Chrome, Facebook, Phone } from "lucide-react"

function LoginOAuth() {
    return (
        <div className="space-y-2 w-full">
            <Button
                variant={"outline"}
                className="flex items-center justify-center gap-2 w-full"
            >
                <Chrome className="size-5" /> Faça login com o Google
            </Button>
            <Button
                variant={"outline"}
                className="flex items-center justify-center gap-2 w-full"
            >
                <Phone className="size-5" /> Faça login com o telefone
            </Button>
        </div>
    )
}

export { LoginOAuth }
