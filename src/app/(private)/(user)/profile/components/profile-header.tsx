import { UserCircle2 } from "lucide-react"
import type { UserDataProps } from "@/interfaces/management/auth"
import { EditProfileAvatar } from "./edit-profile-avatar"

interface ProfileHeaderProps {
    userData: UserDataProps
}

function ProfileHeader({ userData }: ProfileHeaderProps) {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-center relative space-y-2">
                {!userData.avatarImage ? (
                    <UserCircle2 className="size-32" />
                ) : (
                    <img
                        src={userData.avatarImage}
                        alt="Preview do avatar"
                        className="w-32 h-32 object-contain bg-white rounded-full"
                    />
                )}
                <EditProfileAvatar userData={userData} />
            </div>
            <span className="font-semibold flex justify-center">
                {userData.name} {userData.surname || ""}
            </span>
        </div>
    )
}

export { ProfileHeader }
