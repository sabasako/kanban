import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/navigation/MainHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarContextProvider from "@/store/sidebar-context";
import DataContextProvider from "@/store/data-context";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban - Task Management App",
  description: "Manage your tasks with ease using Kanban.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-c-light-grey">
      <body className={`${jakartaSans.className}`}>
        <DataContextProvider>
          <SidebarContextProvider>
            <MainHeader />
            <Sidebar />
            <main>{children}</main>
          </SidebarContextProvider>
        </DataContextProvider>
      </body>
    </html>
  );
}
