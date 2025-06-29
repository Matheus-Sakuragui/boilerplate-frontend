import { Toaster } from "@/components/atoms/sonner"
import "./globals.css"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { AuthProvider } from "@/contexts/auth/auth"
import { Header } from "./components/header"
import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar"
import { AppSidebar } from "@/components/molecules/app-sidebar"

export const metadata: Metadata = {
    title: "Boilerplate",
}

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-lato",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt" className={`${lato.variable}`}>
            <body className="text-zinc-900 antialiased w-full">
                <AuthProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <main>
                            {children}
                        </main>

                        <Toaster
                            className="bg-transparent"
                            position="top-right"
                            richColors
                        />
                    </SidebarProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
