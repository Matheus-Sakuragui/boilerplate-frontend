import { Chrome } from "lucide-react"
import { Button } from "@/components/atoms/button"

function RegisterOAuth() {
    return (
        <Button
            variant={"outline"}
            className="flex items-center justify-center gap-2"
        >
            <Chrome className="size-5" />
            Continue com o Google
        </Button>
    )
}

export { RegisterOAuth }
