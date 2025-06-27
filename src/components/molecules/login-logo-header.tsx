import Image from "next/image"

function LoginLogoHeader() {
    return (
        <div className="flex flex-col gap-1">
            <Image
                src="/resix.png"
                alt="Resix logo"
                width={200}
                height={200}
                className="mx-auto"
            />
        </div>
    )
}

export { LoginLogoHeader }
