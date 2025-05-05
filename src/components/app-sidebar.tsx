"use client"

import * as React from "react"
import {
  BookOpen,
  GalleryVerticalEnd,
  Settings2,
  Workflow,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Data Tracker",
      logo: GalleryVerticalEnd,
      plan: "Transformamos Informacion en Conocimiento",
    },
    
  ],
  navMain: [
    
    {
      title: "Plantillas",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Activos",
          url: "#",
        },
        {
          title: "Reportes",
          url: "#",
        },
      ],
    },
    {
      title: "Acciones",
      url: "#",
      icon: Workflow,
      items: [
        {
          title: "Lista de Reportes",
          url: "#",
        },
        {
          title: "Llenar Reportes",
          url: "#",
        }
      ],
    },
    {
      title: "Configuracion",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Permisos",
          url: "#",
        }
      ],
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
