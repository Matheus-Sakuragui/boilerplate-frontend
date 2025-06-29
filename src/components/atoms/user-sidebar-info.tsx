import { Settings } from "lucide-react"
import { Button } from "@/components/atoms/button"

type SidebarUserInfoProps = {
  name: string
  userRole: string
  company: string
  onSettingsClick?: () => void
}

export function SidebarUserInfo({
  name,
  userRole,
  company,
  onSettingsClick,
}: SidebarUserInfoProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-t border-sidebar-border p-3 text-sm">
      <div className="flex flex-col">
        <span className="font-medium text-sidebar-foreground">{name}</span>
        <span className="text-xs text-sidebar-foreground/80">{userRole}</span>
        <span className="text-xs text-sidebar-foreground/50">{company}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={onSettingsClick}
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  )
}
