import { AxiosError } from "axios"

abstract class ServiceAbstract {
    public handleAxiosError(error: unknown) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        console.error("Erro desconhecido:", error)
        return { message: "Erro desconhecido." }
    }
}

export { ServiceAbstract }
