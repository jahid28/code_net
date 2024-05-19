"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import type { Session } from 'next-auth';
import { Toaster } from "@/components/ui/sonner"
import { createContext,useContext } from "react";
const inter = Inter({ subsets: ["latin"] });


interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const AuthContext = createContext({name:null} as {name:string|null})
console.log("time")

export default function RootLayout({
  children,session
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider session={session}>
          <Navbar />
          <AuthContext.Provider value={{name:"jk"}}>
          
          {/* <Navbar authenticated={false} name='null' image='null'/> */}
          {children}
          </AuthContext.Provider>
          <Toaster richColors closeButton/>
        </AuthProvider>
        </body>
    </html>
  );
}

export {AuthContext}