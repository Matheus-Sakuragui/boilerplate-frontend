"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Eye, EyeClosed, Loader2, Lock, LogIn, Mail } from "lucide-react"
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
import { InputIcon } from "@/components/atoms/input"
import { useAuth } from "@/hooks/use-auth"
import { isValidEmail } from "@/utils/validators"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/atoms/input-otp"

const formSchema = z.object({
    auth_code: z.string().length(6, "Código deve ter 6 dígitos"),
    access_key: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

function VerifyTokenForm() {
    const { verifyToken, accessToken } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auth_code: "",
            access_key: accessToken,
        },
    })

    const onSubmit = (formData: FormSchema) =>
        verifyToken(formData, setIsLoading)

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !isLoading) {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
        }
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
                    name="auth_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup className="gap-2 justify-center">
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                                className="w-14 h-14 text-2xl border-2 border-primary rounded-lg"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
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

export { VerifyTokenForm }
