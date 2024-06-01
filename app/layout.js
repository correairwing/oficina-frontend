import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manauara Diesel",
  description: "App de gestão",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NavBar /> 
        {children}
        </body>
    </html>
  );
}
