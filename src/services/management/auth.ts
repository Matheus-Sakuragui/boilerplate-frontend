import { management } from "@/api/management"
import type { LoginProps, TwoFAProps } from "@/interfaces/management/auth"
import { ServiceAbstract } from "@/interfaces/service-abstract"

class AuthService extends ServiceAbstract {
    async getUserInfo(token: string) {
        try {
            const response = await management.get("/user/token", {
                params: { access_key: token },
            })
            return response
        } catch (error) {
            return this.handleAxiosError(error)
        }
    }

    async login(body: LoginProps) {
        try {
            const response = await management.post("/token", body, {
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

    async verifyCode(body: TwoFAProps) {
        try {
            const response = await management.post(
                "/token_auth",
                {
                    auth_code: body.auth_code,
                    expiration_time: 360000,
                },
                {
                    params: {
                        access_key: body.access_key,
                    },
                    validateStatus: () => true,
                }
            )
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
}

export { AuthService }
