interface UserPhoneProps {
    id: number
    number: string
    main: boolean
}

interface EmployeeRoleProps {
    id: 0
    roleID: 0
}

interface UserAddressProps {
    id: string
    logradouro: string
    numero: number
    bairro: string
    cidade: string
    estado: string
    cep: string
    complemento: string
    main: boolean
}

interface UserInfosProps {
    id: string
    ativo: boolean
    taxID: string
    email: string
    name: string
    surname?: string
    roles: EmployeeRoleProps[]
    phones: UserPhoneProps[]
    addresses: UserAddressProps[]
}

interface UserDataProps {
    id: string
    name: string
    surname: string
    email: string
    avatarImage: string
    client: UserClientProps
    phone: UserPhoneProps[]
    address: UserAddressProps[]
}

interface UserClientProps {
    id: string
    taxID: string
}

interface LoginProps {
    credentials: string
    password: string
}

export type { LoginProps, UserDataProps, UserInfosProps }
