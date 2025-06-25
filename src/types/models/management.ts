type User = {
    id: string
    name: string
    surname: string
    email: string
    username: string
    password: string
    status: boolean
    createdAt: Date
}

type Employee = {
    id: string
    jobTitle: string
    department: string
    taxID: string
    createdAt: Date
    enterpriseID: string
    userID: string
}

type Enterprise = {
    id: string
    brandName: string
    legalName: string
    taxID: string
    status: boolean
    createdAt: Date
}

type Address = {
    id: string
    publicPlace: string
    number: number
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
    main: boolean
    enterpriseID: string
    userID: string
}

type Phone = {
    id: number
    phone: string
    main: boolean
    enterpriseID?: string
    userID?: string
}

type Role = {
    id: number
    role: string
    level: number
}

type RoleEmployee = {
    id: number
    roleID: number
    employeeID: string
}

export type { User, Address, Phone, Employee, Enterprise, Role, RoleEmployee }
