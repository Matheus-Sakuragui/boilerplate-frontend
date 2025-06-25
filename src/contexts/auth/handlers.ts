"use client"

import type { AxiosResponse } from "axios"
import type { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"
import { toast } from "sonner" // componente de notificação
import type { LoginProps, UserDataProps } from "@/interfaces/management/auth"
import type { AuthService } from "@/services/management/auth"
import { removeToken, setToken } from "@/utils/token"

const refreshAccessTokenHandler = async (
    authService: AuthService,
    setAccessToken: Dispatch<SetStateAction<string | undefined>>
): Promise<string | null> => {
    try {
        const response = await authService.refreshToken()
        const newToken = response?.data?.accessToken
        if (newToken) {
            setAccessToken(newToken)
            setToken(newToken)
            return newToken
        }
        throw new Error("Falha ao renovar o token.")
    } catch (error) {
        console.error("Erro ao renovar o token:", error)
        return null
    }
}

const fetchUserInfo = async (
    authService: AuthService,
    token: string,
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>,
    logout: () => void
) => {
    try {
        const response = await authService.getUserInfo(token)
        setUserData(response.data)
    } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error)
        logout()
    }
}

const loginHandler = async (
    body: LoginProps,
    authService: AuthService,
    setAccessToken: Dispatch<SetStateAction<string | undefined>>,
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>,
    router: ReturnType<typeof useRouter>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
    try {
        setIsLoading(true)
        const response = await authService.login(body)
        handleLoginResponse(response, setIsLoading)
        const token = response.data.accessToken
        if (token) {
            setAccessToken(token)
            setToken(token)

            const userResponse = await authService.getUserInfo(token)
            setUserData(userResponse.data)
            toast.success(`Seja bem-vindo(a) ${userResponse.data.name}!`, {
                duration: 5000,
                description: "Login realizado com sucesso",
                descriptionClassName: "text-xs text-white",
            })
            router.push("/ks-burguer")
        }

        setIsLoading(false)
    } catch (error) {
        console.error("Erro ao fazer login:", error)
    }
}

const handleLoginResponse = (
    response: AxiosResponse,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
    if (response.status !== 201) {
        setIsLoading(false)
        toast.error(response.data.message)
        return
    }
}

const logoutHandler = async (
    authService: AuthService,
    setAccessToken: Dispatch<SetStateAction<string | undefined>>,
    setUserData: Dispatch<SetStateAction<UserDataProps | null>>
) => {
    try {
        await authService.logout()
    } catch (error) {
        console.error("Erro ao fazer logout:", error)
    }
    setAccessToken(undefined)
    setUserData(null)
    removeToken()
}

export { loginHandler, logoutHandler, refreshAccessTokenHandler, fetchUserInfo }
