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
import { useRouter } from "next/navigation"
import { type MouseEvent, useEffect, useMemo, useState } from "react"
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
import type { UserDataProps } from "@/interfaces/management/auth"
import type { User } from "@/types/models/management"
import { formatPhone } from "@/utils/formatters/format-mask"

interface ProfileContentFormProps {
    userData: UserDataProps
}

function ProfileContentForm({ userData }: ProfileContentFormProps) {
    const router = useRouter()
    const { onUpdateSubmit, formUpdate, isLoading } = useRegisterClient()
    const { handleSubmit, reset, watch } = formUpdate
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [isFormChanged, setIsFormChanged] = useState(false)
    const phoneNumber = useMemo(
        () => formatPhone(userData.phone[0].phone),
        [userData.phone]
    )

    const password = watch("password")
    const name = watch("name")
    const surname = watch("surname")
    const phone = watch("phone")
    const showPasswordConfirmation = Boolean(password)

    useEffect(() => {
        if (userData) {
            reset({
                ...userData,
                phone: phoneNumber,
                taxID: userData.client.taxID,
                id: userData.client.id,
            })
        }
    }, [userData, reset, phoneNumber])

    useEffect(() => {
        if (
            userData &&
            (name !== userData.name ||
                surname !== userData.surname ||
                password ||
                phone !== phoneNumber)
        ) {
            setIsFormChanged(true)
        } else {
            setIsFormChanged(false)
        }
    }, [name, surname, password, userData, phone, phoneNumber])

    function togglePasswordVisibility(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        setPasswordVisibility(!passwordVisibility)
    }

    function handleNavigation(url: string) {
        router.push(url)
    }

    return (
        <Form {...formUpdate}>
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-2">
                <FormField
                    control={formUpdate.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <InputContainer>
                                    <InputIcon>
                                        <CircleUser className="size-5" />
                                    </InputIcon>
                                    <InputField {...field} />
                                </InputContainer>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formUpdate.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                                <InputContainer>
                                    <InputIcon>
                                        <CircleUser className="size-5" />
                                    </InputIcon>
                                    <InputField {...field} />
                                </InputContainer>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formUpdate.control}
                    name="taxID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                                <InputContainer disabled>
                                    <InputIcon>
                                        <Contact className="size-5" />
                                    </InputIcon>
                                    <InputField
                                        type="cpf"
                                        {...field}
                                        disabled
                                    />
                                </InputContainer>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formUpdate.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <InputContainer disabled>
                                    <InputIcon>
                                        <Mail className="size-5" />
                                    </InputIcon>
                                    <InputField {...field} disabled />
                                </InputContainer>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formUpdate.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <InputContainer>
                                    <InputIcon>
                                        <Phone className="size-5" />
                                    </InputIcon>
                                    <InputField type="phone" {...field} />
                                </InputContainer>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formUpdate.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
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
                                        {...field}
                                    />
                                    <InputIcon>
                                        <Button
                                            variant="ghost"
                                            onClick={togglePasswordVisibility}
                                            className="flex items-center text-salmon-400 group-focus-within:text-salmon-700 hover:text-salmon-400 group-focus-within:hover:text-salmon-700"
                                        >
                                            {passwordVisibility ? (
                                                <Eye className="size-5" />
                                            ) : (
                                                <EyeClosed className="size-5" />
                                            )}
                                        </Button>
                                    </InputIcon>
                                </InputContainer>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {showPasswordConfirmation && (
                    <FormField
                        control={formUpdate.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmação de senha</FormLabel>
                                <FormControl>
                                    <InputContainer>
                                        <InputIcon>
                                            <Lock className="size-5" />
                                        </InputIcon>
                                        <InputField
                                            type="password"
                                            {...field}
                                        />
                                    </InputContainer>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button
                    type="submit"
                    className="w-full mt-4 flex justify-center items-center"
                    disabled={!isFormChanged || isLoading}
                    variant={
                        isLoading || !isFormChanged ? "disabled" : "default"
                    }
                >
                    {!isLoading ? (
                        <div className="flex gap-2 items-center">
                            <ClipboardPen className="size-5" /> Atualizar
                        </div>
                    ) : (
                        <Loader2 className="animate-spin size-5" />
                    )}
                </Button>
            </form>
        </Form>
    )
}

export { ProfileContentForm }
