"use client"

import { useRouter } from "next/navigation"
import {
    createContext,
    type Dispatch,
    type FC,
    type SetStateAction,
    useEffect,
    useState,
} from "react"
import { management } from "@/api/management"
import type { ChildrenProps } from "@/interfaces/children"
import type {
    LoginProps,
    TwoFAProps,
    UserDataProps,
    VerifyCodeProps,
} from "@/interfaces/management/auth"
import { AuthService } from "@/services/management/auth"
import { getToken } from "@/utils/token"
import {
    fetchUserInfo,
    loginHandler,
    logoutHandler,
    refreshAccessTokenHandler,
    verifyTokenHandler,
} from "./handlers"
import { initializeInterceptors } from "./interceptors"

export interface AuthContextProps {
    accessToken: string | undefined
    userData: UserDataProps | null
    login: (
        body: LoginProps,
        setIsLoading: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>
    fetchUserData: () => Promise<void>
    logout: () => Promise<void>
    isAuthenticated: boolean
    verifyToken: (
        body: TwoFAProps,
        setIsLoading: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const authService = new AuthService()

const AuthProvider: FC<ChildrenProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(
        getToken()
    )
    const [userData, setUserData] = useState<UserDataProps | null>(null)
    const router = useRouter()
    const isAuthenticated = !!userData

    useEffect(() => {
        if (!accessToken) return

        const { request, response } = initializeInterceptors(
            management,
            () => accessToken,
            () => refreshAccessTokenHandler(authService, setAccessToken),
            logout
        )

        return () => {
            management.interceptors.request.eject(request)
            management.interceptors.response.eject(response)
        }
    }, [accessToken])

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getToken()
            if (token) {
                setAccessToken(token)
                await fetchUserInfo(authService, token, setUserData, logout)
            }
        }
        initializeAuth()
    }, [])

    async function fetchUserData() {
        if (accessToken) {
            await fetchUserInfo(authService, accessToken, setUserData, logout)
        }
    }

    const login = async (
        body: LoginProps,
        setIsLoading: Dispatch<SetStateAction<boolean>>
    ) => {
        await loginHandler(
            body,
            authService,
            setAccessToken,
            setUserData,
            router,
            setIsLoading
        )
    }

    const verifyToken = async (
        body: TwoFAProps,
        setIsLoading: Dispatch<SetStateAction<boolean>>
    ) => {
        await verifyTokenHandler(
            body,
            authService,
            setAccessToken,
            setUserData,
            router,
            setIsLoading
        )
    }

    const logout = async () => {
        await logoutHandler(authService, setAccessToken, setUserData)
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                userData,
                login,
                logout,
                isAuthenticated,
                fetchUserData,
                verifyToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
