interface UserRegisterProps {
    email: string
    name: string
    username: string
    password: string
    surname?: string
    status: boolean
}
interface ClientRegisterProps {
    taxID: string
    user: {
        email: string
        name: string
        surname?: string
        password: string
    }
}

interface ClientUpdateProps {
    user: {
        name?: string
        surname?: string
        password?: string
    }
}

interface EmployeeRegisterProps {
    taxID: string
    email: string
    empresa_id: string
    name: string
    username: string
    password: string
    surname?: string
}

interface EnterpriseRegisterProps {
    taxID: string
    brandName: string
    legalName: string
}

export type {
    ClientRegisterProps,
    EmployeeRegisterProps,
    EnterpriseRegisterProps,
    UserRegisterProps,
    ClientUpdateProps,
}
