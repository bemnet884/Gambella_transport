// app/(dashboard)/layout.tsx
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardShell from "@/components/layout/DashboardShell";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto p-4 sm:p-6 max-w-7xl w-full">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </DashboardShell>
  );
}