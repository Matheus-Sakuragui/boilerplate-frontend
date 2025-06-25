function RegisterFooter() {
    return (
        <div className="w-full items-center flex justify-center mt-auto">
            <span className="flex gap-2">
                Já possui cadastro conosco?{" "}
                <a
                    href="/auth/login"
                    className="font-semibold text-salmon-800 hover:text-salmon-600 hover:underline"
                >
                    Fazer login
                </a>
            </span>
        </div>
    )
}

export { RegisterFooter }
