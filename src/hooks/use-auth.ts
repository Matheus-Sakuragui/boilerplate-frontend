import { useContext } from "react"
import { AuthContext, type AuthContextProps } from "@/contexts/auth/auth"

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}

export { useAuth }
