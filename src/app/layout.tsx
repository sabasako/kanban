import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/navigation/MainHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarContextProvider from "@/store/sidebar-context";
import DataContextProvider from "@/store/data-context";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Kanban",
  title: {
    default: "Kanban",
    template: "Kanban",
  },
  description: "Kanban - task management application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kanban",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Kanban",
    title: {
      default: "Kanban",
      template: "Kanban",
    },
    description: "Kanban - task management application",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Kanban",
      template: "Kanban",
    },
    description: "Kanban - task management application",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }}>
      <html lang="en" className="bg-c-light-grey">
        <body className={`${jakartaSans.className} overflow-hidden`}>
          <DataContextProvider>
            <SidebarContextProvider>
              <MainHeader />
              <Sidebar />
              {children}
            </SidebarContextProvider>
          </DataContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
