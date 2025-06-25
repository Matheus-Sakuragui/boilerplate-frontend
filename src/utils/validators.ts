function isValidEmail(value: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(value)
}

function isValidCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/[.-]/g, "")
    if (/^(\d)\1+$/.test(cleanCPF)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let firstCheckDigit = (sum * 10) % 11
    if (firstCheckDigit === 10) firstCheckDigit = 0
    if (firstCheckDigit !== Number.parseInt(cleanCPF.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    let secondCheckDigit = (sum * 10) % 11
    if (secondCheckDigit === 10) secondCheckDigit = 0
    return secondCheckDigit === Number.parseInt(cleanCPF.charAt(10))
}

export { isValidCPF, isValidEmail }
