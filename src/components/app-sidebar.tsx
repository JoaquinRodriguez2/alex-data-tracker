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
import { useSidebarState } from "@/global/sideBarState"


// This is sample data.
const data = {
  user: {
    name: "Nombre",
    email: "nombre.apellido@alex.com.ve",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Data Tracker",
      logo: GalleryVerticalEnd,
      plan: "Transformamos Datos en Informacion Valiosa",
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
  const {setIsOpen,isOpen} = useSidebarState()
  const companyData = [
    {
      name: "Data Tracker",
      logo: GalleryVerticalEnd,
      plan: "Transformamos Datos en Informacion Valiosa",
      action: () => setIsOpen(!isOpen)
    }
  ]


  return (
    <Sidebar {...props}>
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
