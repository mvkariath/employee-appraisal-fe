"use client";

import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/api-service/store";
import { Toaster } from "sonner";
import { BotMessageSquare } from "lucide-react";
import ChatbotModal from "@/components/chatbot/ChatbotModal";

import { usePathname } from "next/navigation";

export function Providers({ children }: { children: ReactNode }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const pathname = usePathname();

  const authRoutes = ["/login", "/register"];

  const isAuthPage = authRoutes.includes(pathname);

  return (
    <Provider store={store}>
      {children}
      <Toaster richColors />

      {!isAuthPage && (
        <>
          <ChatbotModal
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
          />

          {!isChatbotOpen && (
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition-all"
              aria-label="Open AI Assistant"
            >
              <BotMessageSquare className="w-6 h-6" />
            </button>
          )}
        </>
      )}
    </Provider>
  );
}
