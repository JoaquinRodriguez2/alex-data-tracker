"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  CableIcon,
  BookOpenIcon,
  FootprintsIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
    name: "Usuario",
    email: "joaquin.rodriguez@alex.com.ve",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Advanced Logging & Explosives",
      logo: AudioWaveform,
      plan: "Transformamos Los datos en informacion valiosa para la toma de decisiones",
    }
  ],
  navMain: [
    {
      title: "Plantillas",
      url: "#",
      icon: BookOpenIcon,
      isActive: true,
      items: [
        {
          title: "Plantilla de Activos",
          url: "/dashboard/asset-templates",
        },
        {
          title: "Plantilla de Procedimientos",
          url: "#",
        },
      ],
    },
    {
      title: "Acciones",
      url: "#",
      icon: CableIcon,
      items: [
        {
          title: "Lista de Procedimientos Asignados",
          url: "#",
        },
        {
          title: "Lista de Activos",
          url: "#",
        },

      ],
    },
    {
      title: "Documentacion",
      url: "#",
      icon:FootprintsIcon,
      items: [
        {
          title: "Introduccion",
          url: "#",
        },
        {
          title: "Inicio",
          url: "#",
        },
        {
          title: "Tutorial",
          url: "#",
        },

      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        
        {
          title: "Permisos de Usuarios",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
