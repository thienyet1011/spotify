import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";

import { Sidebar } from "@/components/Sidebar";

import ModalProvider from "@/providers/ModalProvider";
import Player from "@/components/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";

import { getSongsByUserId } from "@/actions/getSongsByUserId";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen the music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
          <Player />
        </SupabaseProvider>
      </body>
    </html>
  );
}
