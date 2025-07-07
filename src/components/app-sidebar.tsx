"use client"

import * as React from "react"
import {
  AudioWaveform,
  Frame,
  Map,
  PieChart,
  Settings2,
  CableIcon,
  BookOpenIcon,
  FootprintsIcon
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
    name: "Usuario",
    email: "joaquin.rodriguez@alex.com.ve",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ALEX TOOL TRACKER",
      logo: AudioWaveform,
      plan: "Transformamos Los datos en informacion valiosa para la toma de decisiones",
    }
  ],
  navMain: [
    {
      title: "Templates",
      url: "#",
      icon: BookOpenIcon,
      isActive: true,
      items: [
        {
          title: "Equipment Templates",
          url: "/dashboard/asset-templates",
        },
        {
          title: "Tracked Fields Templates",
          url: "/dashboard/tracked-fields",
        },
        {
          title: "Procedures Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Actions",
      url: "#",
      icon: CableIcon,
      items: [
        {
          title: "Assigned Tasks",
          url: "#",
        },
        {
          title: "Equipment List",
          url: "/dashboard/asset",
        },
        {
          title: "Tool Strings / Assemblies",
          url: "/dashboard/asset",
        },
        {
          title: "Runs",
          url: "#",
        }
      ],
    },
    {
      title: "Docs",
      url: "#",
      icon:FootprintsIcon,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Use Guide",
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
