"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import type { Session } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import Tags from "@/components/Tags";
import { Provider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  // session: Session | null;
}


export default function RootLayout({ children }: RootLayoutProps) {
  const pathname:string = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider >
          <Provider store={store}>
          <Navbar />
          {(pathname === "/" || pathname === "/tagSearch") && <Tags />}
          {/* <AuthContext.Provider value={{ name: "jk" }}> */}
            {/* <Navbar authenticated={false} name='null' image='null'/> */}
            <div className="text-color">{children}</div>
          {/* </AuthContext.Provider> */}
          <Toaster richColors closeButton />
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
