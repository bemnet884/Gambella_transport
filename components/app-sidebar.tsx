"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
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
    name: "Transport Admin",
    email: "admin@transportsystem.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Main Fleet",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "City Operations",
      logo: AudioWaveform,
      plan: "Professional",
    },
    {
      name: "Regional Transport",
      logo: Command,
      plan: "Standard",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Vehicles",
      url: "/vehicles",
      icon: Bot,
      items: [
        {
          title: "Add Vehicle",
          url: "/vehicles/add",
        },
        {
          title: "Vehicle List",
          url: "/vehicles",
        },
        {
          title: "Registration Queue",
          url: "/vehicles/pending",
        },
        {
          title: "Vehicle Types",
          url: "/vehicles/types",
        },
      ],
    },
    {
      title: "Drivers",
      url: "/drivers",
      icon: BookOpen,
      items: [
        {
          title: "Register Driver",
          url: "/drivers/add",
        },
        {
          title: "Driver List",
          url: "/drivers",
        },
        {
          title: "License Verification",
          url: "/drivers/verification",
        },
        {
          title: "Training Records",
          url: "/drivers/training",
        },
      ],
    },
    {
      title: "Operations",
      url: "/operations",
      icon: Settings2,
      items: [
        {
          title: "Route Management",
          url: "/operations/routes",
        },
        {
          title: "Schedule Planning",
          url: "/operations/schedules",
        },
        {
          title: "Maintenance",
          url: "/operations/maintenance",
        },
        {
          title: "Fuel Tracking",
          url: "/operations/fuel",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Fleet Management",
      url: "/fleet",
      icon: Frame,
    },
    {
      name: "Safety Compliance",
      url: "/compliance",
      icon: PieChart,
    },
    {
      name: "Route Optimization",
      url: "/routes",
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
