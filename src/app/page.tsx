import { Sidebar, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function HomePage() {
  return <SidebarProvider className="overflow-y-hidden">
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarHeader className="flex-row">
        <SidebarTrigger />
        <span></span>
      </SidebarHeader>
    </Sidebar>
  </SidebarProvider>
}