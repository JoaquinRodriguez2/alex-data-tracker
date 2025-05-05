"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useSidebarState } from "@/global/sideBarState";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVisible,isOpen } = useSidebarState();
  
  return (
    <SidebarProvider open={isOpen}>
      <AppSidebar hidden={isVisible} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
} 