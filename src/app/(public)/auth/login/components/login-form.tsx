"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Eye,
    EyeClosed,
    Loader2,
    Lock,
    LockOpen,
    LogIn,
    Mail,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { type KeyboardEvent, type MouseEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/atoms/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/form"
import { InputContainer, InputField, InputIcon } from "@/components/atoms/input"
import { useAuth } from "@/hooks/use-auth"
import { isValidEmail } from "@/utils/validators"

const formSchema = z.object({
    credentials: z
        .string()
        .trim()
        .min(1, { message: "O e-mail é obrigatório" })
        .refine((value) => isValidEmail(value), {
            message: "E-mail inválido",
        }),
    password: z.string().trim().min(1, { message: "A senha é obrigatória" }),
})

type FormSchema = z.infer<typeof formSchema>

function LoginForm() {
    const { login } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            credentials: "",
            password: "",
        },
    })

    const onSubmit = (formData: FormSchema) => login(formData, setIsLoading)

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !isLoading) {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
        }
    }

    function togglePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
        setPasswordVisibility(!passwordVisibility)
    }

    function handleForgotPasswordNavigation(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        router.push("/auth/forgot-password")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="credentials"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                E-mail
                            </FormLabel>
                            <FormControl>
                                <InputContainer>
                                    <InputIcon>
                                        <Mail className="size-5" />
                                    </InputIcon>
                                    <InputField
                                        placeholder="Insira seu e-mail"
                                        {...field}
                                    />
                                </InputContainer>
                            </FormControl>
                            <FormMessage className="w-full bg-salmon-200 rounded-lg p-2 font-semibold text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">
                                Senha
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            {passwordVisibility ? (
                                                <LockOpen className="size-5" />
                                            ) : (
                                                <Lock className="size-5" />
                                            )}
                                        </InputIcon>
                                        <InputField
                                            type={
                                                passwordVisibility
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Insira sua senha"
                                            {...field}
                                        />
                                        <InputIcon>
                                            <Button
                                                variant={"ghost"}
                                                className="flex items-center text-salmon-400 group-focus-within:text-salmon-700 hover:text-salmon-400 group-focus-within:hover:text-salmon-700"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {passwordVisibility ? (
                                                    <Eye className="size-5" />
                                                ) : (
                                                    <EyeClosed className="size-5" />
                                                )}
                                            </Button>
                                        </InputIcon>
                                    </InputContainer>
                                    <Button
                                        type="button"
                                        tabIndex={-1}
                                        variant={"ghost"}
                                        className="items-end hover:underline"
                                        onClick={handleForgotPasswordNavigation}
                                    >
                                        <span>Esqueceu sua senha?</span>
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage className="w-full bg-salmon-200 rounded-lg p-2 font-semibold text-xs" />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        type="submit"
                        className="flex w-full justify-center"
                        disabled={isLoading}
                        variant={isLoading ? "disabled" : "default"}
                    >
                        {!isLoading ? (
                            <div className="flex gap-2 items-center">
                                <LogIn className="size-5" /> Entrar
                            </div>
                        ) : (
                            <Loader2 className="animate-spin size-5" />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export { LoginForm }
