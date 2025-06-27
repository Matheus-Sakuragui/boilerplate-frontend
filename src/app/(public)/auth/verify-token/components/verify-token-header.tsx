import type { VerifyCodeProps } from "@/interfaces/management/auth";

export function VerifyTokenHeader(props: VerifyCodeProps) {
    return (
        <div className="justify-center items-center flex flex-col" >
            <h3 className="text-2xl font-semibold tracking-tight">
                Verifique seu e-mail
            </h3>
            <p className="text-sm text-muted-foreground">
                Enviamos um código de 6 dígitos para o e-mail <br />
            </p>
                <span className="font-medium">{props.email}</span>
            
        </div>
    )
}
