"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

// Icons
import { FaBold } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiMiniServerStack } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="pt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                  asChild
                >
                  <Link href="/dashboard" className="flex items-center gap-4">
                    <MdDashboard className="size-4" />
                    <span className="text-sm">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Brands"
                  isActive={pathname === "/brands"}
                  asChild
                >
                  <Link href="/brands" className="flex items-center gap-4">
                    <FaBold className="size-4" />
                    <span className="text-sm">Brands</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Products"
                  isActive={pathname === "/products"}
                  asChild
                >
                  <Link href="/products" className="flex items-center gap-4">
                    <HiMiniServerStack className="size-4" />
                    <span className="text-sm">Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <div className="px-4 w-full">
                <Separator />
              </div>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit dashboard" asChild>
                  <Link href="/" className="flex items-center gap-4">
                    <IoLogOut className="size-4" />
                    <span className="text-sm">Exit dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
