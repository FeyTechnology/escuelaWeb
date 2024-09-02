
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { OpcionProvider } from "@/context/OptionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skywork School",
  description: "Test",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <OpcionProvider>
          <Navbar />
          {children}
          {/* Modal auxiliar*/}
          <div id="modal-root"></div>
        </OpcionProvider>
      </body>
    </html>
  );
}
