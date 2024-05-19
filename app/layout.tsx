import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";

import { Sidebar } from "@/components/Sidebar";
import Player from "@/components/Player";

import GoogleTagProvider from "@/providers/GoogleTagProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";

import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { getActiveProductsWithPrices } from "@/actions/getActiveProductsWithPrices";

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
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{ 
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){
                dataLayer.push(arguments);
              }

              gtag('js', new Date());
              gtag('config', '${GTM_ID}');
            `
           }}
        /> */}
      </head>
      <body className={font.className}>
        <ToasterProvider />
        <GoogleTagProvider>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </GoogleTagProvider>
      </body>
    </html>
  );
}
