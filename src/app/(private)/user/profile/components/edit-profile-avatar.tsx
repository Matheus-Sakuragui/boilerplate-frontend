"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2, Loader2, Trash2, Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/atoms/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/atoms/dialog"
import { environ } from "@/config/vars"
import type { UserDataProps } from "@/interfaces/management/auth"
import { BucketService } from "@/services/bucket/bucket"

interface EditProfileAvatarProps {
    userData: UserDataProps
}

const schema = z.object({
    file: z
        .custom<File | null>((val) => val instanceof File, {
            message: "Selecione uma imagem válida.",
        })
        .nullable(),
})

type FormDataSchema = z.infer<typeof schema>

function EditProfileAvatar({ userData }: EditProfileAvatarProps) {
    const {
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm<FormDataSchema>({
        resolver: zodResolver(schema),
        defaultValues: { file: null },
    })

    const [isLoading, setLoading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const service = new BucketService()
    const file = watch("file")

    const onSubmit = async (data: FormDataSchema) => {
        if (!data.file) return

        setLoading(true)

        try {
            const response = await service.updateImage({
                file: data.file,
                filename: data.file.name,
                compartment: "user",
                id: userData.id,
                field: "avatar",
                environ,
            })

            if (response.url) {
                toast.success("Upload realizado com sucesso!")
                setDialogOpen(false)
            } else {
                toast.error("Erro ao enviar a imagem.")
            }
        } catch (error) {
            toast.error("Erro na requisição.")
        } finally {
            setLoading(false)
        }
    }

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null
        setValue("file", selectedFile, { shouldValidate: true })

        if (selectedFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)
        } else {
            setPreview(null)
        }
    }

    const handleDelete = async () => {
        try {
            await service.deleteImage({
                id: userData.id,
                field: "avatar",
                compartment: "user",
                environ,
            })
            toast.success("Avatar removido com sucesso.")
            setDialogOpen(false)
        } catch (err) {
            toast.error("Erro ao remover o avatar.")
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="absolute rounded-full border p-1 bottom-2 right-[40%]"
                >
                    <Edit2 className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-salmon-50 border-salmon-500">
                <DialogHeader className="items-start">
                    <DialogTitle>Edite sua foto de perfil</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-20">
                    <div className="flex justify-center">
                        {preview || userData.avatarImage ? (
                            <div>
                                <label className="relative cursor-pointer">
                                    <img
                                        src={preview || userData.avatarImage}
                                        alt="Preview do avatar"
                                        className="w-44 h-44 object-contain bg-white rounded-full"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageSelect}
                                    />
                                </label>
                            </div>
                        ) : (
                            <label className="border-2 border-dashed rounded-lg max-w-xs h-44 flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:bg-gray-50 transition px-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                                Adicionar um avatar de perfil
                            </label>
                        )}

                        {errors.file && (
                            <p className="text-sm text-red-500">
                                {errors.file.message}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            {userData.avatarImage && (
                                <Button
                                    variant="cancel"
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className="flex gap-2 items-center text-sm"
                                >
                                    <Trash2 className="size-4" />
                                    Excluir avatar
                                </Button>
                            )}
                            <Button
                                type="submit"
                                disabled={!file || isLoading}
                                className="flex gap-2 items-center text-sm"
                            >
                                {!isLoading ? (
                                    <>
                                        <Upload className="size-4" />
                                        Salvar avatar
                                    </>
                                ) : (
                                    <div className="px-11">
                                        <Loader2 className="animate-spin size-4" />
                                    </div>
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export { EditProfileAvatar }
