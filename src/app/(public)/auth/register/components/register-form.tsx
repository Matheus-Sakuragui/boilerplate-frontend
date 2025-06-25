"use client"

import {
    CircleUser,
    ClipboardPen,
    Contact,
    Eye,
    EyeClosed,
    Loader2,
    Lock,
    LockOpen,
    Mail,
    Phone,
} from "lucide-react"
import { type KeyboardEvent, type MouseEvent, useState } from "react"
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
import { useRegisterClient } from "@/hooks/use-register-client"

function RegisterForm() {
    const { form, onSubmit, isLoading } = useRegisterClient()
    const { handleSubmit } = form
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    function togglePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        setPasswordVisibility(!passwordVisibility)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !isLoading) {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="space-y-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full min-w-0">
                            <FormLabel>
                                Nome
                                <span className="text-salmon-600 font-semibold">
                                    *
                                </span>
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <CircleUser className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            placeholder="Insira seu nome"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem className="w-full min-w-0">
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <CircleUser className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            placeholder="Insira seu sobrenome"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                E-mail
                                <span className="text-salmon-600 font-semibold">
                                    *
                                </span>
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <Mail className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            placeholder="exemplo@email.com"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taxID"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                CPF
                                <span className="text-salmon-600 font-semibold">
                                    *
                                </span>
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <Contact className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            type="cpf"
                                            placeholder="Insira seu CPF"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <Phone className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            type="phone"
                                            placeholder="Insira seu telefone"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Senha
                                <span className="text-salmon-600 font-semibold">
                                    *
                                </span>
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
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                        <InputIcon>
                                            <Button
                                                type="button"
                                                tabIndex={-1}
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
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>
                                Confirmação de senha
                                <span className="text-salmon-600 font-semibold">
                                    *
                                </span>
                            </FormLabel>
                            <FormControl>
                                <div className="space-y-1">
                                    <InputContainer>
                                        <InputIcon>
                                            <Lock className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            type={"password"}
                                            placeholder="Confirme sua senha"
                                            className="placeholder:line-clamp-1"
                                            {...field}
                                        />
                                    </InputContainer>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="flex w-full justify-center mt-4"
                    disabled={isLoading}
                    variant={isLoading ? "disabled" : "default"}
                >
                    {!isLoading ? (
                        <div className="flex gap-2 items-center">
                            <ClipboardPen className="size-5" /> Registrar
                        </div>
                    ) : (
                        <Loader2 className="animate-spin size-5" />
                    )}
                </Button>
            </form>
        </Form>
    )
}

export { RegisterForm }
