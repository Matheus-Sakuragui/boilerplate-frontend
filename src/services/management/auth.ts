import { AxiosError } from "axios"
import { management } from "@/api/management"
import type { LoginProps } from "@/interfaces/management/auth"

class AuthService {
    async getUserInfo(token: string) {
        try {
            const response = await management.get("/auth", {
                headers: { Authorization: `Bearer ${token}` },
            })

            return response
        } catch (error) {
            return this.handleAxiosError(error)
        }
    }

    async login(body: LoginProps) {
        try {
            const response = await management.post("/auth/login", body, {
                validateStatus: () => true,
            })
            return response
        } catch (error) {
            return this.handleAxiosError(error)
        }
    }

    async logout() {
        try {
            const response = await management.post("/auth/logout")
            return response
        } catch (error) {
            return this.handleAxiosError(error)
        }
    }

    async refreshToken() {
        try {
            const response = await management.post("/auth/refresh")
            return response
        } catch (error) {
            console.error("Erro ao renovar o token:", error)
            return null
        }
    }

    private handleAxiosError(error: unknown) {
        if (error instanceof AxiosError) {
            return error.response?.data
        }
        console.error("Erro desconhecido:", error)
        return { message: "Erro desconhecido." }
    }
}

export { AuthService }
