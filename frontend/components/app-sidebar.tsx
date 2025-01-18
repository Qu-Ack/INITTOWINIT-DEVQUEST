import { MessageCircle, Home, FileText, Megaphone } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu dashboardiItems.
const dashboardItems = [
  {
    title: "Home",
    url: "/test/home",
    icon: Home,
  },
  {
    title: "Consultation",
    url: "/test/consultation",
    icon: Megaphone,
  },
  {
    title: "Previous Reports",
    url: "/test/previous_reports",
    icon: FileText,
  },
  {
    title: "Chat Assistant",
    url: "/test/chat_assistant",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-lime-400 text-4xl my-6 mx-4">
        AyurVed
      </SidebarHeader>
      <SidebarContent className="mx-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-md">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-lime-400 hover:text-black focus:bg-lime-500 focus:text-black"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
