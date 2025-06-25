"use client"

import { useAuth } from "@/hooks/use-auth"
import { ProfileContentForm } from "./profile-content-form"
import { ProfileHeader } from "./profile-header"

function Profile() {
    const { userData } = useAuth()

    if (!userData) {
        return
    }

    return (
        <div className="w-full space-y-20">
            <ProfileHeader userData={userData} />
            <ProfileContentForm userData={userData} />
        </div>
    )
}

export { Profile }
