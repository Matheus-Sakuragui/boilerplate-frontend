function LoginFooter() {
    return (
        <div className="w-full items-center flex justify-center mt-auto">
            <span className="flex gap-2">
                Não tem conta ainda?{" "}
                <a
                    href="/auth/register"
                    className="font-semibold text-salmon-800 hover:text-salmon-600 hover:underline"
                >
                    Registre-se
                </a>
            </span>
        </div>
    )
}

export { LoginFooter }
