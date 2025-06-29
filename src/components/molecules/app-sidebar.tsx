"use client"

import {
    Building,
    FlaskConical,
    User2,
    ClipboardPlus,
    Contact,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/atoms/sidebar"

import { useState } from "react"
import Image from "next/image"
import { SidebarUserInfo } from "../atoms/user-sidebar-info"

const mainItems = [
    { title: "Planejamento de análises", url: "#", icon: ClipboardPlus },
    { title: "Análises", url: "#", icon: FlaskConical },
]

const accessSubItems = [
    { title: "Empresas", url: "/empresas", icon: Building },
    { title: "Papéis", url: "/papeis", icon: Contact },
    { title: "Usuários", url: "/usuarios", icon: User2 },
]

function AppSidebar() {
    return (
        <Sidebar collapsible="none">
            <SidebarHeader>
                <Image
                    src="/resix_white.png"
                    alt="Resix logo"
                    width={150}
                    height={100}
                    className="mx-auto"
                />
                <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Aplicativo</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="lg">
                                        <a href={item.url}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Acessos</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accessSubItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="lg">
                                        <a href={item.url}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarUserInfo
                    name="Matheus Henrique"
                    userRole="Desenvolvedor Frontend"
                    company="Resix Labs"
                    onSettingsClick={() => console.log("Abrir configurações")}
                />
            </SidebarFooter>
        </Sidebar>
    )
}

export { AppSidebar }
