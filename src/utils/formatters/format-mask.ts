const formatCPF = (value: string) => {
    return value
        .slice(0, 11)
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

const formatCNPJ = (value: string) => {
    return value
        .slice(0, 14)
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
}

const formatPhone = (value: string) => {
    return value
        .slice(0, 15)
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
}

const formatCEP = (value: string) => {
    // 00000-000
    return value
        .slice(0, 9)
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
}

export { formatCNPJ, formatCPF, formatPhone, formatCEP }
