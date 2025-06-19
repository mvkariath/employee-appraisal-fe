"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/api-service/store";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster  richColors/>
    </Provider >
  );
}
