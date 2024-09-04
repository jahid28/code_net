"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import type { Session } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "@/redux/store";
// import { Metadata } from "next";
// export const metadata: Metadata = {
// title: "DevGram</>",
// description: "Welcome to DevGram",
// };
// const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  // session: Session | null;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // const pathname: string = usePathname();

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="DevGramfavicon.png" type="image/x-icon"/>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"> */}
        <title>DevGram &lt;/&gt;</title>
      </head>
      <body className="darkmode">
        <AuthProvider>
          <Provider store={store}>
            <Navbar />
            {/* {(pathname === "/" || pathname === "/tagSearch") && <Tags />} */}
            {/* <AuthContext.Provider value={{ name: "jk" }}> */}
            <div className="text-color">{children}</div>
            {/* </AuthContext.Provider> */}
            <Toaster richColors closeButton />
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
