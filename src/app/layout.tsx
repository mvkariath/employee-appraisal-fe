import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/api-service/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appraisal System",
  description: "Employee performance appraisal system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
